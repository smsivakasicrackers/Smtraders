import axios from "axios";
import { addCartItemRequest, addCartItemSuccess } from "../slices/cartSlice";

const frontendUrl = process.env.REACT_APP_FRONTEND_URL;; // Adjust if needed

export const addCartItem = (id, quantity, productData = null) => async (dispatch) => {
    try {
        dispatch(addCartItemRequest());

        let productInfo = productData;
        if (!productInfo) {
            const { data } = await axios.get(`${frontendUrl}/product/${id}`,{withCredentials:true});
            if (!data?.Product) throw new Error("Product not found in response");
            productInfo = data.Product;
        }

        if (Number(productInfo.stock) <= 0) {
            console.warn(`Product "${productInfo.name}" is out of stock.`);
            return;
        }

        const item = {
            product: productInfo._id,
            name: productInfo.name,
            price: productInfo.price,
            image: productInfo.images?.[0]?.image || "/default-product.jpg", // Fallback image
            stock: productInfo.stock,
            quantity,
        };

        dispatch(addCartItemSuccess(item));
    } catch (error) {
        console.error("Error adding to cart:", error.response?.data?.message || error.message);
    }
};
