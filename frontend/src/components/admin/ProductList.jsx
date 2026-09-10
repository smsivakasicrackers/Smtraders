import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../slices/authslice";
import { deleteProduct, getAdminProducts } from "../../actions/productActions";
import { MDBDataTable } from "mdbreact";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus, PackageSearch } from "lucide-react";
import Sidebar from "./Sidebar";
import { clearProductDeleted } from "../../slices/productSlice";
import { Button, Badge, EmptyState, TableRowSkeleton } from "../ui";

const PLACEHOLDER_IMAGE = "https://placehold.co/100x100/png?text=SM";

export default function ProductList() {
  const {
    products = [],
    loading = true,
    error,
  } = useSelector((state) => state.productsState);
  const { isProductDeleted, error: productError } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (a.stock === 0 && b.stock !== 0) return -1;
    if (a.stock !== 0 && b.stock === 0) return 1;
    return 0;
  });

  const setProducts = () => {
    const data = {
      columns: [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Price", field: "price", sort: "asc" },
        { label: "Stock", field: "stock", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    sortedProducts.forEach((product, index) => {
      data.rows.push({
        id: index + 1,
        name: product.name,
        price: `₹${product.price}`,
        stock: product.stock,
        actions: (
          <Fragment>
            {product.stock === 0 && (
              <Badge tone="danger" className="mr-3 align-middle">
                Out of stock
              </Badge>
            )}
            <Link
              to={`/admin/product/${product._id}`}
              className="inline-flex items-center justify-center rounded-lg bg-crimson-600 px-3 py-2 text-white shadow-soft transition hover:bg-crimson-700"
            >
              <Pencil className="h-4 w-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={(e) => deleteHandler(e, product._id)}
              className="ml-3 inline-flex items-center justify-center rounded-lg bg-red-600 px-3 py-2 text-white shadow-soft transition hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  useEffect(() => {
    if (error || productError) {
      toast(error || productError, {
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isProductDeleted) {
      toast("Product Deleted Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearProductDeleted()),
      });
      return;
    }
    dispatch(getAdminProducts);
  }, [dispatch, error, isProductDeleted, productError]);

  return (
    <div className="min-h-screen bg-paper-50">
      <Sidebar />

      <main className="p-4 sm:p-6 md:ml-64 lg:p-10">
        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink-900">
              Product Catalog
            </h1>
            <p className="text-sm text-ink-500">
              {loading ? "Loading products…" : `${products.length} product${products.length === 1 ? "" : "s"} in your catalog`}
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => navigate("/admin/products/create")}
          >
            Add Product
          </Button>
        </div>

        {loading ? (
          <div className="card-surface overflow-hidden">
            <table className="w-full">
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <TableRowSkeleton key={i} columns={5} />
                ))}
              </tbody>
            </table>
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            icon={PackageSearch}
            title="No products found"
            description="Add your first product to start building your catalog."
            actionLabel="Add Product"
            onAction={() => navigate("/admin/products/create")}
          />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block">
              <div className="card-surface overflow-hidden">
                <div className="admin-datatable overflow-x-auto p-3 md:p-5">
                  <MDBDataTable
                    data={setProducts()}
                    bordered
                    striped
                    hover
                    className="text-sm md:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Mobile card fallback */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {sortedProducts.map((product) => (
                <div
                  key={product._id}
                  className="card-surface flex items-center gap-4 p-4"
                >
                  <img
                    src={product.images?.[0]?.image || PLACEHOLDER_IMAGE}
                    alt={product.name}
                    className="h-16 w-16 shrink-0 rounded-lg border border-ink-100 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink-900">{product.name}</p>
                    <p className="text-sm text-ink-500">₹{product.price}</p>
                    <div className="mt-1">
                      {product.stock === 0 ? (
                        <Badge tone="danger">Out of stock</Badge>
                      ) : (
                        <Badge tone="success">{product.stock} in stock</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2">
                    <Link
                      to={`/admin/product/${product._id}`}
                      className="inline-flex items-center justify-center rounded-lg bg-crimson-600 p-2 text-white shadow-soft transition hover:bg-crimson-700"
                      aria-label={`Edit ${product.name}`}
                    >
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <button
                      type="button"
                      onClick={(e) => deleteHandler(e, product._id)}
                      className="inline-flex items-center justify-center rounded-lg bg-red-600 p-2 text-white shadow-soft transition hover:bg-red-700"
                      aria-label={`Delete ${product.name}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
