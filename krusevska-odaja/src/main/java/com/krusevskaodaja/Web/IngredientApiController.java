package com.krusevskaodaja.Web;

import com.krusevskaodaja.Model.Ingredient;
import com.krusevskaodaja.Service.InterfaceImpl.IngredientServiceImpl;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/ingredients", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class IngredientApiController {

    private final IngredientServiceImpl ingredientService;

    public IngredientApiController(IngredientServiceImpl ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping("/allIngredients")
    public List<Ingredient> fetchAllIngredients() {
        return ingredientService.getAllIngredients();
    }

}
