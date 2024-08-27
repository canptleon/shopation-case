import React from "react";

interface ProductImageProps {
  image: string;
  name: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ image, name }) => (
  <div className="flex justify-center items-center lgfull:items-start">
    <img
      src={image}
      alt={name}
      className="object-cover rounded-lg shadow-lg max-w-[600px] max-h-[400px] mdfull:w-full"
    />
  </div>
);

export default ProductImage;
