export type Discount = {
  amount: number;
  percentage: number;
};

export type ImagemAdicional = {
  imagem: string;
};

export type Product = {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: ImagemAdicional[];
  price: number;
  discount: Discount;
  rating: number;
  stock: number;
  sizes: string[];
  unitOfMeasure: string;
};
