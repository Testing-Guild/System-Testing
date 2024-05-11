import { MongoMemoryServer } from "mongodb-memory-server";
export class ConnectionDatabase {
  constructor() {
    this.server = new Promise(() => {
      MongoMemoryServer.create();
    });
  }
  async disconnect() {
    await this.server.stop();
  }
  async uri() {
    const uri = await this.server.getUri();
    return uri;
  }
}
