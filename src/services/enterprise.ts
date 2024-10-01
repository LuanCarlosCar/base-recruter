import { onFetchGet, onFetchPost } from "./api";

export async function createEnterprise(params: any) {
  return await onFetchPost("/create-enterprise", "POST", params);
}

export async function getEnterprises() {
  return await onFetchGet("/enterprises", "GET");
}
