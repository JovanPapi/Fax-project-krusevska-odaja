package com.krusevskaodaja.Service.InterfaceImpl;

import com.krusevskaodaja.Model.Ingredient;
import com.krusevskaodaja.Model.Product;
import com.krusevskaodaja.Repository.JpaIngredientRepository;
import com.krusevskaodaja.Service.IngredientService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class IngredientServiceImpl implements IngredientService {

    private final JpaIngredientRepository ingredientRepository;
//    private final ProductServiceImpl productService;

    public IngredientServiceImpl(JpaIngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
//        this.productService = productService;
    }


    @Override
    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

//    @Override
//    public boolean createIngredient(String name, String productName) {
//        Optional<Ingredient> alreadyIn = ingredientRepository.findAll()
//                .stream()
//                .filter(ingredient -> ingredient.getName().toUpperCase().equals(name.toUpperCase()))
//                .findFirst();
//        if (alreadyIn.isEmpty()) {
//            Ingredient newIngredient = new Ingredient();
//            List<Product> products = new ArrayList<>();
//            Product product = productService.getProductByName(productName);
//            if (product == null) {
//                return false;
//            }
//            products.add(product);
//            newIngredient.setId(UUID.randomUUID().toString());
//            newIngredient.setName(name);
//            newIngredient.setProducts(products);
//            ingredientRepository.save(newIngredient);
//            return true;
//        }
//        return false;
//    }

//    @Override
//    public boolean updateIngredient(String id, String name, String productName) {
//        if (!ingredientRepository.existsById(id)) {
//            return false;
//        }
//        Ingredient updateIngredient = ingredientRepository.getOne(id);
//        List<Product> products = new ArrayList<>();
//        Product product = productService.getProductByName(productName);
//        if (product == null) {
//            return false;
//        }
//        products.add(product);
//        updateIngredient.setName(name);
//        updateIngredient.setProducts(products);
//        return true;
//    }

    @Override
    public boolean deleteIngredient(String id) {
        if (!ingredientRepository.existsById(id)) {
            return false;
        }
        ingredientRepository.deleteById(id);
        return true;
    }

    @Override
    public Ingredient getIngredientByName(String ingredientName) {
        Optional<Ingredient> checkIngredient = ingredientRepository.findAll()
                .stream()
                .filter(ingredient -> ingredient.getNameTranslate().toUpperCase().equals(ingredientName.toUpperCase()))
                .findFirst();
        if (checkIngredient.isEmpty()) {
            return null;
        }
        return checkIngredient.get();
    }
}
