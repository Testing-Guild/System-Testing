export class ConnectionDB {
  server: void;
  constructor() {
    this.server = console.log("server connection");
  }
  disconnect(): void {
    console.log("server disconnect");
  }
}
