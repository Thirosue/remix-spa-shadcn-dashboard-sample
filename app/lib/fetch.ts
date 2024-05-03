const BASE_URL = "https://next-typescript-sample-mu.vercel.app";

export async function postData(url: string, data = {}) {
  // 既定のオプションには * が付いています
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // 本体のデータ型は "Content-Type" ヘッダーと一致させる必要があります
  });
  return response.json(); // JSON のレスポンスをネイティブの JavaScript オブジェクトに解釈
}
