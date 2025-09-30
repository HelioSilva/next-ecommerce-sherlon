"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import {
  cn,
  enviarMensagemWhatsApp,
  formatarPreco,
  formatCpfCnpj,
} from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { FaArrowRight } from "react-icons/fa6";
import { TbBasketExclamation } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { clearCart } from "@/lib/features/carts/cartsSlice";
import { useBuscarPorDescricao } from "@/lib/hooks/useBuscarPorDescricao";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { cart, totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );

  const { setResetFiltroBusca } = useBuscarPorDescricao();
  useEffect(() => {
    console.log("carrinho");
    setResetFiltroBusca(true);
  }, []);

  // 👉 Estados do formulário
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [erros, setErros] = useState<{ nome?: string; cpf?: string }>({});

  // Função de validação
  const validar = () => {
    const novosErros: typeof erros = {};
    if (!nome.trim()) novosErros.nome = "Obrigatório";
    if (!cpf.trim()) novosErros.cpf = "Obrigatório";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const MontarMensagemWA = () => {
    const items =
      cart?.items?.map((item: any) => {
        return (
          `Código: ${item.id}\n` +
          `Descrição: *${item.name}*\n` +
          `Tamanho: ${item.attributes[0]}\n` +
          `Quantidade: ${item.quantity}\n` +
          `Total item: ${formatarPreco(item.price)}\n` +
          `Imagem: ${item.srcUrl}\n` +
          `-----------------------------------------\n\n`
        );
      }) || [];

    return (
      `Olá, gostaria de fazer o pedido:\n\n` +
      `Cliente:\n\n` +
      `Nome | Razão Social: ${nome}\n` +
      `CPF | CNPJ: ${cpf}\n\n` +
      `Produtos:\n\n` +
      items.join("\n") +
      `\nTotal: ${formatarPreco(adjustedTotalPrice)}\n\n`
    );
  };

  const handlePedido = () => {
    if (!validar()) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    const mensagemTexto = MontarMensagemWA();

    dispatch(clearCart());

    window.location.href = enviarMensagemWhatsApp(
      process.env.NEXT_PUBLIC_NUM_WHATSAPP_RECEBE_PEDIDO || "",
      mensagemTexto
    );
  };

  return (
    <main className="pb-20">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {cart && cart.items.length > 0 ? (
          <>
            <BreadcrumbCart />
            <h2
              className={cn([
                integralCF.className,
                "font-bold text-[32px] md:text-[40px] text-[#685048] uppercase mb-5 md:mb-6",
              ])}
            >
              Seu pedido
            </h2>
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
              {/* Lista de produtos */}
              <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                {cart?.items.map((product, idx, arr) => (
                  <React.Fragment key={idx}>
                    <ProductCard data={product} />
                    {arr.length - 1 !== idx && (
                      <hr className="border-t-black/10" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Formulário + Resumo */}
              <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex flex-col space-y-6 rounded-[20px] border border-black/10">
                <h6 className="text-xl md:text-2xl font-bold text-black">
                  Dados do Cliente
                </h6>

                <form className="flex flex-col space-y-4">
                  {/* Nome */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="nome"
                      className="text-sm font-medium text-black"
                    >
                      Nome | Razão Social
                    </label>
                    <input
                      autoFocus
                      id="nome"
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Escreva aqui..."
                      className={cn(
                        "w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2",
                        erros.nome
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#685048]"
                      )}
                    />
                    {erros.nome && (
                      <p className="mt-1 text-xs text-red-500">{erros.nome}</p>
                    )}
                  </div>

                  {/* CPF */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="cpf"
                      className="text-sm font-medium text-black"
                    >
                      CPF | CNPJ
                    </label>
                    <input
                      id="cpf"
                      type="text"
                      value={cpf}
                      onChange={(e) => setCpf(formatCpfCnpj(e.target.value))}
                      placeholder="Escreva aqui..."
                      className={cn(
                        "w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2",
                        erros.cpf
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#685048]"
                      )}
                    />
                    {erros.cpf && (
                      <p className="mt-1 text-xs text-red-500">{erros.cpf}</p>
                    )}
                  </div>
                </form>

                <h6 className="text-xl md:text-2xl font-bold text-black">
                  Resumo do pedido
                </h6>
                <div className="flex flex-col space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">Subtotal</span>
                    <span className="md:text-xl font-bold">
                      {formatarPreco(totalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">Entrega</span>
                    <span className="md:text-xl font-bold">a combinar</span>
                  </div>
                  <hr className="border-t-black/10" />
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black">Total</span>
                    <span className="text-xl md:text-2xl font-bold">
                      {formatarPreco(Math.round(adjustedTotalPrice))}
                    </span>
                  </div>
                  <div className="text-justify text-black/60">
                    <p>
                      Para compras no atacado, oferecemos{" "}
                      <strong>até 50% de desconto</strong> sobre o valor total.
                      Após o envio do pedido, nossa equipe entrará em contato
                      para confirmar as informações e aplicar o desconto
                      correspondente.
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  className="text-sm md:text-base font-medium bg-[#685048] rounded-full w-full py-4 h-[54px] md:h-[60px] group"
                  onClick={handlePedido}
                >
                  Realizar pedido{" "}
                  <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center flex-col text-gray-300 mt-32">
            <TbBasketExclamation strokeWidth={1} className="text-6xl" />
            <span className="block mb-4">Seu carrinho está vazio.</span>
            <Button className="rounded-full w-24 bg-[#685048]" asChild>
              <Link href="/shop">Voltar</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
