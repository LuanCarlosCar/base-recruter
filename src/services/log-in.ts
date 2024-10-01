import { onFetchPost } from "./api";

export async function logInUser(params: any) {
  return await onFetchPost("/log-in", "POST", params);
}
