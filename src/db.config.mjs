import { MongoMemoryServer } from "mongodb-memory-server";
export class ConnectionDatabase {
  constructor() {
    this.server = new Promise(() => {
      MongoMemoryServer.create();
    });
  }
  disconnect() {
    this.server.stop();
  }
  uri() {
    return this.server.getUri();
  }
}
