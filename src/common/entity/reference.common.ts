import { ID } from "../value-objects/id.value-object";
import { Entity } from "./entity.common";

export class Reference<T extends Entity = Entity> {
  public id: ID;

  constructor(id: number) {
    this.id = new ID(id);
  }

  get isEntity() {
    return false;
  }
}

export type Has<T extends Entity> = T | Reference<T>;
export type HasMany<T extends Entity> = T[] | Reference<T>[];
