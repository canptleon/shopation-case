import React from "react";
import Link from "next/link";
import { Product } from "@/data/types/general";

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

function ProductList({ products, addToCart }: ProductListProps) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 xsfull:grid-cols-1 gap-8">
      {products.map(product => (
        <div
          key={product.id}
          className="border rounded-lg shadow-md overflow-hidden p-4 bg-white hover:bg-gray-100">
          <Link href={`/${product.id}`}>
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />
              <h2 className="xlfull:min-h-[56px] text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600">{product.model}</p>
              <p className="text-gray-600">{product.brand}</p>
            </div>
          </Link>
          <div className="flex flex-row xxlfull:flex-col items-center justify-between">
            <p className="text-gray-900 font-bold xxlfull:mr-auto">{product.price}₺</p>
            <button
              onClick={() => addToCart(product)}
              className="xxlfull:ml-auto xxlfull:w-full flex flex-row justify-center items-center gap-2 bg-[linear-gradient(90deg,_rgba(26,215,255,1)_0%,_rgba(10,148,243,1)_100%)] text-white rounded-lg px-4 py-2">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
