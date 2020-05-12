package com.krusevskaodaja.Service.InterfaceImpl;

import com.krusevskaodaja.Model.Ingredient;
import com.krusevskaodaja.Repository.JpaIngredientRepository;
import com.krusevskaodaja.Service.IngredientService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientServiceImpl implements IngredientService {

    private final JpaIngredientRepository ingredientRepository;

    public IngredientServiceImpl(JpaIngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }


    @Override
    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    // TODO ova mozi i da ne bidi dozvoleno!!
//    @Override
//    public boolean createIngredient(String name, String productName) {
//        Optional<Ingredient> alreadyIn = ingredientRepository.findAll()
//                .stream()
//                .filter(ingredient -> ingredient.getName().toUpperCase().equals(name.toUpperCase()))
//                .findFirst();
//        if (alreadyIn.isEmpty()) {
//            Ingredient newIngredient = new Ingredient();
//            //TODO ova moze da se napravi posebno i da bidi posebna funkcionalnost ( so product )
//            Product product = productService.getProductByName(productName);
//            if (product == null) {
//                return false;
//            }
//            newIngredient.setId(UUID.randomUUID().toString());
//            newIngredient.setName(name);
//            newIngredient.setProduct(product);
//            ingredientRepository.save(newIngredient);
//            return true;
//        }
//        return false;
//        return true;
//    }

    // TODO ova mozi i da ne bidi dozvoleno!!
//    @Override
//    public boolean updateIngredient(String id, String name, String productName) {
//        if (!ingredientRepository.existsById(id)) {
//            return false;
//        }
//        Ingredient updateIngredient = ingredientRepository.getOne(id);
//        Product product = productService.getProductByName(productName);
//        if (product == null) {
//            return false;
//        }
//        updateIngredient.setName(name);
//        updateIngredient.setProductList(product);
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
                .filter(ingredient -> ingredient.getName().toUpperCase().equals(ingredientName.toUpperCase()))
                .findFirst();
        if (checkIngredient.isEmpty()) {
            return null;
        }
        return checkIngredient.get();
    }
}
