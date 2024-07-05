export class DocAPI {
  path: string = "";
  method: string = "";
  autenticated: boolean = false;
  constructor(
    path: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    autenticated: boolean
  ) {
    this.path = `/api${path}`;
    this.method = method;
    this.autenticated = autenticated;
  }
}
/*Get: si fa la chiamata, senza passare dati, e risponde con una pagina html
Post: passa delle informazioni e ne ritorna altre
Put: si aspetta tutti i parametri 
Patch: puoi non passare tutti i parametri
Delete: si aspetta tutti i parametri */
