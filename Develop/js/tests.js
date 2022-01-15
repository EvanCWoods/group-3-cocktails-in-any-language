// Function to get the user cocktail choice
function getCocktail() {
    // DOM variables
    let cocktailInput = document.getElementById("");
    let cocktailSubmit = document.getElementById("");

    // main logic
    cocktailSubmit.addEventListener("click", function() {
        cocktail = cocktailInput.ariaValueMax;
    });
    return cocktail;
}