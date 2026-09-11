import React, { Fragment, useEffect, useRef, useState, useCallback, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SlidersHorizontal, X, Loader2 } from "lucide-react";
import { getProducts } from "../../actions/productActions";
import { clearError } from "../../slices/productsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../../Pages/Home/MetaData";
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
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.productsState
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(categoryFromUrl);
  const [filtersOpen, setFiltersOpen] = useState(false);
  // Accumulated across pages for infinite scroll — the Redux slice only ever
  // holds the most recently fetched page, so page 2+ results get appended
  // here rather than replacing what's already on screen.
  const [allProducts, setAllProducts] = useState([]);
  const sentinelRef = useRef(null);

  // Keep local category state in sync when the URL-derived category changes
  // (e.g. navigating to /products?category=X, or a keyword-only search that
  // drops the category param) — same behavior as the previous Cracker.jsx.
  useEffect(() => {
    if (categoryFromUrl !== category) {
      setCategory(categoryFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFromUrl]);

  // A changed filter/search starts over from page 1 with a clean list.
  useEffect(() => {
    setCurrentPage(1);
    setAllProducts([]);
  }, [category, keyword]);

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

  // Append newly-fetched pages onto the running list; page 1 replaces it.
  useEffect(() => {
    if (!products) return;
    setAllProducts((prev) => (currentPage === 1 ? products : [...prev, ...products]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const hasMore = allProducts.length < (productsCount || 0);

  // Load the next page automatically as the sentinel scrolls into view.
  useEffect(() => {
    if (!hasMore || loading || error) return undefined;
    const node = sentinelRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { rootMargin: "600px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loading, error, allProducts.length]);

  const selectCategory = useCallback((cat) => {
    setCategory(cat);
    setFiltersOpen(false);
  }, []);

  // Clearing the error lets the fetch effect run again on its next tick.
  const handleRetry = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink-950">
      <MetaData title="All Fireworks" />

      {/* Faint background emblem, fixed behind the whole page — decorative only */}
      <img
        src="/images/logo.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 top-1/2 h-[320px] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.05] sm:h-[460px]"
      />

      {/* Header */}
      <section className="relative px-4 pb-10 pt-16 text-center sm:px-8 sm:pt-20">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          All <span className="text-crimson-400">Fireworks</span>
        </h1>

        <div className="mx-auto mt-8 max-w-lg">
          <Suspense fallback={<div className="text-sm text-ink-400">Loading search...</div>}>
            <Search />
          </Suspense>
        </div>
      </section>

      <div className="section-container relative py-8">
        {/* Category filter */}
        <div className="mb-8">
          {/* Desktop: pill buttons */}
          <div className="hidden md:block">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-300">
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
                className="flex shrink-0 items-center gap-1 text-sm font-medium text-ink-300 hover:text-crimson-400"
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
          ) : loading && currentPage === 1 ? (
            <ProductGridSkeleton count={8} />
          ) : allProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
              {allProducts.map((product) => (
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

        {/* Infinite scroll — the sentinel triggers the next page as it
            scrolls into view; no pagination controls needed. */}
        {!error && allProducts.length > 0 && (
          <div ref={sentinelRef} className="mt-10 flex justify-center py-6">
            {loading && currentPage > 1 ? (
              <Loader2 className="h-6 w-6 animate-spin text-crimson-500" aria-hidden="true" />
            ) : !hasMore ? (
              <p className="text-sm text-ink-400">You've reached the end of the collection.</p>
            ) : null}
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
