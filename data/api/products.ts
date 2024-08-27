import { load } from ".";
import { Product } from "../types/general";

export const getProducts = () => load<Product[]>(
  `https://5fc9346b2af77700165ae514.mockapi.io/products`,
  "GET",
  undefined,
);

export const getProduct = (id: number) => load<Product>(
  `https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`,
  "GET",
  undefined,
);
