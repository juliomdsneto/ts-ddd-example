import { ID } from "../value-objects/id.value-object";
import { Reference } from "./reference.common";

export class Entity {
  public id: ID;

  constructor(id?: number) {
    this.id = new ID(id);
  }

  get isEntity() {
    return true;
  }

  get isNew() {
    return this.id.value === -1;
  }

  setId(id: number) {
    this.id = new ID(id);
  }

  hasValue<T extends Entity>(
    entity: T[] | T | Reference<T> | Reference<T>[],
  ): entity is T[] {
    if (Array.isArray(entity)) {
      if (entity.length == 0) {
        return true;
      }

      if (entity[0].isEntity) {
        return true;
      }

      return false;
    }

    if (entity.isEntity) {
      return true;
    }

    return false;
  }

  populate(prop: string, data: Entity | Entity[] | undefined) {
    this[prop] = data;
  }
}
