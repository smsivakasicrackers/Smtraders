import React, { Fragment, useEffect, useState, useCallback, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SlidersHorizontal, X } from "lucide-react";
import { getProducts } from "../../actions/productActions";
import { clearError } from "../../slices/productsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../../Pages/Home/MetaData";
import Pagination from "react-js-pagination";
import Product from "../../Pages/products/Product";
import { CATEGORIES } from "../../constants/categories";
import { Drawer, EmptyState, ErrorState, ProductGridSkeleton } from "../ui";

// Lazy-loaded, same split points as the previous page-level implementations.
const Footer = lazy(() => import("../footer/Footer"));
const Search = lazy(() => import("../search"));

/**
 * Shared "browse products" UI. Used by both:
 *  - /products            -> Cracker.jsx      (keyword/category come from the query string)
 *  - /search, /search/:kw -> ProductSearch.jsx (keyword comes from the :keyword route param)
 *
 * `keyword` and `categoryFromUrl` are derived by the caller from the URL so this
 * component stays a pure function of its props for the URL-driven values — the
 * query-string / route-param contract lives entirely in the two thin wrapper pages,
 * not in here.
 */
const ProductCatalog = ({ keyword = null, categoryFromUrl = "" }) => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(categoryFromUrl);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Keep local category state in sync when the URL-derived category changes
  // (e.g. navigating to /products?category=X, or a keyword-only search that
  // drops the category param) — same behavior as the previous Cracker.jsx.
  useEffect(() => {
    if (categoryFromUrl !== category) {
      setCategory(categoryFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFromUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (error) {
        toast.error(error);
      } else {
        dispatch(getProducts(keyword, category, currentPage));
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch, error, currentPage, category, keyword]);

  const setCurrentPageNo = useCallback((pageNo) => {
    setCurrentPage(pageNo);
  }, []);

  const selectCategory = useCallback((cat) => {
    setCategory(cat);
    setFiltersOpen(false);
  }, []);

  // Clearing the error lets the fetch effect run again on its next tick.
  const handleRetry = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const resultsLabel = loading
    ? "Loading our full collection..."
    : `${productsCount || 0} product${productsCount === 1 ? "" : "s"} to light up your celebration.`;

  return (
    <div className="min-h-screen bg-paper-50">
      <MetaData title="All Fireworks" />

      {/* Header */}
      <section className="border-b border-ink-100 bg-white px-4 pb-10 pt-16 text-center sm:px-8 sm:pt-20">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl md:text-6xl">
          All <span className="text-crimson-600">Fireworks</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-ink-500 sm:text-lg">{resultsLabel}</p>

        <div className="mx-auto mt-8 max-w-lg">
          <Suspense fallback={<div className="text-sm text-ink-400">Loading search...</div>}>
            <Search />
          </Suspense>
        </div>
      </section>

      <div className="section-container py-8">
        {/* Category filter */}
        <div className="mb-8">
          {/* Desktop: pill buttons */}
          <div className="hidden md:block">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-500">
              Browse categories
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory("")}
                className={`rounded-pill border px-4 py-1.5 text-sm font-medium transition ${
                  category === ""
                    ? "border-crimson-600 bg-crimson-600 text-white"
                    : "border-ink-200 bg-white text-ink-700 hover:border-crimson-300 hover:text-crimson-700"
                }`}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-pill border px-4 py-1.5 text-sm font-medium transition ${
                    category === cat
                      ? "border-crimson-600 bg-crimson-600 text-white"
                      : "border-ink-200 bg-white text-ink-700 hover:border-crimson-300 hover:text-crimson-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile: Drawer-based filter panel, no horizontal scroll */}
          <div className="flex items-center justify-between gap-3 md:hidden">
            <button type="button" onClick={() => setFiltersOpen(true)} className="btn-secondary">
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              <span className="max-w-[12rem] truncate">{category || "Filters"}</span>
            </button>
            {category && (
              <button
                type="button"
                onClick={() => setCategory("")}
                className="flex shrink-0 items-center gap-1 text-sm font-medium text-ink-500 hover:text-crimson-600"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Clear
              </button>
            )}
          </div>

          <Drawer open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters" side="right">
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => selectCategory("")}
                className={`rounded-card border px-4 py-2.5 text-left text-sm font-medium transition ${
                  category === ""
                    ? "border-crimson-600 bg-crimson-50 text-crimson-700"
                    : "border-ink-200 text-ink-700 hover:border-crimson-300"
                }`}
              >
                All categories
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => selectCategory(cat)}
                  className={`rounded-card border px-4 py-2.5 text-left text-sm font-medium transition ${
                    category === cat
                      ? "border-crimson-600 bg-crimson-50 text-crimson-700"
                      : "border-ink-200 text-ink-700 hover:border-crimson-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Drawer>
        </div>

        {/* Product grid */}
        <Fragment>
          {error ? (
            <ErrorState title="Couldn't load products" description={error} onRetry={handleRetry} />
          ) : loading ? (
            <ProductGridSkeleton count={8} />
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No products found"
              description="Try a different keyword or browse another category."
            />
          )}
        </Fragment>

        {/* Pagination */}
        {productsCount > resPerPage && (
          <div className="mt-10 flex justify-center">
            <Pagination
              activePage={currentPage}
              onChange={setCurrentPageNo}
              totalItemsCount={productsCount}
              itemsCountPerPage={resPerPage}
              nextPageText="Next"
              lastPageText="Last"
              firstPageText="First"
              itemClass="mx-1 overflow-hidden rounded-md border border-ink-200 text-ink-600 hover:bg-crimson-50"
              linkClass="block px-3 py-1.5 text-sm font-medium"
              activeClass="border-crimson-600 bg-crimson-600 text-white hover:bg-crimson-600"
            />
          </div>
        )}
      </div>

      <Suspense fallback={<div className="py-8 text-center text-ink-400">Loading footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default React.memo(ProductCatalog);
