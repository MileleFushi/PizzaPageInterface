var pizza = {
    pizza1: {
        id: 1,
        name: "Margarita",
        photo: "http://img.koutipandoras.gr/unsafe/1000x500/smart/http://assets.koutipandoras.gr/kouti/imagegrid/2018/03/16/5aabd3571dc5243f338b4586.jpg",
        lowerPrize: 20,
        higherPrize: 27,
        ingredients: [
            "sos pomidorowy",
            "ser",
            "bazylia"
        ]
    },

    pizza2: {
        id: 2,
        name: "Mafioso",
        photo: "http://cdn.foodnetworklatam.com/wp-content/uploads/2016/06/1465586619-Pizzas-exoticas.jpg",
        lowerPrize: 25,
        higherPrize: 32,
        ingredients: [
            "sos pomidorowy",
            "ser",
            "jalapeno",
            "czosnek",
            "cebula",
            "salami",
            "bazylia",
            "oregano"
        ]
    },

    pizza3: {
        id: 3,
        name: "Leonardo",
        photo: "http://radioportuense.com/wp-content/uploads/2018/01/Sem-T%C3%ADtulo-12.jpg",
        lowerPrize: 28,
        higherPrize: 36,
        ingredients: [
            "sos pomidorowy",
            "ser",
            "pieczarki",
            "cebula",
            "czosnek",
            "salami",
            "boczek",
            "kielbasa",
            "bazylia"
        ]
    },

    pizza4: {
        id: 4,
        name: "Hawai",
        photo: "https://abasto.com/wp-content/uploads/2014/02/pizza-660x330.jpg",
        lowerPrize: 24,
        higherPrize: 31,
        ingredients: [
            "sos pomidorowy",
            "ser",
            "ananas",
            "kukurydza",
            "boczek",
            "oregano"
        ]
    }
};

var pizzaList = [];

// Populate pizza array
for (var key in pizza) {
    pizzaList.push(pizza[key]);

}

//Setting selectboxes

function setPizzaListToSelectBox(item, index) {

    var selectBoxOrigin = document.getElementById('pizzaSelect');

    var option = document.createElement("option");

    option.value = item.name;
    option.text = item.name;
    selectBoxOrigin.appendChild(option);

    console.log("setPizzaList fired!");
}

function setInputs(){
    var selectBoxOrigin = document.getElementById('pizzaSelect');

    var productNameInput = document.getElementById('productNameInput');
    var ingredientsInput = document.getElementById('ingriedientsInput');
    var lowerPrizeInput = document.getElementById('lowerPrizeInput');
    var higherPrizeInput = document.getElementById('higherPrizeInput');
    var photoInput = document.getElementById('photoInput');
    

    var selectedPizzaValue = selectBoxOrigin.value;
    var selectedPizza = pizzaList.find(x => x.name === selectedPizzaValue);

    productNameInput.value = selectedPizza.name;
    ingredientsInput.value = selectedPizza.ingredients;
    lowerPrizeInput.value = selectedPizza.lowerPrize;
    higherPrizeInput.value = selectedPizza.higherPrize;
    photoInput.value = selectedPizza.photo;
}

document.body.addEventListener('load', pizzaList.forEach(setPizzaListToSelectBox));
document.getElementById('pizzaSelect').addEventListener('change', setInputs);