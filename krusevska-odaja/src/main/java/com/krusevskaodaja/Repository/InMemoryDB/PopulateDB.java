package com.krusevskaodaja.Repository.InMemoryDB;

import com.krusevskaodaja.Model.Ingredient;
import com.krusevskaodaja.Model.Product;
import com.krusevskaodaja.Repository.JpaIngredientRepository;
import com.krusevskaodaja.Repository.JpaProductRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class PopulateDB {
    private final JpaProductRepository productRepository;
    private final JpaIngredientRepository ingredientRepository;

    public PopulateDB(JpaProductRepository productRepository, JpaIngredientRepository ingredientRepository) {
        this.productRepository = productRepository;
        this.ingredientRepository = ingredientRepository;
    }

    public void deleteDB() {
        productRepository.deleteAll();
        ingredientRepository.deleteAll();
    }

    public void populateDB() {
        fillDB();
    }

    public Product getProductByName(String productName) {
        Optional<Product> alreadyIn = productRepository.findAll().stream()
                .filter(product -> product.getName().toUpperCase().equals(productName.toUpperCase()))
                .findFirst();
        if (alreadyIn.isEmpty()) {
            return null;
        }
        return alreadyIn.get();
    }

    public void fillDB() {
        List<Product> products = new ArrayList<>();
        List<Ingredient> ingredients = new ArrayList<>() {{
            add(new Ingredient(UUID.randomUUID().toString(), "Зелка", "cabbage"));
            add(new Ingredient(UUID.randomUUID().toString(), "Патлиџан", "tomato"));
            add(new Ingredient(UUID.randomUUID().toString(), "Краставица", "cucumber"));
            add(new Ingredient(UUID.randomUUID().toString(), "Цвекло", "beets"));
            add(new Ingredient(UUID.randomUUID().toString(), "Морков", "carrots"));
            add(new Ingredient(UUID.randomUUID().toString(), "Кромид", "onions"));
            add(new Ingredient(UUID.randomUUID().toString(), "Сирење", "cheese"));
            add(new Ingredient(UUID.randomUUID().toString(), "Пиперка", "pepper"));
            add(new Ingredient(UUID.randomUUID().toString(), "Маслинка", "olives"));
            add(new Ingredient(UUID.randomUUID().toString(), "Марула", "lettuce"));
            add(new Ingredient(UUID.randomUUID().toString(), "Јајце", "egg"));
            add(new Ingredient(UUID.randomUUID().toString(), "Павлака", "sour cream"));
            add(new Ingredient(UUID.randomUUID().toString(), "Орев", "walnut"));
            add(new Ingredient(UUID.randomUUID().toString(), "Кашкавал", "yellow cheese"));
            add(new Ingredient(UUID.randomUUID().toString(), "Кисели Пиперки", "sour peppers"));
            add(new Ingredient(UUID.randomUUID().toString(), "Кајмак", "curd"));
            add(new Ingredient(UUID.randomUUID().toString(), "Кисел Карфиол", "sour cauliflower"));
            add(new Ingredient(UUID.randomUUID().toString(), "Краставички", "pickles"));
            add(new Ingredient(UUID.randomUUID().toString(), "Презла", ""));
            add(new Ingredient(UUID.randomUUID().toString(), "Пилешко", "chicken"));
            add(new Ingredient(UUID.randomUUID().toString(), "Брашно", "flour"));
            add(new Ingredient(UUID.randomUUID().toString(), "Похован Кашкавал", "breaded yellow cheese"));
            add(new Ingredient(UUID.randomUUID().toString(), "Тиквици", "zucchini"));
            add(new Ingredient(UUID.randomUUID().toString(), "Зденка", "cream cheese"));
            add(new Ingredient(UUID.randomUUID().toString(), "Биено Сирење", "hard cheese"));
            add(new Ingredient(UUID.randomUUID().toString(), "Мазник", "pie"));
            add(new Ingredient(UUID.randomUUID().toString(), "Свинско", "pork"));
            add(new Ingredient(UUID.randomUUID().toString(), "Јунешко", "beef meat"));
            add(new Ingredient(UUID.randomUUID().toString(), "Лук", "garlic"));
            add(new Ingredient(UUID.randomUUID().toString(), "Свинско Каре", "pork meat"));
            add(new Ingredient(UUID.randomUUID().toString(), "Свинско Месо", "pork meat"));
            add(new Ingredient(UUID.randomUUID().toString(), "Праз", "leek"));
            add(new Ingredient(UUID.randomUUID().toString(), "Сос од пречурки", "mashroom sauce"));
            add(new Ingredient(UUID.randomUUID().toString(), "Сос", "sauce"));
            add(new Ingredient(UUID.randomUUID().toString(), "Мелено Месо", "minced meat"));
            add(new Ingredient(UUID.randomUUID().toString(), "Свинско Филе", "pork tenderloin"));
            add(new Ingredient(UUID.randomUUID().toString(), "Зеленчук", "vegetables"));
            add(new Ingredient(UUID.randomUUID().toString(), "Печурки", "mushrooms"));
            add(new Ingredient(UUID.randomUUID().toString(), "Стек", "steak"));
            add(new Ingredient(UUID.randomUUID().toString(), "Колбас", "sausage"));
            add(new Ingredient(UUID.randomUUID().toString(), "Јагнешко Печење", "rosted lamb"));
            add(new Ingredient(UUID.randomUUID().toString(), "Кисело Млеко", "sour cream"));
            add(new Ingredient(UUID.randomUUID().toString(), "Јагнешко Месо", "lamb meat"));
            add(new Ingredient(UUID.randomUUID().toString(), "Сецкано Свинско Месо", "sliced pork meat"));
        }};

        fillSalads(ingredients, products);
        fillAppetizers(ingredients, products);
        fillGarnishAndExtras(ingredients, products);
        fillGrill(ingredients, products);
        fillSpecialitiesOfHouse(ingredients, products);
        fillDishesToOrder(ingredients, products);
        fillDesertsAndSnacks(ingredients, products);
        fillDrinks(ingredients, products);

        products.forEach(product -> {
            product.setType(product.getType().toUpperCase());
            product.setName(product.getName().toUpperCase());
        });
        productRepository.saveAll(products);


//        fillIngredients(ingredients, products);
//
//        ingredients.forEach(ingredient -> {
//            ingredient.setName(ingredient.getName().toUpperCase());
//        });
//        ingredientRepository.saveAll(ingredients);
    }

    public List<Ingredient> splitIngredients(List<Ingredient> ingredients, String ingredientNames) {
        String[] nameParts = ingredientNames.split(" ");
        List<Ingredient> ingredientsToMap = new ArrayList<>();
        for (String s : nameParts) {
            String ingredientName = "";
            if (s.contains("-")) {
                String[] parts = s.split("-");
                ingredientName = parts[0] + " " + parts[1];
            } else {
                ingredientName = s;
            }
            String finalIngredientName = ingredientName;
            Optional<Ingredient> checkIngredient = ingredients.stream()
                    .filter(ingredient -> ingredient.getName().toUpperCase().equals(finalIngredientName.toUpperCase()))
                    .findFirst();
            if (checkIngredient.isEmpty()) {
                continue;
            }
            ingredientsToMap.add(checkIngredient.get());
        }
        return ingredientsToMap;
    }

    public List<Product> splitProducts(List<Product> products, String productsName) {
        String[] partsName = productsName.split(" ");
        List<Product> productsToMap = new ArrayList<>();
        for (String s : partsName) {
            String productName = "";
            if (s.contains("-")) {
                String[] parts = s.split("-");
                productName = parts[0] + " " + parts[1];
            } else {
                productName = s;
            }
            String finalProductName = productName;
            Optional<Product> checkProduct = products.stream()
                    .filter(product -> product.getName().toUpperCase().equals(finalProductName.toUpperCase()))
                    .findFirst();
            if (checkProduct.isEmpty()) {
                continue;
            }
            productsToMap.add(checkProduct.get());
        }
        return productsToMap;
    }

    public void fillSalads(List<Ingredient> ingredients, List<Product> products) {

        Product newProduct = new Product(UUID.randomUUID().toString(), "Сезонска", "Season", "100",
                "денари", "Salad", "", splitIngredients(ingredients, "Зелка Патлиџан Краставица Цвекло Морков"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Шопска", "Shopska", "100",
                "денари", "Salad", "", splitIngredients(ingredients, "Патлиџан Краставица Кромид Сирење"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Македонска", "Macedonian", "100",
                "денари", "Salad", "", splitIngredients(ingredients, "Патлиџан Кромид Пиперка"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Егејска", "Egejska", "100",
                "денари", "Salad", "", splitIngredients(ingredients, "Патлиџан Краставица Сирење Маслинка"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Мимоза", "Mimoza", "100",
                "денари", "Salad", "", splitIngredients(ingredients, "Марула Јајце"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Таратор", "Tarator", "100",
                "денари", "Salad", "", splitIngredients(ingredients, "Краставица Павлака Орев"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Овчарска", "Ovcharska", "130",
                "денари", "Salad", "", splitIngredients(ingredients, "Краставица Патлиџан Сирење Кашкавал Јајце"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Овчавина", "Ovchavina", "100",
                "денари", "Salad", "", splitIngredients(ingredients, "Кисели-Пиперки Кајмак Павлака"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Туршија", "Trushija", "80",
                "денари", "Salad", "", splitIngredients(ingredients, "Кисел-Карфиол Зелка Морков Краставички"));
        products.add(newProduct);
    }

    public void fillAppetizers(List<Ingredient> ingredients, List<Product> products) {
        Product newProduct = new Product(UUID.randomUUID().toString(), "Овчко сирење", "Sheep Cheese", "100",
                "денари", "Appetizers", "100 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Биено сирење", "Hard Cheese", "100",
                "денари", "Appetizers", "100 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Козјо сирење", "Goat Cheese", "120",
                "денари", "Appetizers", "100 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Кашкавал", "Yellow Cheese", "80",
                "денари", "Appetizers", "100 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Похован кашкавал", "Breaded Yellow Cheese", "100",
                "денари", "Appetizers", "100 г/g", splitIngredients(ingredients, "Кашкавал Презла Јајце"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Омлет", "Omlette", "80",
                "денари", "Appetizers", "3 јајца", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Кајгана", "Scrambled Eggs", "60",
                "денари", "Appetizers", "3 јајца", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пилешки прсти", "Chicken Fingers", "150",
                "денари", "Appetizers", "250 г/g", splitIngredients(ingredients, "Пилешко Брашно Презла Јајце"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Маслинки", "Olives", "80",
                "денари", "Appetizers", "150 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Даска Одаја", "Board Odaja", "450-900",
                "денари", "Appetizers", "Мала/Голема", splitIngredients(ingredients, "Похован-Кашкавал Тиквици Кромид Зденки Биено-сирење Мазник"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Мазник", "Maznik (Pie)", "80",
                "денари", "Appetizers", "Парче", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Питулици со лук", "Pitulici With Garlic", "80",
                "денари", "Appetizers", "Парче", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пита со праз", "Pie With Leek", "100",
                "денари", "Appetizers", "Парче", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пита со спанаќ", "Pie With Spinach", "100",
                "денари", "Appetizers", "Парче", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Печурки на скара", "Grilled Mushrooms", "80",
                "денари", "Appetizers", "200Г", new ArrayList<>());
        products.add(newProduct);
    }

    public void fillGarnishAndExtras(List<Ingredient> ingredients, List<Product> products) {
        Product newProduct = new Product(UUID.randomUUID().toString(), "Гарнир", "Garnish", "30",
                "денари", "GarnishAndExtras", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Нафора", "Roast Bread", "30",
                "денари", "GarnishAndExtras", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Нафора со сирење", "Roast Bread With Cheese", "50",
                "денари", "GarnishAndExtras", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Помфрит", "Fries small / large", "60-100",
                "денари", "GarnishAndExtras", "мал / голем", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Помфрит", "Fries With Cheese small / large", "70-120",
                "денари", "GarnishAndExtras", "мал / голем со сирење", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Парче леб", "Bread Piece", "10",
                "денари", "GarnishAndExtras", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Луто пиперче", "Hot Pepper", "10",
                "денари", "GarnishAndExtras", "", new ArrayList<>());
        products.add(newProduct);
    }

    public void fillGrill(List<Ingredient> ingredients, List<Product> products) {
        Product newProduct = new Product(UUID.randomUUID().toString(), "Кебап", "Kebab", "15",
                "денари", "Grill", "40 г/g", splitIngredients(ingredients, "Свинско Јунешко"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Плескавица", "Burger", "60",
                "денари", "Grill", "150 г/g", splitIngredients(ingredients, "Свинско Јунешко"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Ловечка плескавица", "Burger Lovecka Small", "120",
                "денари", "Grill", "мала 250 г/g", splitIngredients(ingredients, "Свинско Јунешко Кашкавал"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Ловечка плескавица", "Burger Lovecka Large", "180",
                "денари", "Grill", "голема 350 г/g", splitIngredients(ingredients, "Свинско Јунешко Кашкавал"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Македонка", "Makedonka Smal", "150",
                "денари", "Grill", "мала 300 г/g", splitIngredients(ingredients, "Свинско Јунешко Кашкавал"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Македонка", "Makedonka Large", "200",
                "денари", "Grill", "400 г/g", splitIngredients(ingredients, "Свинско Јунешко Кашкавал"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Уштипец", "Fritters", "120",
                "денари", "Grill", "200 г/g", splitIngredients(ingredients, "Свинско Јунешко Кашкавал Лук"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Ребро", "Pork Rib", "130",
                "денари", "Grill", "300 г/g", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Кременадла", "Pork Chop", "120",
                "денари", "Grill", "220 г/g", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Вешалица", "Ramsteak", "130",
                "денари", "Grill", "Мала/Голема", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Свински Ражнич", "Pork Kabobs", "130",
                "денари", "Grill", "200 г/g", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пилешки Ражнич", "Chicken Kabobs", "130",
                "денари", "Grill", "200 г/g", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Свински Увијач", "Wrapped Pork Meat", "140",
                "денари", "Grill", "240 г/g", splitIngredients(ingredients, "Свинско-каре"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пилешки Увијач", "Wrapped Chicken Meat", "140",
                "денари", "Grill", "240 г/g", splitIngredients(ingredients, "Пилешко Кашкавал"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Крушевски колбас", "Sausage Krushevski", "120",
                "денари", "Grill", "180 г/g", splitIngredients(ingredients, "Свинско-месо Праз"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пилешки стек", "Chicken steak", "100",
                "денари", "Grill", "200 г/g", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пилешки стек во сос", "Chicken Steak With Sauce", "150",
                "денари", "Grill", "200 г/g", splitIngredients(ingredients, "Пилешко Сос-со-печурки"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Натур шницла", "Natur Escalope", "200",
                "денари", "Grill", "200 г/g", splitIngredients(ingredients, "Свинско-каре Сос"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Фаширана Шницла", "Minced Meat Steak", "150",
                "денари", "Grill", "200 г/g", splitIngredients(ingredients, "Мелено-месо Брашно Презла Јајце"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Бечка шницла", "Wiener Schnitzel", "160",
                "денари", "Grill", "200 г/g", splitIngredients(ingredients, "Свинско-каре Брашно Презла Јајце"));
        products.add(newProduct);
    }

    public void fillSpecialitiesOfHouse(List<Ingredient> ingredients, List<Product> products) {
        Product newProduct = new Product(UUID.randomUUID().toString(), "Крушевска сабја", "Krushevska Sabja", "280",
                "денари", "Specialities", "300г", splitIngredients(ingredients, "Свинско Пилешко Мелено-месо Зеленчук"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Полнето свински филе", "Stuffed Pork Tenderloin", "300",
                "денари", "Specialities", "350г", splitIngredients(ingredients, "Свинско-филе Кашкавал Печурки"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Македонскка тава", "Macedonian Pan", "250",
                "денари", "Specialities", "300г", splitIngredients(ingredients, "Свинско Стек Колбас Зеленчук"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Селско месо", "Traditional meat", "250",
                "денари", "Specialities", "300г", splitIngredients(ingredients, "Свинско Мелено-месо Печурки Зеленчук"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Солено Свински на скара", "Pork Meat On Grill", "160",
                "денари", "Specialities", "280г", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Гравче тавче", "Beans Soup", "120",
                "денари", "Specialities", "", null);
        products.add(newProduct);
    }

    public void fillDishesToOrder(List<Ingredient> ingredients, List<Product> products) {
        Product newProduct = new Product(UUID.randomUUID().toString(), "Крушевски кукуруз „Одаја“", "Krushevski Kukuruz „Odaja“", "800",
                "денари", "DieshesToOrder", "тава за 4 лица", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Јагнешки ширден „Одаја“", "", "300",
                "денари", "DieshesToOrder", "350г", splitIngredients(ingredients, "Свинско-месо Јагнешко-месо Зеленчук"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Грав со пастрма", "Bean Soup With Veal", "1000",
                "денари", "DieshesToOrder", "тава за 4 лица", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Јагнешка тава „Одаја“", "Lamn Pot „Odaja“", "1600",
                "денари", "DieshesToOrder", "тава за 4 лица", splitIngredients(ingredients, "Јагнешко-печење Кисело-млеко Јајце"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Сарма „Одаја“", "Sarma „Odaja“", "800",
                "денари", "DieshesToOrder", "тава за 4 лица", splitIngredients(ingredients, "Сецкано-свинско-месо Зеленчук"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Селска тава „Одаја“", "Traditional Pan „Odaja“", "1200",
                "денари", "DieshesToOrder", "тава за 4 лица", splitIngredients(ingredients, "Свинско-месо Мелено-месо Печурки Зеленчук"));
        products.add(newProduct);
    }

    public void fillDesertsAndSnacks(List<Ingredient> ingredients, List<Product> products) {
        Product newProduct = new Product(UUID.randomUUID().toString(), "Палачинка", "Pancake", "80",
                "денари", "Desserts", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Сладолед", "Icecream", "100",
                "денари", "Desserts", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Гурабија", "Gurabija (Muffin)", "60",
                "денари", "Desserts", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Кикирики", "Peanuts", "50",
                "денари", "Snacks", "100 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Бадеми", "Alomond", "120",
                "денари", "Snacks", "80 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Фстаци", "Pistachio", "120",
                "денари", "Snacks", "80 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Лешници", "Hazelnut", "120",
                "денари", "Snacks", "80 г/g", new ArrayList<>());
        products.add(newProduct);
    }

    public void fillDrinks(List<Ingredient> ingredients, List<Product> products) {
        Product newProduct = new Product(UUID.randomUUID().toString(), "Тиквешка жолта", "Brandy Traditional Tikves Yellow", "60",
                "денари", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Тиквешка жолта VS", "Brandy Traditional Special Traditional Tikves Yellow", "80",
                "денари", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Тиквешка бела", "Brandy Traditional Tikves White", "60",
                "денари", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Коњак", "Cognac", "60",
                "денари", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Џин", "Gin", "60",
                "денари", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Водка", "Vodka", "60",
                "денари", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Смирноф", "Smirnoff", "80",
                "денари", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Узо", "Ouzo", "60",
                "денари", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Узо Плумари", "Ouzo Of Plomari", "80",
                "денари", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Мастика", "Mastika", "60",
                "денари", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Шток", "Stock", "80",
                "денари", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Џони Вокер", "Johny Walker Whiskey", "120",
                "денари", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Џејмисон", "Jameson Whiskey", "150",
                "денари", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Џим Бим", "Jim Beam Whisky", "120",
                "денари", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Бејлис", "Baileys", "80",
                "денари", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Мартини", "Martini", "80",
                "денари", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пелинковац", "Pelinkovac", "60",
                "денари", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Стомаклија", "Stomaklija", "70",
                "денари", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Јегер", "Jager", "80",
                "денари", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Јегер Маистер", "Jager Maister", "120",
                "денари", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Рум", "Rum", "60",
                "денари", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Смедеревка", "Smederevka", "240",
                "денари", "Wine", "1 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Кавадарка", "Kavadarka", "240",
                "денари", "Wine", "1 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Витач", "Vitach", "250",
                "денари", "Wine", "1 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Вранец", "Vranec", "250",
                "денари", "Wine", "1 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Розе", "Roze", "240",
                "денари", "Wine", "1 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Бунар", "Bunar", "320",
                "денари", "Wine", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Чаша вино", "Glass Of Wine", "60",
                "денари", "Wine", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Александрија", "Aleksandria White", "450",
                "денари", "Wine", "Бело 0.7 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Александрија", "Aleksandria Red", "450",
                "денари", "Wine", "Црно 0.7 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Траминец", "Traminec", "450",
                "денари", "Wine", "0.7 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Темјаника", "Temjanika", "450",
                "денари", "Wine", "0.7 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Т'га", "T'ga", "450",
                "денари", "Wine", "0.7 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Розе", "Roze", "450",
                "денари", "Wine", "0.7 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Александрија", "Aleksandria White", "120",
                "денари", "Wine", "Бело 0.187 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Александрија", "Aleksandria Red", "120",
                "денари", "Wine", "Црно 0.187 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Траминец", "Traminec", "120",
                "денари", "Wine", "0.187 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Темјаника", "Temjanika", "120",
                "денари", "Wine", "0.187 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Т'га", "T'ga", "120",
                "денари", "Wine", "0.187 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Александрија Куве", "Aleksandria Cuvee White", "850",
                "денари", "SpecialWine", "Бело 0.7", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Александрија Куве", "Aleksandria Cuvee Red", "850",
                "денари", "SpecialWine", "Црно 0.7", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Каберне Савињон", "Cabernet Sauvignon", "850",
                "денари", "SpecialWine", "Црно 0.7", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Сувињон Бланк", "Sauvignon Blanc", "850",
                "денари", "SpecialWine", "0.7", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Р'кацатели", "R'kacateli", "850",
                "денари", "SpecialWine", "0.7", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Бела Вода", "White Wather Whine White / Red", "2000",
                "денари", "SpecialWine", "Бело / Врно 0.7", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Барово", "Barovo White / Red", "2000",
                "денари", "SpecialWine", "Бело / Црно 0.7", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Каменица", "Kamenitza", "70",
                "денари", "Beer", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Јелен", "Jelen", "70",
                "денари", "Beer", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Старопрамен", "Staropramen", "100",
                "денари", "Beer", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Стела", "Stella Artois", "100",
                "денари", "Beer", "0.33", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Бекс", "Becks", "100",
                "денари", "Beer", "0.33", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Скопско", "Skopsko", "70",
                "денари", "Beer", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Македонско", "Makedonsko", "30",
                "денари", "Coffee", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Еспресо", "Espresso", "30",
                "денари", "Coffee", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Макијато", "Macchiato", "40",
                "денари", "Coffee", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Нес кафе", "Nescafe", "60",
                "денари", "Coffee", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Капучино", "Cappuccino", "60",
                "денари", "Coffee", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Чај", "Tea", "40",
                "денари", "Tea", "150 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Кока Кола", "Coca Cola", "60",
                "денари", "SoftDrinks", "0.25 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Фанта", "Fanta", "60",
                "денари", "SoftDrinks", "0.25 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Швепс", "Schweppes", "60",
                "денари", "SoftDrinks", "0.25 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Тоник", "Tonic", "60",
                "денари", "SoftDrinks", "0.25 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Спрајт", "Sprite", "60",
                "денари", "SoftDrinks", "0.25 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Густи Сокови", "Juice", "70",
                "денари", "SoftDrinks", "0.2 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пелистерка", "Pelisterka Sparkling", "40",
                "денари", "SoftDrinks", "газирана 0.25 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пелистерка", "Pelisterka Stil", "40",
                "денари", "SoftDrinks", "негазирана 0.25 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пелистерка", "Pelisterka Still / Sparkling", "60",
                "денари", "SoftDrinks", "газирана / негазирана 0.7 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пелистерка", "Pelisterka Sparkling", "60",
                "денари", "SoftDrinks", "газирана 1 Л/L", new ArrayList<>());
        products.add(newProduct);
    }
}
