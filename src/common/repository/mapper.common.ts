export abstract class Mapper<ENTITY, PERSISTENCE> {
  constructor() {}

  abstract entityToPersistence(entity: ENTITY): PERSISTENCE;
  abstract persistenceToEntity(persistence: PERSISTENCE): ENTITY;
}
