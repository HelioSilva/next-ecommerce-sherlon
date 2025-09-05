/**
 * Um fetcher genérico e reutilizável para o SWR.
 * Ele lida com a requisição e a conversão para JSON,
 * além de tratar erros de HTTP, que o `fetch` não trata como exceções por padrão.
 */
export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);

  // Se o status da resposta não for 'ok' (ex: 404, 500), lança um erro.
  // O SWR irá capturar esse erro e o disponibilizará no estado `error`.
  if (!res.ok) {
    const error = new Error("Ocorreu um erro ao buscar os dados.");
    // Tenta anexar informações extras do corpo da resposta de erro.
    (error as any).info = await res.json().catch(() => null);
    (error as any).status = res.status;
    throw error;
  }

  return res.json();
};
