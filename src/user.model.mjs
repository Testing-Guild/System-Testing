import { ConnectionDatabase } from "./db.config.mjs";

export class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.create();
  }
  create() {
    return { "username:": this.username, password: this.password };
  }
}
