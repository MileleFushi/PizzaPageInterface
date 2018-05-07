
function buyPizza(){
    window.location.replace("index.html");
    alert("Twoje zamówienie jest w trakcie relizacji.\n Zaraz skontaktujemy się z Tobą telefonicznie :)");
}

document.getElementById('buyButton').addEventListener('click', buyPizza);