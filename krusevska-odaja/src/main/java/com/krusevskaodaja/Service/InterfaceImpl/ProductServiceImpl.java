package com.krusevskaodaja.Service.InterfaceImpl;

import com.krusevskaodaja.Model.Ingredient;
import com.krusevskaodaja.Model.Product;
import com.krusevskaodaja.Model.UtilDTO.ProductDTO;
import com.krusevskaodaja.Repository.JpaIngredientRepository;
import com.krusevskaodaja.Repository.JpaProductRepository;
import com.krusevskaodaja.Service.ProductService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final JpaProductRepository productRepository;
    private final IngredientServiceImpl ingredientService;

    public ProductServiceImpl(JpaProductRepository productRepository, IngredientServiceImpl ingredientService) {
        this.productRepository = productRepository;
        this.ingredientService = ingredientService;
    }

    /**
     * Returns all products that are created and suggested by other kitchen chefs or owners
     * of other restaurant for further analyzing by Odaja owners.
     */
    @Override
    public List<Product> getAllSuggestedProducts() {
        return productRepository.findAll()
                .stream()
                .filter(product -> product.getPrice().contains("*"))
                .collect(Collectors.toList());
    }

    /**
     * Returns all products taken from the database that are not suggested
     * (suggested products created from other kitchen chefs or owners that are not viewed
     * and analyzed from Odaja owners).
     */
    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .filter(product -> !product.getPrice().contains("*"))
                .collect(Collectors.toList());
    }

    /**
     * Function that does both create and update product. It takes ProductDTO object and processType
     * param which tells what action to execute (create or update).
     * Returns only true because validation is executed in the controller.
     */
    @Override
    public boolean createOrUpdateProduct(ProductDTO productToProcess, String processType) {
        Product product = new Product();
        if (processType.equals("Create")) {
            product.setId(UUID.randomUUID().toString());
        } else {
            product = productRepository.getOne(productToProcess.getId());
        }
        product.setName(productToProcess.getName());
        product.setNameTranslated(productToProcess.getNameTranslated());
        product.setDescription(productToProcess.getDescription());

        String[] inputIngredients = productToProcess.getIngredients().split(" ");
        List<Ingredient> ingredients = new ArrayList<>();
        for (String s : inputIngredients) {
            ingredients.add(ingredientService.getIngredientByName(s));
        }

        product.setIngredients(ingredients);
        product.setPrice(productToProcess.getPrice());
        product.setType(productToProcess.getType().toUpperCase());
        product.setValuta(productToProcess.getValuta());

        productRepository.save(product);
        return true;
    }

    /**
     * Takes id param of the product and deletes that product from the database.
     * Returns only true because validation is executed in the controller.
     */
    @Override
    public boolean deleteProduct(String id) {
        productRepository.deleteById(id);
        return true;
    }

    /**
     * This function is implemented but never used. It may be deleted in future if has no use
     * in the controller.
     * Returns the searched product by given name.
     */
    @Override
    public Product getProductByName(String productName) {
        Optional<Product> alreadyIn = productRepository.findAll().stream()
                .filter(product -> product.getName().toUpperCase().equals(productName.toUpperCase()))
                .findFirst();
        if (alreadyIn.isEmpty()) {
            return null;
        }
        return alreadyIn.get();
    }
}
