const API_URL = import.meta.env.VITE_API_URL;

interface FetcherOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: unknown;
}

export const fetcher = async (
  endpoint: string,
  options: FetcherOptions = {}
) => {
  const { method = "GET", headers = {}, body } = options;

  const finalHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include", // 👈 obligatorio para enviar cookies
  });

  const contentType = res.headers.get("Content-Type");

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Error en la petición");
  }

  return contentType?.includes("application/json") ? res.json() : res.text();
};
