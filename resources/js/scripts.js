function startAtMiddlePage(x, y) {
    zeroSession();

    function more() {
        if (x > y) {
            clearInterval(t);
        }
        x += 20;
        document.documentElement.scrollTop = x;
    }
    var t = setInterval(more, 20);

}

function setAfterButtonClick() {

    //sessionStorage.clear();
    //sessionStorage.setItem("scrollTop", document.documentElement.scrollTop);
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].name.substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 8) { //backspace
            document.getElementById('pizzaListUl').innerHTML = "";
            indexOfPizzaItem = 0;
            pizzaList.forEach(showPizzaList);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
            document.getElementById('searchButton').click();
            indexOfPizzaItem = 0;
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

/*An array containing all the country names in the world:*/
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

autocomplete(document.getElementById('myPizza'), pizzaList);
var indexOfPizzaItem = 0;

function showPizzaList(item, index) {

    document.getElementById('pizzaListUl').innerHTML = document.getElementById('pizzaListUl').innerHTML +
        "<li><p id='idP'>" + item.id + ".</p><section id='nameAndIngSection'><p id='nameP'>" + item.name + "</p>" +
        "<span id='ingredientsP'>" +
        getIngList(item.ingredients) +
        "</span></section><a href='" + item.photo + "' data-lightbox='image-1' data-title='Pizza w naszej pizzeri! :)'><button class='btn btn-success' id='buttonPhoto' type='button'></button></a><p id='lowerPrizeP" + indexOfPizzaItem + "' class='prizeP'>" +
        item.lowerPrize + " zł</p><input id='lowerInput" + indexOfPizzaItem + "' class='amountLowerInput' type='number' placeholder='szt.' step='1' min='0' value='" + sessionStorage.getItem('jumpLOW' + indexOfPizzaItem + '') + "' /></p>" +
        "<p id='higherPrizeP" + indexOfPizzaItem + "' class='prizeP'>" + item.higherPrize + " zł</p><input id='higherInput" + indexOfPizzaItem + "' class='amountHigherInput'" +
        " type='number' placeholder='szt.' step='1' min='0' value='" + sessionStorage.getItem('jumpHIGH' + indexOfPizzaItem + '') + "' /></p></li>";

    indexOfPizzaItem++;

    function getIngList(array) {

        var ingList = "";
        for (var i = 0; i < array.length; i++) {
            ingList += array[i] + ", ";
        }
        return ingList;
    }
}

function showSelectedPizza() {

    var listOfInputs3 = document.getElementsByClassName('amountLowerInput');
    var listOfInputs4 = document.getElementsByClassName('amountHigherInput');

    for (var iterator = 0; iterator < listOfInputs3.length; iterator++) {
        listOfInputs3[iterator].addEventListener('input', sumBill);
        listOfInputs4[iterator].addEventListener('input', sumBill);
    }

    var inputPizzaValue = document.getElementById('myPizza').value;
    var selectedPizza = pizzaList.find(x => x.name === inputPizzaValue);

    document.getElementById('pizzaListUl').innerHTML = "<li><p id='idP'>" + selectedPizza.id + ".</p><section id='nameAndIngSection'><p id='nameP'>" + selectedPizza.name + "</p>" +
        "<span id='ingredientsP'>" +
        getIngList(selectedPizza.ingredients) +
        "</span></section><a href='" + selectedPizza.photo + "' data-lightbox='image-1' data-title='Pizza w naszej pizzeri! :)'><button class='btn btn-success' id='buttonPhoto' type='button'></button></a><p id='lowerPrizeP" + indexOfPizzaItem + "' class='prizeP'>" +
        selectedPizza.lowerPrize + " zł</p><input id='lowerInput" + indexOfPizzaItem + "' class='amountLowerInput' type='number' placeholder='szt.' step='1' min='0' value='" + sessionStorage.getItem('jumpLOW' + indexOfPizzaItem + '') + "' /></p>" +
        "<p id='higherPrizeP" + indexOfPizzaItem + "' class='prizeP'>" + selectedPizza.higherPrize + " zł</p><input id='higherInput" + indexOfPizzaItem + "' class='amountHigherInput'" +
        " type='number' placeholder='szt.' step='1' min='0' value='" + sessionStorage.getItem('jumpHIGH' + indexOfPizzaItem + '') + "' /></p></li>";

    indexOfPizzaItem++;

    function getIngList(array) {

        var ingList = "";
        for (var i = 0; i < array.length; i++) {
            ingList += array[i] + ", ";
        }
        return ingList;
    }
}

var billCost = 0;

function zeroSession() {

    for (var i = 0; i < iterator; i++) {
        var name1 = "jumpLOW" + i;
        sessionStorage.setItem(name1, 0);
        var name2 = "jumpHIGH" + i;
        sessionStorage.setItem(name2, 0);
    }
}

function sumBill() {

    var idCurrentElement = this.id + "";
    var idCurrent = idCurrentElement.slice(idCurrentElement.length - 1);
    console.log("sumBill fired!");

    if (this.getAttribute('class') == 'amountLowerInput') {

        var idCurrentInput = this.id + "";
        var idCurrentP = "lowerPrizeP" + idCurrentInput.slice(idCurrentInput.length - 1);
        var prize = document.getElementById(idCurrentP).innerHTML.substring(0, document.getElementById(idCurrentP).innerHTML.length - 3);
        var nameOfJump = "jumpLOW" + idCurrentElement.slice(idCurrentElement.length - 1);
        console.log(nameOfJump);

        if (this.value > sessionStorage.getItem(nameOfJump)) {
            billCost += parseInt(prize);
            sessionStorage.setItem(nameOfJump, this.value);
        } else {
            billCost -= parseInt(prize);
            sessionStorage.setItem(nameOfJump, this.value);
        }
    } else if (this.getAttribute('class') == 'amountHigherInput') {
        var idCurrentInput = this.id + "";
        var idCurrentP = "higherPrizeP" + idCurrentInput.slice(idCurrentInput.length - 1);
        var prize = document.getElementById(idCurrentP).innerHTML.substring(0, document.getElementById(idCurrentP).innerHTML.length - 3);
        var nameOfJump = "jumpHIGH" + idCurrentElement.slice(idCurrentElement.length - 1);
        console.log(nameOfJump);

        if (this.value > sessionStorage.getItem(nameOfJump)) {
            billCost += parseInt(prize);
            sessionStorage.setItem(nameOfJump, this.value);
        } else {
            billCost -= parseInt(prize);
            sessionStorage.setItem(nameOfJump, this.value);
        }
    }

    document.getElementById('allCostSpan').innerHTML = billCost + " zł";
}

function filterByCheckbox() {
    console.log("filterByCheckbox fired!");

    if (this.checked) {
        // Checkbox is checked..
    } else {
        // Checkbox is not checked..
    }

}

document.getElementById('searchButton').addEventListener('click', showSelectedPizza);
document.body.addEventListener('load', pizzaList.forEach(showPizzaList));
var listOfInputs1 = document.getElementsByClassName('amountLowerInput');
var listOfInputs2 = document.getElementsByClassName('amountHigherInput');
var iterator;

for (iterator = 0; iterator < listOfInputs1.length; iterator++) {
    listOfInputs1[iterator].addEventListener('input', sumBill);
    listOfInputs2[iterator].addEventListener('input', sumBill);
}

var listOfCheckboxes = document.querySelector("input[type=checkbox]");
listOfCheckboxes.addEventListener('change', filterByCheckbox);

function confirmOrder(){
    window.location.replace("orderPage.html");
}

document.getElementById('buttonConfirm').addEventListener('click', confirmOrder);

var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}