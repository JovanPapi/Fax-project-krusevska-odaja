package com.krusevskaodaja.Web;

import com.krusevskaodaja.Model.ApiResponse.ApiResponse;
import com.krusevskaodaja.Model.Product;
import com.krusevskaodaja.Model.UtilDTO.ProductDTO;
import com.krusevskaodaja.Repository.InMemoryDB.PopulateDB;
import com.krusevskaodaja.Repository.JpaProductRepository;
import com.krusevskaodaja.Service.InterfaceImpl.ProductServiceImpl;
import com.krusevskaodaja.Service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/products", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class ProductApiController {

    private final ProductService productService;
    private final JpaProductRepository productRepository;
    private final PopulateDB populateDB;

    public ProductApiController(ProductServiceImpl productService, JpaProductRepository productRepository, PopulateDB populateDB) {

        this.productService = productService;
        this.productRepository = productRepository;
        this.populateDB = populateDB;
    }

    @GetMapping("/all-products")
    public List<Product> fetchAllProducts() {
        List<Product> allProducts = productService.getAllProducts();
        Collections.sort(allProducts);
        return allProducts;
    }

    @GetMapping("/all-suggested-products")
    public List<Product> fetchAllSuggestedProducts() {
        List<Product> allSuggestedProducts = productService.getAllSuggestedProducts();
        Collections.sort(allSuggestedProducts);
        return allSuggestedProducts;
    }

    @PostMapping("/save-product")
    public ResponseEntity<?> saveNewProduct(@RequestBody ProductDTO newProduct) {
        if (productRepository.existsByName(newProduct.getName().toUpperCase())
                && productRepository.existsByType(newProduct.getType().toUpperCase())) {
            // ProductAlreadyExistsException
            return new ResponseEntity<>(new ApiResponse(false, "The product you sent " +
                    "is already created by the chefs. Go to menu section and view the products."), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ApiResponse(productService.createOrUpdateProduct(newProduct, "Create"), "Your product" +
                "is successfully send for checking. Thank you for your co-operation."), HttpStatus.OK);
    }

    @PatchMapping("/edit-product")
    public ResponseEntity<?> updateProduct(@RequestBody ProductDTO editedProduct) {
        if (!productRepository.existsById(editedProduct.getId())) {
            // ProductNotAvailableException
            return new ResponseEntity<>(new ApiResponse(false, "The product you want to edit" +
                    "is no longer available or has been deleted."), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ApiResponse(productService.createOrUpdateProduct(editedProduct, ""), "You have" +
                "successfully updated the product. Click OK to proceed."), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable String productId) {
        if (!productRepository.existsById(productId)) {
            // ProductNotAvailableException
            return new ResponseEntity<>(new ApiResponse(false, "The product you want to delete " +
                    "is no longer available or it's already deleted."), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ApiResponse(productService.deleteProduct(productId), "The product has been " +
                "successfully deleted. Click OK to proceed"), HttpStatus.OK);

    }

    @GetMapping("/populateDB")
    public void populateDB() {
        populateDB.populateDB();
    }

    @GetMapping("/deleteDB")
    public void deleteDB() {
        populateDB.deleteDB();
    }

}
