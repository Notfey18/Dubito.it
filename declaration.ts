import { ModelUser } from "./src/models/user";

export interface ParamsRegister {
  email: ModelUser["email"];
  username: ModelUser["username"];
  password: ModelUser["password"];
}
