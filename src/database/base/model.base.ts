import { db } from "../database";
import { Doc } from "./doc.base";

export class Model<DOC extends Doc> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  get collection() {
    return db.getCollection<DOC>(this.collectionName);
  }

  nextId() {
    return db.nextId(this.collectionName);
  }

  findById(id: number) {
    return this.collection[id] as DOC | undefined;
  }

  findByIds(ids: number[]) {
    return ids.map((id) => this.collection[id] as DOC);
  }

  find(
    filter: { [K in keyof DOC]?: DOC[K] },
    options?: { limit?: number; offset?: number },
  ) {
    const keys = Object.keys(filter) as Array<keyof DOC>;
    const collectionData = Object.values(this.collection);

    const docs = collectionData.filter((doc) => {
      for (const key of keys) {
        if (doc[key] !== filter[key]) {
          return false;
        }
      }

      return true;
    });

    const offset = options?.offset ?? 0;
    const limit = options?.limit ?? docs.length;

    return docs.slice(offset, offset + limit);
  }

  save(doc: DOC): DOC {
    this.collection[doc.id] = doc;
    return this.collection[doc.id];
  }

  delete(doc: DOC) {
    delete this.collection[doc.id];
  }
}
