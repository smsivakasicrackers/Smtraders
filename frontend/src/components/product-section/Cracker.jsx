import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getProducts } from "../../actions/productActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../../Pages/Home/MetaData";
import Pagination from "react-js-pagination";
import Product from "../../Pages/products/Product";
import Loader from "../Loader";

// Lazy-loaded components
const Footer = lazy(() => import("../../components/footer/Footer"));
const Search = lazy(() => import("../search"));
const FloatingCard = lazy(() => import("../FloatingCard"));

// Simple skeleton loader
const ProductSkeleton = () => (
  <div className="bg-white shadow-md rounded-2xl p-4 animate-pulse w-full max-w-xs mx-auto">
    <div className="h-36 bg-gray-200 rounded-lg mb-4" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
);

const Cracker = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword") || null;
  const categoryFromUrl = searchParams.get("category") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(categoryFromUrl);

  const categories = useMemo(
    () => [
      "Sound crackers",
      "Twinkling star",
      "Flower pot",
      "Ground chakkara",
      "Bijli crackers",
      "Bomb",
      "Rockets",
      "Continue crackers",
      "Special wala",
      "Fancy show",
      "Sky shot rider",
      "Multi colour shot",
      "Branded sky shot",
      "Flying crackers",
      "Standard fountain",
      "Mega fountain",
      "Flash novalties",
      "Varities",
      "Colour matches",
      "Gift box",
      "Sparklers",
      "Peacock",
      "Pencil",
      "New Arrivals",
    ],
    []
  );

  useEffect(() => {
    if (categoryFromUrl !== category) {
      setCategory(categoryFromUrl);
    }
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

  return (
    <div className="bg-gradient-to-b from-indigo-50 via-white to-indigo-100">
      <Suspense fallback={<Loader />}>
        <Link to="/Mycart">
          <FloatingCard />
        </Link>
      </Suspense>

      <MetaData title="Crackers" />

      {/* Header */}
      <section className="text-center py-12 px-4 sm:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          All Type Of Crackers
        </h2>
        <p className="text-gray-600 text-sm md:text-base mt-2">
          Explore our vibrant collection of fireworks crafted to light up every celebration!
        </p>
      </section>

      {/* Search */}
      <div className="max-w-3xl mx-auto mb-8 px-4">
        <Suspense fallback={<div className="text-center text-gray-400">Loading search...</div>}>
          <Search />
        </Suspense>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Desktop Category List */}
        <div className="hidden md:block mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Browse Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 text-sm rounded-full border transition-all ${
                  category === cat
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-indigo-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Category Dropdown */}
        <div className="block md:hidden mb-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-12">
        <Fragment>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-600 text-lg">
              No products found 😔
            </div>
          )}
        </Fragment>

        {/* Pagination */}
        {productsCount > resPerPage && (
          <div className="flex justify-center mt-10">
            <Pagination
              activePage={currentPage}
              onChange={(pageNo) => setCurrentPageNo(pageNo)}
              totalItemsCount={productsCount}
              itemsCountPerPage={resPerPage}
              nextPageText="Next"
              lastPageText="Last"
              firstPageText="First"
              itemClass="mx-1 border rounded-md text-gray-600 hover:bg-indigo-50"
              linkClass="px-3 py-1 text-sm font-medium"
              activeClass="bg-indigo-600 text-white border-indigo-600"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default React.memo(Cracker);
