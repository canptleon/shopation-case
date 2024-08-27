import React, { useState, useMemo, useEffect } from "react";
import { getProducts } from "@/data/api/products";
import HtmlHead from "@/components/HtmlHead";
import Layout from "@/layouts/Layout";
import { useAppContext } from "@/context/index";
import SearchBar from "@/components/Listing/SearchBar";
import ProductList from "@/components/Listing/ProductList";
import Pagination from "@/components/Listing/Pagination";
import FilterSidebar from "@/components/Listing/FilterSidebar";
import { useRouter } from "next/router";
import { Product } from "@/data/types/general";

interface Props {
  initialProducts: Product[];
  initialTotalPages: number;
}

const productsPerPage = 12;

function Homepage({ initialProducts, initialTotalPages }: Props) {
  const { addToCart } = useAppContext();

  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [selectedModels, setSelectedModels] = useState<Set<string>>(new Set());
  const [maxPrice, setMaxPrice] = useState<number>(
    Math.max(...initialProducts.map(p => parseFloat(p.price)))
  );
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: maxPrice,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isMobileFilterOn, setIsMobileFilterOn] = useState<boolean>(false);
  const uniqueBrands = useMemo(
    () => Array.from(new Set(initialProducts.map(p => p.brand))),
    [initialProducts]
  );
  const uniqueModels = useMemo(
    () => Array.from(new Set(initialProducts.map(p => p.model))),
    [initialProducts]
  );

  useEffect(() => {
    const filtered = initialProducts.filter(product => {
      const matchesBrand = selectedBrands.size === 0 || selectedBrands.has(product.brand);
      const matchesModel = selectedModels.size === 0 || selectedModels.has(product.model);
      const matchesPrice =
        parseFloat(product.price) >= priceRange.min && parseFloat(product.price) <= priceRange.max;
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());

      return matchesBrand && matchesModel && matchesPrice && matchesQuery;
    });

    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / productsPerPage));
    setCurrentPage(1);
  }, [selectedBrands, selectedModels, priceRange, query, initialProducts]);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    const { page, ...restOfQuery } = router.query;

    router.push(
      {
        pathname: router.pathname,
        query: pageNumber === 1 ? restOfQuery : { ...router.query, page: pageNumber },
      },
      undefined,
      { shallow: true }
    );
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
    setCurrentPage(1);
  };

  const toggleBrandSelection = (brand: string) => {
    setSelectedBrands(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(brand)) {
        newSelected.delete(brand);
      } else {
        newSelected.add(brand);
      }
      return newSelected;
    });
  };

  const toggleModelSelection = (model: string) => {
    setSelectedModels(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(model)) {
        newSelected.delete(model);
      } else {
        newSelected.add(model);
      }
      return newSelected;
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <Layout>
      <div className="min-h-screen flex">
        <HtmlHead title="Shopation" />
        <div className="container mx-auto flex">
          <FilterSidebar
            priceRange={priceRange}
            handlePriceRangeChange={handlePriceRangeChange}
            maxPrice={maxPrice}
            uniqueBrands={uniqueBrands}
            uniqueModels={uniqueModels}
            toggleBrandSelection={toggleBrandSelection}
            toggleModelSelection={toggleModelSelection}
            selectedBrands={selectedBrands}
            selectedModels={selectedModels}
            isMobileFilterOn={isMobileFilterOn}
            setIsMobileFilterOn={setIsMobileFilterOn}
          />

          <main className="flex-1 pl-[33px] xsfull:px-[15px]">
            <div className="xsfull:flex xsfull:flex-row xsfull:items-center xsfull:gap-[5px] xsfull:mb-4">
              <button
                className="min-h-[49px] hidden w-[50px] bg-[white] xsfull:flex flex-row justify-center items-center border-[1px] border-[solid] border-[#13b7f9] rounded-[7px] h-full"
                onClick={() => setIsMobileFilterOn(!isMobileFilterOn)}>
                <img src="/images/filter.png" alt="Filter" />
              </button>
              <SearchBar query={query} handleChange={e => setQuery(e.target.value)} />
            </div>
            {currentProducts.length === 0 ? (
              <p className="text-center text-gray-500">
                We couldn't find any product that fits your queries.
              </p>
            ) : (
              <ProductList products={currentProducts} addToCart={handleAddToCart} />
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </main>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const { page, ...restOfQuery } = context.query;
  const currentPage = page ? parseInt(page as string, 10) : 1;

  const response = await getProducts();
  const products = response?.body ?? [];

  const totalPages = Math.ceil(products.length / productsPerPage);

  if (currentPage > totalPages || currentPage <= 1) {
    const queryString = new URLSearchParams(restOfQuery).toString();
    const destination = queryString ? `/?${queryString}` : "/";

    return {
      redirect: {
        destination,
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialProducts: products,
      initialTotalPages: totalPages,
    },
  };
}

export default Homepage;
