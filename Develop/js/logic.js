// Global variables
let cocktailData = "";  // For storing the cocktail api object
// let cocktailChoice = "";

// submit button event listener to handle all code executions
let userSubmitButton = document.getElementById("user-submit-btn");
userSubmitButton.addEventListener("click", function () {
    // Execute all code executions
    let language = getLanguageChoice();
    getCocktailApi(language);
});


// Function to get the language choice 
function getLanguageChoice() {
    let languageInput = document.getElementById("language-options");
    let languageValue = languageInput.value;
    if (languageValue == "Spanish") {
        return "es";
    } else if (languageValue == "German") {
        return "de";
    } else if (languageValue == "Japanese") {
        return "ja";
    }
}


// Function to get the cocktail data
function getCocktailApi(language) {
    let cocktail = "Margarita"
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
                        getTranslation(cocktailData, language);
                        showData(cocktailData)
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
            let sortedData = sortData(data.translated_text);
            showData(sortedData);
        });
}

function sortData(data) {
    // logic for sorting
    const dataSet = data.split("~");
    const name = dataSet[0];
    const instructions = dataSet[1];
    const ingredients = dataSet[2].split(",");
    const measurements = dataSet[3].split(",");

    return {
        strDrink: name,
        strInstructions: instructions,
        strIngredients: ingredients,
        strMeasurements: measurements

    };
}

function showData(data) {
    const cocktailName = data.strDrink;
    const cocktailInstructions = data.strInstructions;
    const cocktailIngredients = data.strIngredients;
    const cocktailMeasurements = data.strMeasurements;

    console.log(cocktailName, cocktailInstructions, cocktailIngredients, cocktailMeasurements)
}