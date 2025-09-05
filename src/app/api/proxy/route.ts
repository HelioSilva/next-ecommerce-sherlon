export async function GET(request: Request) {
  const url = new URL(request.url);
  const ponto = url.searchParams.get("pontoDeSincronizacao") ?? "";

  const clientId = process.env.SECRET_KEY ?? "";

  console.log("Iniciando requisição para gerar o token :" + clientId);
  const ApiToken = await fetch(
    `http://ms-ecommerce.hiper.com.br/api/v1/auth/gerar-token/${clientId}`,
    {
      headers: {},
    }
  );

  const dataToken = await ApiToken.json();
  console.log("Token gerado com sucesso: ", dataToken.token);

  const externalResponse = await fetch(
    `https://ms-ecommerce.hiper.com.br/api/v1/produtos/pontoDeSincronizacao?pontoDeSincronizacao=0`, //1328831
    {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    }
  );

  // Verifica se a resposta é válida
  if (!externalResponse.ok) {
    return new Response(
      JSON.stringify({ error: `Erro ${externalResponse.status}` }),
      {
        status: externalResponse.status,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Tenta ler o conteúdo de forma segura
  let data;
  try {
    data = await externalResponse.json();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "A resposta não é um JSON válido" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
