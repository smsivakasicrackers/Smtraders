import axios from 'axios'
import { adminProductsFail, adminProductsRequest, adminProductsSuccess, productsFail, productsRequest, productsSucess } from '../slices/productsSlice';
import { deleteProductFail, deleteProductRequest, deleteProductSuccess, newProductFail, newProductRequest, newProductSuccess,updateProductRequest,updateProductSuccess,updateProductFail,productRequest,productFail,productSuccess } from '../slices/productSlice';


const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
export const getProducts = (keyword,category,currentPage,id,name,description,image) => async (dispatch) => {
    try{
        dispatch(productsRequest())
        let link = `${frontendUrl}/products?page=${currentPage}`;
        if(keyword){
            link += `&keyword=${keyword}`
        }
        if(category){
            link += `&category=${category}`
        }
        const {data} = await axios.get(link);
        dispatch(productsSucess(data))
    }catch(error){
//handle error
        dispatch(productsFail(error.response?.data?.message || "Failed to fetch products"))
    }
}
export const getProduct = id => async (dispatch) => {

    try {  
        dispatch(productRequest()) 
        const { data }  =  await axios.get(`${frontendUrl}/product/${id}`);
        console.log("API response:", data);
        dispatch(productSuccess(data.Product))
    } catch (error) {
        //handle error
        dispatch(productFail(error.response.data.message))
    }
    
}

export const updateProduct  =  (id, productData) => async (dispatch) => {

    try {  
        dispatch(updateProductRequest()) 
        const { data }  =  await axios.put(`${frontendUrl}/admin/product/${id}`, productData,{withCredentials:true});
        console.log("API response:", data);
        dispatch(updateProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(updateProductFail(error.response.data.message))
    }
    
}

// export const getProduct = id => async(dispatch)=>{
//     try{
//         dispatch(productsRequest())
//         const{data} = await axios.get(`/api/v1/product/${id}`);
//         dispatch(productsSucess(data))
//     }catch(error){

//     }
// }

export const getAdminProducts =  async (dispatch) => {
    try{
        dispatch(adminProductsRequest())
        
        const {data} = await axios.get(`${frontendUrl}/admin/products`,{withCredentials:true});
        dispatch(adminProductsSuccess(data))
    }catch(error){
//handle error
dispatch(adminProductsFail(error.response.data.message))
    }
}
export const createNewProduct = (productData) => async (dispatch) => {
    try {
        dispatch(newProductRequest());

        // No headers config needed, let axios handle it automatically
        const { data } = await axios.post(`${frontendUrl}/admin/product/new`, productData , {withCredentials:true});
        
        dispatch(newProductSuccess(data));
    } catch (error) {
        dispatch(newProductFail(error.response?.data?.message || "Server Error"));
        console.error("Product creation error:", error.response?.data);
    }
};



export const deleteProduct  =  id => async (dispatch) => {

    try {  
        dispatch(deleteProductRequest()) 
        await axios.delete(`${frontendUrl}/admin/product/${id}`,{withCredentials:true});
        dispatch(deleteProductSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteProductFail(error.response.data.message))
    }
    
}
// export const addStock = (id, quantity) => async (dispatch) => {
//     try {
//       dispatch(addStockRequest());
      
//       // Send the PUT request to add stock for the product
//       const { data } = await axios.put(
//         `${frontendUrl}/admin/product/stock/${id}`, 
//         { stock: quantity }, 
//         { withCredentials: true }
//       );
      
//       // Dispatch the success action
//       dispatch(addStockSuccess(data));
  
//     } catch (error) {
//       // Dispatch the failure action if error occurs
//       dispatch(addStockFail(error.response?.data?.message || 'Failed to add stock'));
//     }
//   };