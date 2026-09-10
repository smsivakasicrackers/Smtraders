import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { adminOrders as adminOrdersAction } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminProducts } from "../../actions/productActions";
import { getUsers } from "../../actions/userAction";
import { Wallet, Package, ShoppingBag, Users, AlertTriangle } from "lucide-react";
import { StatCard } from "../ui";

export default function Dashboard() {
  const dispatch = useDispatch();
  let outOfStock = 0;
  const { products = [] } = useSelector((state) => state.productsState);
  const { users = [] } = useSelector((state) => state.userState);
  const { adminOrders = [] } = useSelector((state) => state.orderState);

  if (products.length > 0) {
    products.forEach((product) => {
      if (product.stock === 0) {
        outOfStock = outOfStock + 1;
      }
    });
  }

  let totalAmount = 0;
  if (adminOrders.length > 0) {
    adminOrders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  }

  useEffect(() => {
    dispatch(getAdminProducts);
    dispatch(getUsers);
    dispatch(adminOrdersAction);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-paper-50">
      <Sidebar />

      <main className="p-4 sm:p-6 md:ml-64 lg:p-10">
        {/* Welcome header */}
        <div className="mb-8 flex flex-col gap-1">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-crimson-600">
            Admin Panel
          </span>
          <h1 className="font-display text-3xl font-semibold text-ink-900">
            Welcome back 👋
          </h1>
          <p className="text-sm text-ink-500">
            Here&apos;s a snapshot of how SM Crackers is performing today.
          </p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <StatCard
            icon={Wallet}
            label="Total Revenue"
            value={`₹${totalAmount.toFixed(2)}`}
            tone="crimson"
          />

          <Link to="/admin/products" className="block">
            <StatCard icon={Package} label="Products" value={products.length} tone="emerald" />
          </Link>

          <Link to="/admin/orders" className="block">
            <StatCard icon={ShoppingBag} label="Orders" value={adminOrders.length} tone="gold" />
          </Link>

          <Link to="/admin/users" className="block">
            <StatCard icon={Users} label="Users" value={users.length} tone="ink" />
          </Link>

          <StatCard
            icon={AlertTriangle}
            label="Out of Stock"
            value={outOfStock}
            tone="amber"
          />
        </div>

        {/* Quick links */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            to="/admin/products"
            className="card-surface flex items-center justify-between p-5 transition hover:-translate-y-0.5 hover:shadow-premium"
          >
            <div>
              <p className="font-display text-lg font-semibold text-ink-900">Products</p>
              <p className="text-sm text-ink-500">Manage your catalog</p>
            </div>
            <span className="text-sm font-semibold text-crimson-600">View →</span>
          </Link>

          <Link
            to="/admin/orders"
            className="card-surface flex items-center justify-between p-5 transition hover:-translate-y-0.5 hover:shadow-premium"
          >
            <div>
              <p className="font-display text-lg font-semibold text-ink-900">Orders</p>
              <p className="text-sm text-ink-500">Track and update enquiries</p>
            </div>
            <span className="text-sm font-semibold text-crimson-600">View →</span>
          </Link>

          <Link
            to="/admin/users"
            className="card-surface flex items-center justify-between p-5 transition hover:-translate-y-0.5 hover:shadow-premium"
          >
            <div>
              <p className="font-display text-lg font-semibold text-ink-900">Users</p>
              <p className="text-sm text-ink-500">See registered leads</p>
            </div>
            <span className="text-sm font-semibold text-crimson-600">View →</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
