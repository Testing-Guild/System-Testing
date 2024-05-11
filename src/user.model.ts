export class User {
  username: string;
  password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.create();
  }
  create(): { username: string; password: string } {
    return { username: this.username, password: this.password };
  }
}
