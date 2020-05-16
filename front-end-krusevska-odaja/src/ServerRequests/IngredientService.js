import axios from "../custom-build-axios/axios";

export const IngredientService = {
    fetchAllIngredients: () => {
        return axios.get("/api/ingredients/all-ingredients");
    }
};