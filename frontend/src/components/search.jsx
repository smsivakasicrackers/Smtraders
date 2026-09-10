import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(keyword)}`);
    } else {
      navigate(`/products`);
    }
  };

  const handleKeywordChange = (e) => {
    const val = e.target.value;
    setKeyword(val);
    if (val === "") {
      navigate(`/products`);
    }
  };

  useEffect(() => {
    // If the user navigates directly to /products without a keyword or clears it
    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.get("keyword")) {
      setKeyword("");
    } else {
      setKeyword(searchParams.get("keyword"));
    }
  }, [location.search]);

  return (
    <form onSubmit={searchHandler} className="w-full flex justify-center px-4">
      <div className="flex w-full max-w-lg items-center overflow-hidden rounded-pill border border-ink-200 bg-white shadow-soft transition-all focus-within:border-crimson-400 focus-within:ring-2 focus-within:ring-crimson-100">
        <input
          type="text"
          placeholder="Search for crackers..."
          value={keyword}
          onChange={handleKeywordChange}
          className="flex-grow bg-transparent px-5 py-2.5 text-sm text-ink-800 placeholder-ink-400 focus:outline-none md:text-base"
        />

        <button
          type="submit"
          aria-label="Search"
          className="flex items-center justify-center bg-crimson-600 px-5 py-2.5 text-white transition-all hover:bg-crimson-700 active:bg-crimson-800"
        >
          <SearchIcon size={18} />
        </button>
      </div>
    </form>
  );
}
