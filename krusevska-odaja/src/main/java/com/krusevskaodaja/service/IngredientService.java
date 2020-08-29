package com.krusevskaodaja.service;

import com.krusevskaodaja.model.Ingredient;

import java.util.List;

public interface IngredientService {
//    boolean createIngredient(String name, String productName);
//    boolean updateIngredient(String id,String name,String productName);
    boolean deleteIngredient(String id);
    Ingredient getIngredientByName(String ingredientName);
    List<Ingredient> getAllIngredients();
}
