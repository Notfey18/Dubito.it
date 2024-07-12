interface Params {
  username: string;
  email: string;
  password: string;
}
export class ModelUser {
  [x: string]: string;
  username: string;
  email: string;
  password: string;
  primaryKey: string;
  constructor({ username, email, password }: Params) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.primaryKey = Math.random().toString(16).slice(2);
  }
}
