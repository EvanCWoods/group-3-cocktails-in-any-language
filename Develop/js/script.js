// Global variables for the api data
let API_KEY = "1";
let cocktail = "";
// let apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;

// global variables for DOM elements
let cocktailSubmitButton = document.getElementById("cocktail-submit-btn");

// Function to get the user input and handle button click
cocktailSubmitButton.addEventListener("click", function() {
    let cocktailInput = document.getElementById("cocktail-input");
    let cocktailValue = cocktailInput.value;
    cocktail = cocktailValue.toLowerCase();
    console.log(cocktail);
    getCocktailApi();
});


// Function to fetch the cocktail that was searched
function getCocktailApi() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
    .then(function(repsonse) {
        if (repsonse.ok) {
            repsonse.json()
            .then(function(data) {
                console.log(data);
            });
        }
    });
}
