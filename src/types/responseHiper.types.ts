import { ProdutoHiper } from "./productHiper.types";

export type ResponseHiper = {
  pontoDeSincronizacao: Number;
  produtos: ProdutoHiper[];
  errors: string[];
  message: string;
};
