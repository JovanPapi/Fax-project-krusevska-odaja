package com.krusevskaodaja.repository.InMemoryDB;

import com.krusevskaodaja.model.Ingredient;
import com.krusevskaodaja.model.Product;
import com.krusevskaodaja.repository.JpaIngredientRepository;
import com.krusevskaodaja.repository.JpaProductRepository;
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
            add(new Ingredient(UUID.randomUUID().toString(), "Презла", "contempt"));
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

        Product newProduct = new Product(UUID.randomUUID().toString(), "Сезонска", "Season", "денари",
                "100", "Salad", "", splitIngredients(ingredients, "Зелка Патлиџан Краставица Цвекло Морков"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Шопска", "Shopska", "денари",
                "100", "Salad", "", splitIngredients(ingredients, "Патлиџан Краставица Кромид Сирење"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Македонска", "Macedonian", "денари",
                "100", "Salad", "", splitIngredients(ingredients, "Патлиџан Кромид Пиперка"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Егејска", "Egejska", "денари",
                "100", "Salad", "", splitIngredients(ingredients, "Патлиџан Краставица Сирење Маслинка"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Мимоза", "Mimoza", "денари",
                "100", "Salad", "", splitIngredients(ingredients, "Марула Јајце"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Таратор", "Tarator", "денари",
                "100", "Salad", "", splitIngredients(ingredients, "Краставица Павлака Орев"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Овчарска", "Ovcharska", "денари",
                "130", "Salad", "", splitIngredients(ingredients, "Краставица Патлиџан Сирење Кашкавал Јајце"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Овчавина", "Ovchavina", "денари",
                "100", "Salad", "", splitIngredients(ingredients, "Кисели-Пиперки Кајмак Павлака"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Туршија", "Trushija", "денари",
                "80", "Salad", "", splitIngredients(ingredients, "Кисел-Карфиол Зелка Морков Краставички"));
        products.add(newProduct);
    }

    public void fillAppetizers(List<Ingredient> ingredients, List<Product> products) {
        Product newProduct = new Product(UUID.randomUUID().toString(), "Овчко сирење", "Sheep Cheese", "денари",
                "100", "Appetizers", "100 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Биено сирење", "Hard Cheese", "денари",
                "100", "Appetizers", "100 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Козјо сирење", "Goat Cheese", "денари",
                "120", "Appetizers", "100 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Кашкавал", "Yellow Cheese", "денари",
                "80", "Appetizers", "100 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Похован кашкавал", "Breaded Yellow Cheese", "денари",
                "100", "Appetizers", "100 г/g", splitIngredients(ingredients, "Кашкавал Презла Јајце"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Омлет", "Omlette", "денари",
                "80", "Appetizers", "3 јајца", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Кајгана", "Scrambled Eggs", "денари",
                "60", "Appetizers", "3 јајца", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пилешки прсти", "Chicken Fingers", "денари",
                "150", "Appetizers", "250 г/g", splitIngredients(ingredients, "Пилешко Брашно Презла Јајце"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Маслинки", "Olives", "денари",
                "80", "Appetizers", "150 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Даска Одаја", "Board Odaja", "денари",
                "452-900", "Appetizers", "Мала/Голема", splitIngredients(ingredients, "Похован-Кашкавал Тиквици Кромид Зденки Биено-сирење Мазник"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Мазник", "Maznik (Pie)", "денари",
                "80", "Appetizers", "Парче", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Питулици со лук", "Pitulici With Garlic", "денари",
                "80", "Appetizers", "Парче", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пита со праз", "Pie With Leek", "денари",
                "100", "Appetizers", "Парче", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пита со спанаќ", "Pie With Spinach", "денари",
                "100", "Appetizers", "Парче", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Печурки на скара", "Grilled Mushrooms", "денари",
                "80", "Appetizers", "200Г", new ArrayList<>());
        products.add(newProduct);
    }

    public void fillGarnishAndExtras(List<Ingredient> ingredients, List<Product> products) {
        Product newProduct = new Product(UUID.randomUUID().toString(), "Гарнир", "Garnish", "денари",
                "30", "GarnishAndExtras", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Нафора", "Roast Bread", "денари",
                "30", "GarnishAndExtras", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Нафора со сирење", "Roast Bread With Cheese", "денари",
                "50", "GarnishAndExtras", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Помфрит", "Fries small / large", "денари",
                "60-100", "GarnishAndExtras", "мал / голем", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Помфрит", "Fries With Cheese small / large", "денари",
                "70-120", "GarnishAndExtras", "мал / голем со сирење", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Парче леб", "Bread Piece", "денари",
                "10", "GarnishAndExtras", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Луто пиперче", "Hot Pepper", "денари",
                "10", "GarnishAndExtras", "", new ArrayList<>());
        products.add(newProduct);
    }

    public void fillGrill(List<Ingredient> ingredients, List<Product> products) {
        Product newProduct = new Product(UUID.randomUUID().toString(), "Кебап", "Kebab", "денари",
                "15", "Grill", "40 г/g", splitIngredients(ingredients, "Свинско Јунешко"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Плескавица", "Burger", "денари",
                "60", "Grill", "150 г/g", splitIngredients(ingredients, "Свинско Јунешко"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Ловечка плескавица", "Burger Lovecka Small", "денари",
                "120", "Grill", "мала 250 г/g", splitIngredients(ingredients, "Свинско Јунешко Кашкавал"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Ловечка плескавица", "Burger Lovecka Large", "денари",
                "180", "Grill", "голема 350 г/g", splitIngredients(ingredients, "Свинско Јунешко Кашкавал"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Македонка", "Makedonka Smal", "денари",
                "150", "Grill", "мала 300 г/g", splitIngredients(ingredients, "Свинско Јунешко Кашкавал"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Македонка", "Makedonka Large", "денари",
                "200", "Grill", "400 г/g", splitIngredients(ingredients, "Свинско Јунешко Кашкавал"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Уштипец", "Fritters", "денари",
                "120", "Grill", "200 г/g", splitIngredients(ingredients, "Свинско Јунешко Кашкавал Лук"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Ребро", "Pork Rib", "денари",
                "130", "Grill", "300 г/g", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Кременадла", "Pork Chop", "денари",
                "120", "Grill", "220 г/g", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Вешалица", "Ramsteak", "денари",
                "130", "Grill", "Мала/Голема", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Свински Ражнич", "Pork Kabobs", "денари",
                "130", "Grill", "200 г/g", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пилешки Ражнич", "Chicken Kabobs", "денари",
                "130", "Grill", "200 г/g", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Свински Увијач", "Wrapped Pork Meat", "денари",
                "140", "Grill", "240 г/g", splitIngredients(ingredients, "Свинско-каре"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пилешки Увијач", "Wrapped Chicken Meat", "денари",
                "140", "Grill", "240 г/g", splitIngredients(ingredients, "Пилешко Кашкавал"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Крушевски колбас", "Sausage Krushevski", "денари",
                "120", "Grill", "180 г/g", splitIngredients(ingredients, "Свинско-месо Праз"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пилешки стек", "Chicken steak", "денари",
                "100", "Grill", "200 г/g", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пилешки стек во сос", "Chicken Steak With Sauce", "денари",
                "150", "Grill", "200 г/g", splitIngredients(ingredients, "Пилешко Сос-со-печурки"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Натур шницла", "Natur Escalope", "денари",
                "200", "Grill", "200 г/g", splitIngredients(ingredients, "Свинско-каре Сос"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Фаширана Шницла", "Minced Meat Steak", "денари",
                "150", "Grill", "200 г/g", splitIngredients(ingredients, "Мелено-месо Брашно Презла Јајце"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Бечка шницла", "Wiener Schnitzel", "денари",
                "160", "Grill", "200 г/g", splitIngredients(ingredients, "Свинско-каре Брашно Презла Јајце"));
        products.add(newProduct);
    }

    public void fillSpecialitiesOfHouse(List<Ingredient> ingredients, List<Product> products) {
        Product newProduct = new Product(UUID.randomUUID().toString(), "Крушевска сабја", "Krushevska Sabja", "денари",
                "280", "Specialities", "300г", splitIngredients(ingredients, "Свинско Пилешко Мелено-месо Зеленчук"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Полнето свински филе", "Stuffed Pork Tenderloin", "денари",
                "300", "Specialities", "350г", splitIngredients(ingredients, "Свинско-филе Кашкавал Печурки"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Македонскка тава", "Macedonian Pan", "денари",
                "250", "Specialities", "300г", splitIngredients(ingredients, "Свинско Стек Колбас Зеленчук"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Селско месо", "Traditional meat", "денари",
                "250", "Specialities", "300г", splitIngredients(ingredients, "Свинско Мелено-месо Печурки Зеленчук"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Солено Свински на скара", "Pork Meat On Grill", "денари",
                "160", "Specialities", "280г", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Гравче тавче", "Beans Soup", "денари",
                "120", "Specialities", "", null);
        products.add(newProduct);
    }

    public void fillDishesToOrder(List<Ingredient> ingredients, List<Product> products) {
        Product newProduct = new Product(UUID.randomUUID().toString(), "Крушевски кукуруз „Одаја“", "Krushevski Kukuruz „Odaja“", "денари",
                "800", "DieshesToOrder", "тава за 4 лица", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Јагнешки ширден „Одаја“", "", "денари",
                "300", "DieshesToOrder", "350г", splitIngredients(ingredients, "Свинско-месо Јагнешко-месо Зеленчук"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Грав со пастрма", "Bean Soup With Veal", "денари",
                "1000", "DieshesToOrder", "тава за 4 лица", null);
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Јагнешка тава „Одаја“", "Lamn Pot „Odaja“", "денари",
                "1600", "DieshesToOrder", "тава за 4 лица", splitIngredients(ingredients, "Јагнешко-печење Кисело-млеко Јајце"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Сарма „Одаја“", "Sarma „Odaja“", "денари",
                "800", "DieshesToOrder", "тава за 4 лица", splitIngredients(ingredients, "Сецкано-свинско-месо Зеленчук"));
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Селска тава „Одаја“", "Traditional Pan „Odaja“", "денари",
                "1200", "DieshesToOrder", "тава за 4 лица", splitIngredients(ingredients, "Свинско-месо Мелено-месо Печурки Зеленчук"));
        products.add(newProduct);
    }

    public void fillDesertsAndSnacks(List<Ingredient> ingredients, List<Product> products) {
        Product newProduct = new Product(UUID.randomUUID().toString(), "Палачинка", "Pancake", "денари",
                "80", "Desserts", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Сладолед", "Icecream", "денари",
                "100", "Desserts", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Гурабија", "Gurabija (Muffin)", "денари",
                "60", "Desserts", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Кикирики", "Peanuts", "денари",
                "50", "Snacks", "100 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Бадеми", "Alomond", "денари",
                "120", "Snacks", "80 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Фстаци", "Pistachio", "денари",
                "120", "Snacks", "80 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Лешници", "Hazelnut", "денари",
                "120", "Snacks", "80 г/g", new ArrayList<>());
        products.add(newProduct);
    }

    public void fillDrinks(List<Ingredient> ingredients, List<Product> products) {
        Product newProduct = new Product(UUID.randomUUID().toString(), "Тиквешка жолта", "Brandy Traditional Tikves Yellow", "денари",
                "60", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Тиквешка жолта VS", "Brandy Traditional Special Traditional Tikves Yellow", "денари",
                "80", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Тиквешка бела", "Brandy Traditional Tikves White", "денари",
                "60", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Коњак", "Cognac", "денари",
                "60", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Џин", "Gin", "денари",
                "60", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Водка", "Vodka", "денари",
                "60", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Смирноф", "Smirnoff", "денари",
                "80", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Узо", "Ouzo", "денари",
                "60", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Узо Плумари", "Ouzo Of Plomari", "денари",
                "80", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Мастика", "Mastika", "денари",
                "60", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Шток", "Stock", "денари",
                "80", "Aperitives", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Џони Вокер", "Johny Walker Whiskey", "денари",
                "120", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Џејмисон", "Jameson Whiskey", "денари",
                "150", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Џим Бим", "Jim Beam Whisky", "денари",
                "120", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Бејлис", "Baileys", "денари",
                "80", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Мартини", "Martini", "денари",
                "80", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пелинковац", "Pelinkovac", "денари",
                "60", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Стомаклија", "Stomaklija", "денари",
                "70", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Јегер", "Jager", "денари",
                "80", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Јегер Маистер", "Jager Maister", "денари",
                "120", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Рум", "Rum", "денари",
                "60", "Aperitives", "0.4", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Смедеревка", "Smederevka", "денари",
                "240", "Wine", "1 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Кавадарка", "Kavadarka", "денари",
                "240", "Wine", "1 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Витач", "Vitach", "денари",
                "250", "Wine", "1 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Вранец", "Vranec", "денари",
                "250", "Wine", "1 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Розе", "Roze", "денари",
                "240", "Wine", "1 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Бунар", "Bunar", "денари",
                "320", "Wine", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Чаша вино", "Glass Of Wine", "денари",
                "60", "Wine", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Александрија", "Aleksandria White", "денари",
                "450", "Wine", "Бело 0.7 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Александрија", "Aleksandria Red", "денари",
                "450", "Wine", "Црно 0.7 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Траминец", "Traminec", "денари",
                "450", "Wine", "0.7 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Темјаника", "Temjanika", "денари",
                "450", "Wine", "0.7 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Т'га", "T'ga", "денари",
                "450", "Wine", "0.7 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Розе", "Roze", "денари",
                "450", "Wine", "0.7 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Александрија", "Aleksandria White", "денари",
                "120", "Wine", "Бело 0.187 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Александрија", "Aleksandria Red", "денари",
                "120", "Wine", "Црно 0.187 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Траминец", "Traminec", "денари",
                "120", "Wine", "0.187 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Темјаника", "Temjanika", "денари",
                "120", "Wine", "0.187 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Т'га", "T'ga", "денари",
                "120", "Wine", "0.187 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Александрија Куве", "Aleksandria Cuvee White", "денари",
                "850", "SpecialWine", "Бело 0.7", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Александрија Куве", "Aleksandria Cuvee Red", "денари",
                "850", "SpecialWine", "Црно 0.7", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Каберне Савињон", "Cabernet Sauvignon", "денари",
                "850", "SpecialWine", "Црно 0.7", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Сувињон Бланк", "Sauvignon Blanc", "денари",
                "850", "SpecialWine", "0.7", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Р'кацатели", "R'kacateli", "денари",
                "850", "SpecialWine", "0.7", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Бела Вода", "White Wather Whine White / Red", "денари",
                "2000", "SpecialWine", "Бело / Врно 0.7", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Барово", "Barovo White / Red", "денари",
                "2000", "SpecialWine", "Бело / Црно 0.7", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Каменица", "Kamenitza", "денари",
                "70", "Beer", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Јелен", "Jelen", "денари",
                "70", "Beer", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Старопрамен", "Staropramen", "денари",
                "100", "Beer", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Стела", "Stella Artois", "денари",
                "100", "Beer", "0.33", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Бекс", "Becks", "денари",
                "100", "Beer", "0.33", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Скопско", "Skopsko", "денари",
                "70", "Beer", "0.5", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Македонско", "Makedonsko", "денари",
                "30", "Coffee", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Еспресо", "Espresso", "денари",
                "30", "Coffee", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Макијато", "Macchiato", "денари",
                "40", "Coffee", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Нес кафе", "Nescafe", "денари",
                "60", "Coffee", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Капучино", "Cappuccino", "денари",
                "60", "Coffee", "", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Чај", "Tea", "денари",
                "40", "Tea", "150 г/g", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Кока Кола", "Coca Cola", "денари",
                "60", "SoftDrinks", "0.25 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Фанта", "Fanta", "денари",
                "60", "SoftDrinks", "0.25 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Швепс", "Schweppes", "денари",
                "60", "SoftDrinks", "0.25 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Тоник", "Tonic", "денари",
                "60", "SoftDrinks", "0.25 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Спрајт", "Sprite", "денари",
                "60", "SoftDrinks", "0.25 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Густи Сокови", "Juice", "денари",
                "70", "SoftDrinks", "0.2 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пелистерка", "Pelisterka Sparkling", "денари",
                "40", "SoftDrinks", "газирана 0.25 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пелистерка", "Pelisterka Stil", "денари",
                "40", "SoftDrinks", "негазирана 0.25 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пелистерка", "Pelisterka Still / Sparkling", "денари",
                "60", "SoftDrinks", "газирана / негазирана 0.7 Л/L", new ArrayList<>());
        products.add(newProduct);
        newProduct = new Product(UUID.randomUUID().toString(), "Пелистерка", "Pelisterka Sparkling", "денари",
                "60", "SoftDrinks", "газирана 1 Л/L", new ArrayList<>());
        products.add(newProduct);
    }
}
