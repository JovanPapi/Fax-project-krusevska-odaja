package com.krusevskaodaja.repository;

import com.krusevskaodaja.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaIngredientRepository extends JpaRepository<Ingredient, String> {
    Ingredient findByName(String name);
}
