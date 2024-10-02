export async function onFetchPost(path: string, params?: any) {
  const host = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3000";

  const response = await fetch(`${host}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params || {}),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.error);
  }

  return await response.json();
}

export async function onFetchGet(path: string, method: "GET") {
  const host = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3000";

  const response = await fetch(`${host}${path}`, {
    method,
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.error);
  }

  return await response.json();
}
