const BASE_URL =
  "https://next-typescript-sample-a0qnihmfd-thirosues-projects.vercel.app";

export async function postData(url: string, data = {}, headers = {}) {
  // 既定のオプションには * が付いています
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(data), // 本体のデータ型は "Content-Type" ヘッダーと一致させる必要があります
  });
  return response.json(); // JSON のレスポンスをネイティブの JavaScript オブジェクトに解釈
}

export async function getData(url: string, headers = {}) {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  return response.json(); // JSON のレスポンスをネイティブの JavaScript オブジェクトに解釈
}

export async function putData(url: string, data = {}, headers = {}) {
  // 既定のオプションには * が付いています
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(data), // 本体のデータ型は "Content-Type" ヘッダーと一致させる必要があります
  });
  return response.json(); // JSON のレスポンスをネイティブの JavaScript オブジェクトに解釈
}

export async function deleteData(url: string, headers = {}) {
  // 既定のオプションには * が付いています
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  return response.json(); // JSON のレスポンスをネイティブの JavaScript オブジェクトに解釈
}
