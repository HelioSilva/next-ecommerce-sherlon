import { Product } from "./product.types";

export type ResponseDataAPI = {
  produtos: Product[];
  novidades: Product[];
  maisVendidos: Product[];
  isLoading: boolean;
  error: any;
};
