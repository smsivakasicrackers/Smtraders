import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import {
  Menu,
  User,
  LayoutDashboard,
  LogOut,
  Search as SearchIcon,
  Phone,
  ShoppingCart,
} from "lucide-react";
import { Drawer } from "../ui";
import { BRAND } from "../../constants/brand";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  // Combo Packs temporarily hidden until the new combo lineup is ready.
  { label: "Price List", to: "/Price" },
  { label: "About Us", to: "/About" },
  { label: "Contact", to: "/contact" },
  { label: "Track Order", to: "/track-order" },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [keyword, setKeyword] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const go = (to) => {
    setMenuOpen(false);
    navigate(to);
  };

  const logoutHandler = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/");
  };

  const submitSearch = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    setSearchOpen(false);
    navigate(keyword.trim() ? `/products?keyword=${encodeURIComponent(keyword)}` : "/products");
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? "shadow-card" : "shadow-none border-b border-ink-100"
      }`}
    >
      <div className="section-container flex items-center justify-between gap-4 py-3">
        {/* Logo */}
        <button
          onClick={() => go("/")}
          className="flex shrink-0 items-center gap-2"
          aria-label="SM Crackers home"
        >
          <img src="../images/Logo-1.png" alt="SM Crackers logo" className="h-14 w-auto sm:h-16" />
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 font-medium text-ink-700 lg:flex">
          {NAV_LINKS.map((link) => (
            <li
              key={link.to}
              onClick={() => go(link.to)}
              className="cursor-pointer text-base transition-colors hover:text-crimson-600"
            >
              {link.label}
            </li>
          ))}
        </ul>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Desktop inline search */}
          <form onSubmit={submitSearch} className="hidden items-center md:flex">
            <div
              className={`flex items-center overflow-hidden rounded-full border border-ink-200 bg-ink-50 transition-all ${
                searchOpen ? "w-48 px-3" : "w-9 justify-center"
              }`}
            >
              <button
                type={searchOpen ? "submit" : "button"}
                onClick={() => !searchOpen && setSearchOpen(true)}
                aria-label="Search products"
                className="flex h-9 w-9 shrink-0 items-center justify-center text-ink-500 hover:text-crimson-600"
              >
                <SearchIcon className="h-4 w-4" />
              </button>
              {searchOpen && (
                <input
                  autoFocus
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onBlur={() => !keyword && setSearchOpen(false)}
                  placeholder="Search crackers..."
                  className="w-full bg-transparent py-2 text-sm text-ink-800 placeholder-ink-400 focus:outline-none"
                />
              )}
            </div>
          </form>

          <a
            href={`tel:+91${BRAND.phones.primary}`}
            className="hidden items-center gap-2 rounded-full border border-ink-200 px-3 py-2 text-xs font-semibold text-ink-600 hover:border-crimson-300 hover:text-crimson-700 lg:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            Call Us
          </a>

          {/* Cart — lives in the nav itself, not a separate floating button,
              so it can't collide with product-grid content while scrolling. */}
          <button
            onClick={() => go("/Mycart")}
            aria-label={cartCount > 0 ? `View cart, ${cartCount} items, ₹${cartTotal}` : "View cart"}
            className="relative flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-2 text-ink-600 transition hover:border-crimson-300 hover:text-crimson-700"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="hidden text-xs font-bold sm:inline">₹{cartTotal}</span>
            )}
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-crimson-600 px-1 text-[9px] font-bold text-white sm:hidden">
                {cartCount}
              </span>
            )}
          </button>

          {isAuthenticated && user?.role === "admin" && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full bg-crimson-600 px-4 py-2 text-sm text-white transition hover:bg-crimson-700"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{user.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-ink-100 bg-white shadow-premium">
                  <button
                    onClick={() => {
                      navigate("/admin/dashboard");
                      setDropdownOpen(false);
                    }}
                    className="flex w-full items-center px-4 py-2.5 text-sm text-ink-700 hover:bg-ink-50"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </button>
                  <button
                    onClick={logoutHandler}
                    className="flex w-full items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu trigger */}
          <button
            className="rounded-lg p-2 text-ink-600 hover:bg-ink-100 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} title="Menu">
        <form onSubmit={submitSearch} className="mb-5 flex items-center overflow-hidden rounded-full border border-ink-200 bg-ink-50 px-3">
          <SearchIcon className="h-4 w-4 shrink-0 text-ink-400" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search crackers..."
            className="w-full bg-transparent px-2 py-2.5 text-sm text-ink-800 placeholder-ink-400 focus:outline-none"
          />
        </form>

        <ul className="flex flex-col gap-1 text-ink-700">
          {NAV_LINKS.map((link) => (
            <li
              key={link.to}
              onClick={() => go(link.to)}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-ink-50 hover:text-crimson-600"
            >
              {link.label}
            </li>
          ))}
        </ul>

        <a
          href={`tel:+91${BRAND.phones.primary}`}
          className="mt-4 flex items-center justify-center gap-2 rounded-full border border-ink-200 px-4 py-2.5 text-sm font-semibold text-ink-700"
        >
          <Phone className="h-4 w-4" /> Call Us
        </a>
      </Drawer>
    </nav>
  );
};

export default Navbar;
