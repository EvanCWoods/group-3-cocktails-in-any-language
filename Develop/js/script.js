
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
    cocktailInput.value = "";
  });

  // Function to fetch the cocktail that was searched
  function getCocktailApi() {
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`
    ).then(function (response) {
      if (response.ok) {
          console.log(response.status);
          response.json().then(function (data) {
              console.log(data.drinks);
            for (let i=0; i<data.drinks.length; i++) {
                if (data.drinks[i].strDrink == cocktail) {
                    getDrink(data.drinks[i]);
                    setLocaStorage(data.drinks[i]);
                }
            }
        })
      }
    });
  }
}

function getDrink(attr) {
    // variables for use in the function
    let englishIngredientsList = document.getElementById("english-ingredients-list");
    englishIngredientsList.innerHTML = "";
    let ingredient = "";
    let measure = "";
    console.log(attr);
    // set the english cocktail title
    let cocktailName = attr.strDrink;
    let englishCocktailname = document.getElementById("english-cocktail-name");
    englishCocktailname.textContent = cocktailName;
    // set the english cocktail instructions
    let cocktailInstructions = attr.strInstructions;
    let englishCocktailInstrucitons = document.getElementById("english-instructions");
    englishCocktailInstrucitons.textContent = cocktailInstructions;

    // loop through all child nodes
    for (let i=1; i<=15; i++) {
        if (attr["strIngredient" + i] != null) {
            ingredient = attr["strIngredient" + i];
                if (attr["strMeasure" + i] != null) {
                    measure = attr["strMeasure" + i];
                    let listItem = document.createElement("li");
                    listItem.classList.add("cocktail-ingredient");
                    listItem.textContent = measure + " " + ingredient;
                    englishIngredientsList.appendChild(listItem);
                }
            }
        }
        let listItem = document.createElement("li");
        listItem.classList.add("cocktail-ingredient");
        listItem.textContent = ingredient;
        englishIngredientsList.appendChild(listItem);
}

function setLocaStorage(value) {
  let storedValue = localStorage.setItem("cocktail", JSON.stringify(value));
}

function getLocalStorage() {
  let storedValue = JSON.parse(localStorage.getItem("cocktail"));
  getDrink(storedValue);
}
getLocalStorage();
cocktail();
