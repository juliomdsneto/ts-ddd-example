import { Mapper } from "./mapper.common";
import { Model } from "../../database/base/model.base";
import { Doc } from "../../database/base/doc.base";
import { Entity } from "../entity/entity.common";
import { ID } from "../value-objects/id.value-object";
import { Reference } from "../entity/reference.common";

type PropertiesOnly<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export class Repository<ENTITY extends Entity, PERSISTENCE extends Doc> {
  protected mapper: Mapper<ENTITY, PERSISTENCE>;
  protected model: Model<PERSISTENCE>;
  protected references: Record<
    PropertiesOnly<ENTITY>,
    Repository<Entity, Doc>
  > = {};
  private refereceToPopulate: PropertiesOnly<ENTITY>[] = [];

  constructor(mapper: Mapper<ENTITY, PERSISTENCE>, model: Model<PERSISTENCE>) {
    this.mapper = mapper;
    this.model = model;
  }

  save(entity: ENTITY) {
    if (!entity.id?.value || entity?.id?.value === -1) {
      const newId = this.model.nextId();
      entity.setId(newId);
    }

    const doc = this.mapper.entityToPersistence(entity);
    const savedDoc = this.model.save(doc);
    return this.mapper.persistenceToEntity(savedDoc);
  }

  delete(entity: ENTITY) {
    const doc = this.mapper.entityToPersistence(entity);
    return this.model.delete(doc);
  }

  findById(id: number) {
    const doc = this.model.findById(id);

    if (!doc) {
      return;
    }

    const result = this.mapper.persistenceToEntity(doc);

    if (this.refereceToPopulate.length > 0) {
      for (const reference of this.refereceToPopulate) {
        this.populate(result, reference);
      }
    }

    return result;
  }

  findByIds(ids: number[]) {
    const docs = this.model.findByIds(ids);
    return docs.map((doc) => this.mapper.persistenceToEntity(doc));
  }

  find(
    filter: { [K in keyof PERSISTENCE]?: PERSISTENCE[K] },
    options?: { limit?: number; offset?: number },
  ) {
    const docs = this.model.find(filter, options);
    return docs.map((doc) => this.mapper.persistenceToEntity(doc));
  }

  setReference(
    reference: PropertiesOnly<ENTITY>,
    repository: Repository<Entity, Doc>,
  ) {
    this.references[reference] = repository;
  }

  populate<T = ENTITY>(entity: ENTITY, reference: PropertiesOnly<ENTITY>) {
    const repository = this.references[reference];

    if (!repository) {
      throw new Error("Invalid Repository Reference");
    }

    const prop = entity[reference] as Reference | Reference[];

    if (!Array.isArray(prop)) {
      const data = repository.findById(prop.id.value);
      entity.populate(reference, data);
      return entity;
    }

    const ids = prop.map((item) => item.id.value);
    const data = repository.findByIds(ids);
    entity.populate(reference, data);
    return entity as unknown as T;
  }

  with<ENTITY_WITH_REFERENCES extends Entity>(
    ...references: PropertiesOnly<ENTITY>[]
  ) {
    const clone = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
    );

    clone.refereceToPopulate = references;
    return clone as Repository<ENTITY_WITH_REFERENCES, PERSISTENCE>;
  }
}
