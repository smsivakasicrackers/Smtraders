import React from "react";
import { useLocation } from "react-router-dom";
import ProductCatalog from "./ProductCatalog";

/**
 * Route: /products (also handles ?keyword= and ?category=).
 * Thin wrapper — all browse/search UI now lives in the shared ProductCatalog,
 * this component's only job is to keep the exact same URL query-string
 * contract other parts of the app (links, the shared Search bar) rely on.
 */
const Cracker = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword") || null;
  const categoryFromUrl = searchParams.get("category") || "";

  return <ProductCatalog keyword={keyword} categoryFromUrl={categoryFromUrl} />;
};

export default React.memo(Cracker);
