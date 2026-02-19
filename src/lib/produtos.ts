let cache: any[] | null = null
let lastFetch = 0
const CACHE_TIME = 10 * 60 * 1000 // 10 minutos

export async function getTodosProdutosApiHiper() { 
  const now = Date.now()

  if (cache && now - lastFetch < CACHE_TIME) {
    console.log("Tem cachê");
    return cache
  }

  // --------------------------
  const clientId = process.env.SECRET_KEY ?? "";

  console.log("Iniciando requisição para gerar o token :" + clientId);

  const ApiToken = await fetch(
    `http://ms-ecommerce.hiper.com.br/api/v1/auth/gerar-token/${clientId}`,
    {
      cache: "no-store",
      headers: {},
    }
  );

  const dataToken = await ApiToken.json();
  console.log("Token gerado com sucesso: ", dataToken.token);

  const externalResponse = await fetch(
    `https://ms-ecommerce.hiper.com.br/api/v1/produtos/pontoDeSincronizacao?pontoDeSincronizacao=0`, //1328831
    { 
      cache: "no-store",
      headers: { 
        Authorization: `Bearer ${dataToken.token}`,
      },
    }
  );

  // Verifica se a resposta é válida
  if (!externalResponse.ok) {
    console.log("Retornou nada");
    return null;
  }

  // Tenta ler o conteúdo de forma segura
  let data;
  try {
    data = await externalResponse.json();
  } catch (error) {
    return null
  }
  // --------------------------

  cache = data;
  lastFetch = now;

  return data;
}