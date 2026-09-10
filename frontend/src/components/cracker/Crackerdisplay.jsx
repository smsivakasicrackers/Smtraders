import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../actions/productActions";
import Product from "../../Pages/products/Product";
import { SectionHeading, Button, ProductGridSkeleton, ErrorState, EmptyState } from "../ui";

const Crackerdisplay = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.productsState);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) toast.error(error);
    dispatch(getProducts(null));
  }, [dispatch, error]);

  return (
    <section className="section-container py-16 sm:py-20">
      {/* Heading */}
      <SectionHeading
        eyebrow="Handpicked Selection"
        title="Explore Our Crackers"
        subtitle="Discover all types of crackers — from night fireworks to kids' favorites — handpicked to make every celebration sparkle with joy."
        align="center"
        className="mx-auto mb-12"
      />

      {/* Product Grid */}
      {loading ? (
        <ProductGridSkeleton count={8} />
      ) : error ? (
        <ErrorState title="Couldn't load products" description={error} />
      ) : !products || products.length === 0 ? (
        <EmptyState
          title="No products available"
          description="Check back soon — new crackers are added regularly."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* View All Button */}
      <div className="mt-14 flex justify-center">
        <Button variant="primary" size="lg" onClick={() => navigate("/products")}>
          View All Crackers
        </Button>
      </div>
    </section>
  );
};

export default Crackerdisplay;
