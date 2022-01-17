
// Function to handle all code relating to getting cocktails
function cocktail() {
  // Variables for the api data
  let cocktail = "";

  // Variables for DOM elements
  let cocktailSubmitButton = document.getElementById("cocktail-submit-btn");

  // Function to get the user input and handle button click
  cocktailSubmitButton.addEventListener("click", function () {
    let cocktailInput = document.getElementById("cocktail-input");
    let cocktailValue = cocktailInput.value;
    cocktailValue = cocktailValue.toLowerCase();
    cocktail = cocktailValue.charAt(0).toUpperCase() + cocktailValue.slice(1)
    console.log(cocktail);
    getCocktailApi();
  });

  // Function to fetch the cocktail that was searched
  function getCocktailApi() {
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`
    ).then(function (repsonse) {
      if (repsonse.ok) {
        repsonse.json().then(function (data) {
            for (let i=0; i<data.drinks.length; i++) {
                if (data.drinks[i].strDrink == cocktail) {
                    sendCocktail(data.drinks[i]);
                }
            }
        });
      }
    });
  }
}

function sendCocktail(attr) {
    console.log(attr);
}

cocktail();