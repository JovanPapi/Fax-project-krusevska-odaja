package com.krusevskaodaja.Repository;

import com.krusevskaodaja.Model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface JpaIngredientRepository extends JpaRepository<Ingredient, String> {
    Ingredient findByName(String name);
}
