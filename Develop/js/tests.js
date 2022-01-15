// Function to get the user cocktail choice
function getCocktail() {
    // DOM variables
    let cocktailInput = document.getElementById("cocktail-input");
    let cocktailSubmit = document.getElementById("cocktail-submit-btn");

    // main logic
    cocktailSubmit.addEventListener("click", function() {
        cocktail = cocktailInput.value;
        console.log(cocktailInput);
    });
    return cocktail;
}

getCocktail();