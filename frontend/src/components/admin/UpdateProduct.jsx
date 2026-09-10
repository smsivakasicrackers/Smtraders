import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productActions";
import { clearError, clearProductUpdated } from "../../slices/productSlice";
import { toast } from "react-toastify";
import { ImagePlus, Tag, Boxes, IndianRupee } from "lucide-react";
import { Button, Skeleton } from "../ui";
import { CATEGORIES } from "../../constants/categories";

const INPUT_CLASSES =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder-ink-400 transition focus:border-crimson-400 focus:outline-none focus:ring-2 focus:ring-crimson-100";
const LABEL_CLASSES = "mb-1.5 block text-sm font-medium text-ink-700";

function FormSection({ icon: Icon, title, description, children }) {
  return (
    <section className="space-y-5 p-6 md:p-8">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-crimson-50 text-crimson-700">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-ink-900">{title}</h2>
          {description && <p className="text-sm text-ink-500">{description}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]); // store actual File objects
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { id: productId } = useParams();
  const { loading, isProductUpdated, error, product } = useSelector(
    (state) => state.productState
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle image input (multiple)
  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]); // for preview only
          setImages((old) => [...old, file]); // store actual file object
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Form submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("originalPrice", originalPrice);
    formData.set("stock", stock);
    formData.set("description", description);
    formData.set("category", category);

    images.forEach((img) => {
      formData.append("images", img);
    });

    dispatch(updateProduct(productId, formData));
  };

  // Fetch product details initially
  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  // Handle success/error
  useEffect(() => {
    if (isProductUpdated) {
      toast("Product Updated Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearProductUpdated()),
      });
      navigate("/admin/products");
    }

    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => dispatch(clearError()),
      });
    }
  }, [isProductUpdated, error, dispatch, navigate]);

  // Fill state when product is loaded
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setStock(product.stock || 0);
      setDescription(product.description || "");
      setOriginalPrice(product.originalPrice || "");
      setCategory(product.category || "");
      setOldImages(product.images || []);
    }
  }, [product]);

  return (
    <div className="min-h-screen bg-paper-50">
      <Sidebar />

      <main className="p-4 sm:p-6 md:ml-64 lg:p-10">
        <Fragment>
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-crimson-600">
              Products
            </span>
            <h1 className="font-display text-2xl font-semibold text-ink-900">Update Product</h1>
            <p className="text-sm text-ink-500">Edit the details of this catalog item.</p>
          </div>

          {loading ? (
            <div className="mx-auto max-w-3xl space-y-4 rounded-card border border-ink-100 bg-white p-6 shadow-card md:p-8">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : (
            <form
              onSubmit={submitHandler}
              encType="multipart/form-data"
              className="mx-auto max-w-3xl divide-y divide-ink-100 rounded-card border border-ink-100 bg-white shadow-card"
            >
              {/* General Information */}
              <FormSection
                icon={Tag}
                title="General Information"
                description="Identify the product and place it in a category."
              >
                <div>
                  <label className={LABEL_CLASSES}>
                    Product Name <span className="text-crimson-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={INPUT_CLASSES}
                  />
                </div>

                <div>
                  <label className={LABEL_CLASSES}>
                    Category <span className="text-crimson-600">*</span>
                  </label>
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={INPUT_CLASSES}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={LABEL_CLASSES}>Description</label>
                  <textarea
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${INPUT_CLASSES} resize-none`}
                  ></textarea>
                </div>
              </FormSection>

              {/* Pricing */}
              <FormSection
                icon={IndianRupee}
                title="Pricing"
                description="Set the MRP and the discounted selling price."
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className={LABEL_CLASSES}>Original Price (MRP)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className={INPUT_CLASSES}
                    />
                  </div>

                  <div>
                    <label className={LABEL_CLASSES}>
                      Discounted (Sale) Price <span className="text-crimson-600">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className={INPUT_CLASSES}
                    />
                  </div>
                </div>
              </FormSection>

              {/* Media */}
              <FormSection
                icon={ImagePlus}
                title="Media"
                description="Upload new images to replace or add to the gallery."
              >
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={onImagesChange}
                  className="block w-full text-sm text-ink-700 file:mr-4 file:rounded-lg file:border-0 file:bg-crimson-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-crimson-700 hover:file:bg-crimson-100"
                />

                <div className="flex flex-wrap gap-3">
                  {/* Old Images */}
                  {oldImages &&
                    oldImages.map((img, i) => (
                      <div key={i} className="relative">
                        <img
                          src={img.image || img.url}
                          alt="Current product"
                          className="h-20 w-20 rounded-md border border-ink-100 object-cover"
                        />
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-ink-900 px-2 py-0.5 text-[10px] font-semibold text-white">
                          current
                        </span>
                      </div>
                    ))}

                  {/* New Previews */}
                  {imagesPreview.map((img, i) => (
                    <div key={i} className="relative">
                      <img
                        src={img}
                        alt="New preview"
                        className="h-20 w-20 rounded-md border border-gold-300 object-cover"
                      />
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-semibold text-ink-900">
                        new
                      </span>
                    </div>
                  ))}
                </div>
              </FormSection>

              {/* Inventory */}
              <FormSection
                icon={Boxes}
                title="Inventory"
                description="How many units are currently in stock."
              >
                <div>
                  <label className={LABEL_CLASSES}>Stock Quantity</label>
                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className={INPUT_CLASSES}
                  />
                </div>
              </FormSection>

              <div className="p-6 md:p-8">
                <Button type="submit" variant="primary" loading={loading} className="w-full">
                  {loading ? "Updating..." : "Update Product"}
                </Button>
              </div>
            </form>
          )}
        </Fragment>
      </main>
    </div>
  );
}
