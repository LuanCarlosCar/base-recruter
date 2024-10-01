import { onFetchPost } from "./api";

export async function createUser(params: any) {
  return await onFetchPost("/create-user", "POST", params);
}
