class Database {
  private collections: Record<string, Record<number, unknown>>;

  constructor() {
    this.collections = {};
  }

  nextId(collectionName: string) {
    const collection = this.getCollection(collectionName);
    const keys = Object.keys(collection);

    if (keys.length === 0) {
      return 1;
    }

    return Number(keys[keys.length - 1]) + 1;
  }

  getCollection<DOC>(collectionName: string) {
    if (!this.collections[collectionName]) {
      this.collections[collectionName] = {};
    }

    return this.collections[collectionName] as Record<number, DOC>;
  }
}

export const db = new Database();
