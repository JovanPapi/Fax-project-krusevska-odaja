package com.krusevskaodaja.service;

import com.krusevskaodaja.model.Product;
import com.krusevskaodaja.model.UtilDTO.ProductDTO;

import java.util.List;

public interface ProductService {
    boolean createOrUpdateProduct(ProductDTO productToProcess,String processType);
    boolean deleteProduct(String id);
    Product getProductByName(String productName);
    List<Product> getAllProducts();
    List<Product> getAllSuggestedProducts();
}
