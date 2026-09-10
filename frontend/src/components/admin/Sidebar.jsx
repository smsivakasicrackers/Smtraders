import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  PlusCircle,
  ListOrdered,
  Users,
  ChevronDown,
  Menu,
  ExternalLink,
  LogOut,
  User,
} from "lucide-react";
import { Drawer } from "../ui";
import { logout } from "../../actions/userAction";

function AdminAccountActions({ onNavigate }) {
  const { user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    onNavigate?.();
    navigate("/");
  };

  return (
    <div className="border-t border-ink-800 px-4 py-4">
      <div className="mb-3 flex items-center gap-2.5 px-1 text-sm text-ink-300">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-800 text-gold-400">
          <User className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="truncate">{user?.name || "Admin"}</span>
      </div>
      <Link
        to="/"
        onClick={onNavigate}
        className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-ink-300 transition-colors hover:bg-ink-800 hover:text-white"
      >
        <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
        View Site
      </Link>
      <button
        type="button"
        onClick={logoutHandler}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
      >
        <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
        Logout
      </button>
    </div>
  );
}

const NAV_BASE =
  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-150";

function TopLink({ to, icon: Icon, label, active, onNavigate }) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={`${NAV_BASE} ${
        active
          ? "bg-crimson-600 text-white shadow-soft"
          : "text-ink-300 hover:bg-ink-800 hover:text-white"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}

function SidebarNav({ pathname, productMenu, setProductMenu, onNavigate }) {
  const productsActive = pathname.startsWith("/admin/product");

  return (
    <nav className="flex flex-1 flex-col gap-1.5 px-4 py-4">
      <TopLink
        to="/admin/dashboard"
        icon={LayoutDashboard}
        label="Dashboard"
        active={pathname === "/admin/dashboard"}
        onNavigate={onNavigate}
      />

      {/* Products dropdown */}
      <div>
        <button
          type="button"
          onClick={() => setProductMenu((prev) => !prev)}
          aria-expanded={productMenu}
          className={`${NAV_BASE} w-full justify-between ${
            productsActive
              ? "bg-ink-800 text-white"
              : "text-ink-300 hover:bg-ink-800 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-3">
            <Package className="h-4 w-4 shrink-0" aria-hidden="true" />
            Products
          </span>
          <ChevronDown
            className={`h-4 w-4 text-ink-400 transition-transform duration-200 ${
              productMenu ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {productMenu && (
          <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-ink-800 pl-4">
            <Link
              to="/admin/products"
              onClick={onNavigate}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                pathname === "/admin/products"
                  ? "font-semibold text-gold-400"
                  : "text-ink-400 hover:text-white"
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              All Products
            </Link>
            <Link
              to="/admin/products/create"
              onClick={onNavigate}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                pathname === "/admin/products/create"
                  ? "font-semibold text-gold-400"
                  : "text-ink-400 hover:text-white"
              }`}
            >
              <PlusCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Create Product
            </Link>
          </div>
        )}
      </div>

      <TopLink
        to="/admin/orders"
        icon={ListOrdered}
        label="Orders"
        active={pathname === "/admin/orders"}
        onNavigate={onNavigate}
      />

      <TopLink
        to="/admin/users"
        icon={Users}
        label="Users"
        active={pathname === "/admin/users"}
        onNavigate={onNavigate}
      />
    </nav>
  );
}

export default function Sidebar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [productMenu, setProductMenu] = useState(
    pathname.startsWith("/admin/product")
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-ink-800 bg-ink-950 px-4 py-3 md:hidden">
        <span className="flex items-center gap-2 font-display text-lg font-semibold text-white">
          <img src="/images/logo.png" alt="" className="h-8 w-auto" />
          SM Crackers <span className="text-gold-400">Admin</span>
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open admin menu"
          className="rounded-lg p-2 text-ink-200 hover:bg-ink-800"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile drawer nav */}
      <Drawer open={open} onClose={() => setOpen(false)} title="Admin Menu" side="left">
        <div className="-m-5 flex min-h-[calc(100vh-64px)] flex-col justify-between bg-ink-950">
          <SidebarNav
            pathname={pathname}
            productMenu={productMenu}
            setProductMenu={setProductMenu}
            onNavigate={() => setOpen(false)}
          />
          <AdminAccountActions onNavigate={() => setOpen(false)} />
        </div>
      </Drawer>

      {/* Desktop fixed sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:flex md:w-64 md:flex-col md:justify-between md:border-r md:border-ink-800 md:bg-ink-950">
        <div>
          <div className="border-b border-ink-800 px-6 py-5">
            <span className="flex items-center gap-2.5 font-display text-lg font-semibold text-white">
              <img src="/images/logo.png" alt="" className="h-9 w-auto" />
              SM Crackers
            </span>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-500">
              Admin Panel
            </p>
          </div>
          <SidebarNav
            pathname={pathname}
            productMenu={productMenu}
            setProductMenu={setProductMenu}
          />
        </div>
        <AdminAccountActions />
      </div>
    </>
  );
}
