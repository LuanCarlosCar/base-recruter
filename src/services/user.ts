import { onFetchPost } from "./api";

interface ParamsAuthenticate {
  token: string;
}

export interface DataAuthenticate {
  idUsuario: string;
  idEmpresa: string;
  nome: string;
  sobrenome: string;
  email: string;
}

interface ParamsCreateUser {
  email: string;
  password: string;
  nome: string;
  sobrenome: string;
  idEmpresa: string;
}

export interface DataCreateUser {
  idUsuario: string;
  idEmpresa: string;
  nome: string;
  sobrenome: string;
  email: string;
  token: string;
}
export async function createUser(
  params: ParamsCreateUser
): Promise<DataCreateUser> {
  return await onFetchPost("/create-user", params);
}

export async function authenticate(
  params: ParamsAuthenticate
): Promise<DataAuthenticate> {
  return await onFetchPost("/authenticate-token", params);
}
