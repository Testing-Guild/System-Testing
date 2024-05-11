export class ConnectionDatabase {
  constructor() {
    this.server = console.log("server connection");
  }
  async disconnect() {
    await console.log("server disconnect");
  }
}
