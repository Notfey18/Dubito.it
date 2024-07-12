import { ModelUser } from "./models/user";

export interface ParamsRegister {
  email: ModelUser["email"];
  username: ModelUser["username"];
  password: ModelUser["password"];
}

export interface ParamsLogin {
  email: ModelUser["email"];
  password: ModelUser["password"];
}
