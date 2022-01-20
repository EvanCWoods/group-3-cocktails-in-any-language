// Global variables
let cocktailData = "";  // For storing the cocktail api object
let setLanguage = "";  // For storing the language choice 

// submit button event listener to handle all code executions
let userSubmitButton = document.getElementById("user-submit-btn");
userSubmitButton.addEventListener("click", function () {
    // Execute all code executions
    getLanguageChoice();
    getCocktailApi();
});


// Function to get the language choice 
function getLanguageChoice() {
    let languageInput = document.getElementById("language-options");
    let languageValue = languageInput.value;
    if (languageValue == "Spanish") {
        setLanguage = "es";
    } else if (languageValue == "German") {
        setLanguage = "de";
    } else if (languageValue == "Japanese") {
        setLanguage = "ja";
    }
}


// Function to get the cocktail data
function getCocktailApi() {
    let cocktail = "Margarita";
    fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`
    ).then(function (response) {
        if (response.ok) {
            // console.log(response.status);
            response.json().then(function (data) {
                for (let i = 0; i < data.drinks.length; i++) {
                    if (data.drinks[i].strDrink == cocktail) {
                        // set the global variable for cocktailData
                        cocktailData = data.drinks[i];
                        console.log(cocktailData);
                        getTranslation(cocktailData, setLanguage);
                    }
                }
            });
        }
    });
}


// Function to get the translation from the api
function getTranslation(value, language) {
    let fromLanguage = "";
    let toLanguage = language;
    console.log(toLanguage);

    let cocktailName = value.strDrink;
    let cocktailInstructions = value.strInstructions;
    let cocktailIngredients = [];
    let cocktailMeasurements = [];

    for (let i = 0; i < 15; i++) {
        if (value["strIngredient" + i] != null) {
            cocktailIngredients.push(value["strIngredient" + i]);
        }
        if (value["strMeasure" + i] != null) {
            cocktailMeasurements.push(value["strMeasure" + i]);
        }
    }

    let cocktail = cocktailName + "~" + cocktailInstructions + "~" + cocktailMeasurements.join(",") + "~" + cocktailIngredients.join(",");

    fetch(
        `https://fast-translate.p.rapidapi.com/fastTranslate/translate?text=${cocktail}&langDest=${toLanguage}&langOrigin=${fromLanguage}`,
        {
            method: "GET",
            headers: {
                "x-rapidapi-host": "fast-translate.p.rapidapi.com",
                "x-rapidapi-key": "e796e5b386msh092aba973e5001ap1f4c3djsn150ad429e4a2",
            },
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.translated_text);
        });
}
