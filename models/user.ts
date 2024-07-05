export class ModelUser {
  username: string;
  email: string;
  password: string;
  primaryKey: number;
  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.primaryKey = Math.random();
  }
}
