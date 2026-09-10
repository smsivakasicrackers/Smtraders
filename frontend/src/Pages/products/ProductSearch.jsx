import React from "react";
import { useParams } from "react-router-dom";
import ProductCatalog from "../../components/product-section/ProductCatalog";

/**
 * Routes: /search and /search/:keyword.
 * Thin wrapper — all browse/search UI now lives in the shared ProductCatalog.
 * The only route-specific behavior preserved here is seeding the initial
 * keyword from the :keyword param when present.
 */
const ProductSearch = () => {
  const { keyword } = useParams();

  return <ProductCatalog keyword={keyword || null} />;
};

export default ProductSearch;
