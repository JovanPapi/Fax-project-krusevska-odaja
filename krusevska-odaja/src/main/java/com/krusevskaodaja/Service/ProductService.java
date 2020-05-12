package com.krusevskaodaja.Service;

import com.krusevskaodaja.Model.Ingredient;
import com.krusevskaodaja.Model.Product;
import com.krusevskaodaja.Model.UtilDTO.ProductDTO;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    boolean createOrUpdateProduct(ProductDTO productToProcess,String processType);
    boolean deleteProduct(String id);
    Product getProductByName(String productName);
    List<Product> getAllProducts();
    List<Product> getAllSuggestedProducts();
}
