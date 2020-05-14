package com.krusevskaodaja.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product implements Comparable<Product> {

    @Id
    private String id;

    @Column
    @NotNull
    private String name;

    @Column
    private String nameTranslated;

    @Column
    @NotNull
    private String valuta;

    @Column
    @NotNull
    private String price;

    @Column
    @NotNull
    private String type;

    @Column
    private String description;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE})
    private List<Ingredient> ingredients = new ArrayList<>();

    public boolean checkSameIngredients(List<Ingredient> ingredientsToCompare) {
        if (this.ingredients.size() != ingredientsToCompare.size()) {
            return false;
        }
        for (Ingredient ingredient : this.ingredients) {
            if (!ingredientsToCompare.contains(ingredient)) {
                return false;
            }
        }
        return true;
    }

    @Override
    public int compareTo(Product product) {
        return this.getName().compareToIgnoreCase(product.getName());
    }
}
