import { onFetchGet, onFetchPost } from "./api";

interface ParamsCreateEnterprise {
  empresa: string;
}

interface DataEnterprises {
  id: string;
  empresa: string;
}

interface DataCreateEnterprise {
  id: string;
  empresa: string;
}
export async function createEnterprise(
  params: ParamsCreateEnterprise
): Promise<DataCreateEnterprise> {
  return await onFetchPost("/create-enterprise", params);
}

export async function getEnterprises(): Promise<DataEnterprises[]> {
  return await onFetchGet("/enterprises", "GET");
}
