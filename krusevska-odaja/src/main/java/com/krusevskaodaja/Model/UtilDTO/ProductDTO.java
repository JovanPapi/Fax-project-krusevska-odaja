package com.krusevskaodaja.Model.UtilDTO;

import com.krusevskaodaja.Model.Ingredient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private String id;
    private String name;
    private String nameTranslated;
    private String valuta;
    private String price;
    private String type;
    private String description;
    private String ingredients;

}
