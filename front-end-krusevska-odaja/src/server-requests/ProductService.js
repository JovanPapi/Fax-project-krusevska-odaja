import axios from "../custom-build-axios/axios"

export const ProductService = {
    fetchAllProducts: () => {
        return axios.get("/api/products/all-products");
    },
    fetchAllSuggestedProducts: () => {
        return axios.get("/api/products/all-suggested-products");
    },
    createProduct: (productData) => {
        return axios.post("/api/products/save-product", productData);
    },
    updateProduct: (productData) => {
        return axios.patch("/api/products/edit-product", productData);
    },
    deleteProduct: (productId) => {
        return axios.delete(`/api/products/delete/${productId}`);
    }
};