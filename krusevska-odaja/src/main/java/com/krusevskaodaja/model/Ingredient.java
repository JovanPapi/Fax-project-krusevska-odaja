package com.krusevskaodaja.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity(name = "ingredients")
@NoArgsConstructor
@AllArgsConstructor
public class Ingredient {

    @Id
    private String id;

    @Column
    @NotNull
    private String name;

    @Column
    private String nameTranslate;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "ingredients")
    @JsonIgnore
    private List<Product> products = new ArrayList<>();

    public Ingredient(String id,String name,String nameTranslate){
        this.id = id;
        this.name = name;
        this.nameTranslate = nameTranslate;
    }
}
