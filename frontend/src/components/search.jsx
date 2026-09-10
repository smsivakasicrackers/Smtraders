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
    <form
      onSubmit={searchHandler}
      className="w-full flex justify-center mt-6 mb-10 px-4"
    >
      <div className="flex items-center w-full max-w-lg bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden transition-all focus-within:ring-2 focus-within:ring-indigo-500">
        {/* Input Field */}
        <input
          type="text"
          placeholder="Search for crackers..."
          value={keyword}
          onChange={handleKeywordChange}
          className="flex-grow px-5 py-2 text-gray-700 placeholder-gray-400 focus:outline-none text-sm md:text-base"
        />

        {/* Search Button */}
        <button
          type="submit"
          className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 transition-all"
        >
          <SearchIcon size={18} />
        </button>
      </div>
    </form>
  );
}
