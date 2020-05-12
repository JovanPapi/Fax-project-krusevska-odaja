import axios from "../custom-build-axios/axios"

export const ProductService = {
  fetchAllProducts: ()=>{
      return axios.get("/api/products/all-products");
  }
};