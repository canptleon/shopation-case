import React from "react";

interface ProductDetailsProps {
  name: string;
  model: string;
  brand: string;
  description: string;
  price: string;
  onAddToCart: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  name,
  model,
  brand,
  description,
  price,
  onAddToCart,
}) => (
  <div className="flex flex-col justify-between">
    <div>
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <p className="text-xl text-gray-700 mb-4">Model: {model}</p>
      <p className="text-lg text-gray-800 font-semibold mb-4">Brand: {brand}</p>
      <p className="text-gray-600 mb-6">{description}</p>
    </div>

    <div className="flex flex-row w-full items-center justify-end mdfull:justify-between gap-[30px]">
      <p className="text-2xl text-gray-900 font-bold">{price}₺</p>
      <button
        onClick={onAddToCart}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
        Add to Cart
      </button>
    </div>
  </div>
);

export default ProductDetails;
