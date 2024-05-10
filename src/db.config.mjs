import { MongoMemoryServer } from "mongodb-memory-server";
export class ConnectionDatabase {
  constructor() {
    this.server = new Promise(() => {
      MongoMemoryServer.create();
    });
  }
  disconnect() {
    if (this.server instanceof MongoMemoryServer) {
      this.server.stop();
    }
  }
  uri() {
    return this.server.getUri();
  }
}
