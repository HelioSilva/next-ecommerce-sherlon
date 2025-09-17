import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const compareArrays = (a: any[], b: any[]) => {
  return a.toString() === b.toString();
};

export function toCapitalCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatarPreco(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

// utils/whatsapp.ts
export function enviarMensagemWhatsApp(phoneE164: string, message: string) {
  return `https://wa.me/${phoneE164.replace(
    /\D/g,
    ""
  )}?text=${encodeURIComponent(message)}`;
}

export function formatCpfCnpj(value: string) {
  const onlyNumbers = value.replace(/\D/g, "");

  if (onlyNumbers.length <= 11) {
    // CPF: 123.456.789-09
    return onlyNumbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    // CNPJ: 12.345.678/0001-95
    return onlyNumbers
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }
}

export const converterUnidadeMedida = (unidade: string) => {
  switch (unidade.toLowerCase()) {
    case "kg":
      return `peso`;
    case "gr":
      return `gramas`;
    case "pa":
      return `par`;
    default:
      return `unidade`;
  }
};
