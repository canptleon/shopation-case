import React, { useCallback } from "react";
import Layout from "@/layouts/Layout";
import { getProduct } from "@/data/api/products";
import { useAppContext } from "@/context/index";
import ProductImage from "@/components/Detail/ProductImage";
import ProductDetails from "@/components/Detail/ProductDetails";
import { Product } from "@/data/types/general";

interface Props {
  product: Product;
}

function Detail({ product }: Props) {
  const { addToCart } = useAppContext();

  const handleAddToCart = useCallback(() => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }, [addToCart, product]);

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex flex-row gap-[20px] mdfull:flex-col">
          <ProductImage image={product.image} name={product.name} />
          <ProductDetails
            name={product.name}
            model={product.model}
            brand={product.brand}
            description={product.description}
            price={product.price}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Detail;

export async function getServerSideProps(context: any) {
  const slug = context.req.url.replace(/^\/|\/$/g, "");

  const isNumber = !isNaN(slug);
  const isPositive = Number(slug) >= 0;

  if (!isNumber || (isNumber && !isPositive)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    try {
      const response = await getProduct(slug);
      if (!response.body) {
        return {
          notFound: true,
        };
      }

      return {
        props: {
          product: response.body,
        },
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        redirect: {
          destination: "/error",
          permanent: false,
        },
      };
    }
  }
}
