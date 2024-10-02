import { onFetchPost } from "./api";

interface ParamsLogInUser {
  email: string;
  password: string;
}
interface DataLogInUser {
  idUsuario: string;
  idEmpresa: string;
  nome: string;
  sobrenome: string;
  email: string;
  token: string;
}
export async function logInUser(
  params: ParamsLogInUser
): Promise<DataLogInUser> {
  return await onFetchPost("/log-in", params);
}
