import React from "react";
import { FooterLinks } from "./footer.types";
import Link from "next/link";
import { cn } from "@/lib/utils";

const footerLinksData: FooterLinks[] = [
  {
    id: 1,
    title: "Empresa",
    children: [
      {
        id: 11,
        label: "Sobre nós",
        url: "#",
      },
      {
        id: 12,
        label: "Contatos",
        url: "#",
      },
      {
        id: 13,
        label: "Horário de funcionamento",
        url: "#",
      },
    ],
  },
  {
    id: 2,
    title: "Ajuda",
    children: [
      {
        id: 13,
        label: "Política de Frete",
        url: "#",
      },
      {
        id: 24,
        label: "Política de privacidade",
        url: "#",
      },
    ],
  },
  // {
  //   id: 3,
  //   title: "Perguntas frequentes",
  //   children: [
  //     {
  //       id: 31,
  //       label: "Pedidos",
  //       url: "#",
  //     },
  //     {
  //       id: 32,
  //       label: "Entrega",
  //       url: "#",
  //     },
  //     {
  //       id: 33,
  //       label: "Pagamento",
  //       url: "#",
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   title: "Mais",
  //   children: [
  //     {
  //       id: 41,
  //       label: "Nosso blog",
  //       url: "#",
  //     },
  //     {
  //       id: 42,
  //       label: "Galeria de fotos",
  //       url: "#",
  //     },
  //   ],
  // },
];

const LinksSection = () => {
  return (
    <>
      {footerLinksData.map((item) => (
        <section className="flex flex-col mt-5" key={item.id}>
          <h3 className="font-medium text-sm md:text-base uppercase tracking-widest mb-6">
            {item.title}
          </h3>
          {item.children.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className={cn([
                link.id !== 41 && link.id !== 43 && "capitalize",
                "text-black/60 text-sm md:text-base mb-4 w-fit",
              ])}
            >
              {link.label}
            </Link>
          ))}
        </section>
      ))}
    </>
  );
};

export default LinksSection;
