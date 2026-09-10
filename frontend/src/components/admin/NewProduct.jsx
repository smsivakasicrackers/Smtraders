import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearProductCreated, clearError } from "../../slices/productSlice";
import { toast } from "react-toastify";
import { Fragment, useEffect, useState } from "react";
import { createNewProduct } from "../../actions/productActions";
import { ImagePlus, Tag, Boxes, IndianRupee } from "lucide-react";
import Sidebar from "./Sidebar";
import { Button } from "../ui";
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

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, isProductCreated, error } =
    useSelector((state) => state.productState || {});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("originalPrice", originalPrice);
    formData.append("description", description);
    formData.append("category", category);
    images.forEach((image) => formData.append("images", image));
    dispatch(createNewProduct(formData));
  };

  useEffect(() => {
    if (isProductCreated) {
      toast("Product Created Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearProductCreated()),
      });
      navigate("/admin/products");
      return;
    }

    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
  }, [isProductCreated, error, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-paper-50">
      <Sidebar />

      <main className="p-4 sm:p-6 md:ml-64 lg:p-10">
        <Fragment>
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-crimson-600">
              Products
            </span>
            <h1 className="font-display text-2xl font-semibold text-ink-900">
              Create New Product
            </h1>
            <p className="text-sm text-ink-500">Add a new item to your catalog.</p>
          </div>

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
                <label htmlFor="name_field" className={LABEL_CLASSES}>
                  Product Name <span className="text-crimson-600">*</span>
                </label>
                <input
                  type="text"
                  id="name_field"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={INPUT_CLASSES}
                  placeholder="e.g. Ground Chakkara 10pc"
                />
              </div>

              <div>
                <label htmlFor="category_field" className={LABEL_CLASSES}>
                  Category <span className="text-crimson-600">*</span>
                </label>
                <select
                  id="category_field"
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
                <label htmlFor="description_field" className={LABEL_CLASSES}>
                  Description
                </label>
                <textarea
                  id="description_field"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${INPUT_CLASSES} resize-none`}
                  placeholder="Short description shown on the product page"
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
                  <label htmlFor="originalPrice_field" className={LABEL_CLASSES}>
                    Original Price (MRP)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id="originalPrice_field"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className={INPUT_CLASSES}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label htmlFor="price_field" className={LABEL_CLASSES}>
                    Discounted (Sale) Price <span className="text-crimson-600">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id="price_field"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={INPUT_CLASSES}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </FormSection>

            {/* Media */}
            <FormSection
              icon={ImagePlus}
              title="Media"
              description="Upload one or more images for this product."
            >
              <div>
                <input
                  type="file"
                  id="customFile"
                  name="images"
                  multiple
                  onChange={onImagesChange}
                  className="block w-full text-sm text-ink-700 file:mr-4 file:rounded-lg file:border-0 file:bg-crimson-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-crimson-700 hover:file:bg-crimson-100"
                />
                {imagesPreview.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-3">
                    {imagesPreview.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Preview"
                        className="h-16 w-16 rounded-md border border-ink-100 object-cover shadow-sm"
                      />
                    ))}
                  </div>
                )}
              </div>
            </FormSection>

            {/* Inventory */}
            <FormSection
              icon={Boxes}
              title="Inventory"
              description="How many units are currently in stock."
            >
              <div>
                <label htmlFor="stock_field" className={LABEL_CLASSES}>
                  Stock Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  id="stock_field"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className={INPUT_CLASSES}
                />
              </div>
            </FormSection>

            <div className="p-6 md:p-8">
              <Button type="submit" variant="primary" loading={loading} className="w-full">
                {loading ? "Creating..." : "Create Product"}
              </Button>
            </div>
          </form>
        </Fragment>
      </main>
    </div>
  );
}
