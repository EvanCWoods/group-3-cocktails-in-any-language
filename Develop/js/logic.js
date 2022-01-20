// submit button event listener to handle all code executions
let userSubmitButton = document.getElementById("user-submit-btn");
userSubmitButton.addEventListener("click", function () {
    // Execute all code executions
    let language = getLanguageChoice();
    let cocktailInput = document.getElementById("cocktail-input");
    let cocktailValue = cocktailInput.value;
    cocktailValue = cocktailValue.toLowerCase();
    const cocktail = cocktailValue.charAt(0).toUpperCase() + cocktailValue.slice(1)
    if (localStorage.getItem("cocktail")) {
        getStoredData(language);
    } else {
        getCocktailApi(cocktail, language);
    }
});


// Function to get the language choice 
function getLanguageChoice() {
    let languageInput = document.getElementById("language-options");
    let languageValue = languageInput.value;
    if (languageValue == "Spanish") {
        return "es";
    } else if (languageValue == "German") {
        return "de";
    } else if (languageValue == "Italian") {
        return "it";
    }
}


// Function to get the cocktail data
function getCocktailApi(target, language) {
    // let cocktail = "Margarita"
    let cocktailData = "";
    fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${target}`
    ).then(function (response) {
        if (response.ok) {
            // console.log(response.status);
            response.json().then(function (data) {
                for (let i = 0; i < data.drinks.length; i++) {
                    if (data.drinks[i].strDrink == target) {
                        // set the global variable for cocktailData
                        cocktailData = data.drinks[i];
                        let cocktailName = cocktailData.strDrink;
                        let cocktailInstructions = cocktailData.strInstructions;
                        let cocktailIngredients = [];
                        let cocktailMeasurements = [];

                        for (let i = 0; i < 15; i++) {
                            if (cocktailData["strIngredient" + i] != null) {
                                cocktailIngredients.push(cocktailData["strIngredient" + i]);
                            }
                            if (cocktailData["strMeasure" + i] != null) {
                                cocktailMeasurements.push(cocktailData["strMeasure" + i]);
                            }
                        }
                        const filteredData = {
                            strDrink: cocktailName,
                            strInstructions: cocktailInstructions,
                            strIngredients: cocktailIngredients,
                            strMeasurements: cocktailMeasurements
                        }
                        localStorage.setItem("cocktail", JSON.stringify(filteredData)); // Set the localStorage to the filtered dat aobject
                        getTranslation(filteredData, language);
                        showData(filteredData, "english");
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

    let cocktail = value.strDrink + "~" + value.strInstructions + "~" + value.strMeasurements.join(",") + "~" + value.strIngredients.join(",");

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
            showData(sortedData, "translated");
        });
}

function sortData(data) {
    // logic for sorting
    console.log(data);
    const dataSet = data.split("~");
    const name = dataSet[0];
    const instructions = dataSet[1];
    const measurements = dataSet[2].split(",");
    const ingredients = dataSet[3].split(",");

    return {
        strDrink: name,
        strInstructions: instructions,
        strIngredients: ingredients,
        strMeasurements: measurements
    };
}

function showData(data, location) {
    const cocktailName = data.strDrink;
    const cocktailInstructions = data.strInstructions;
    const cocktailMeasurements = data.strMeasurements;
    const cocktailIngredients = data.strIngredients;

    console.log(cocktailName, cocktailInstructions, cocktailMeasurements, cocktailIngredients);

    // Set the name
    let cocktailNameOutput = document.getElementById(`${location}-cocktail-name`);
    cocktailNameOutput.textContent = cocktailName;
    // Set the instructions
    let cocktailInstructionsOutput = document.getElementById(`${location}-instructions`);
    cocktailInstructionsOutput.textContent = cocktailInstructions;
    // loop through the measurements & ingredients list
    let cocktailIngredientsOutput = document.getElementById(`${location}-ingredients-list`);
    cocktailIngredientsOutput.innerHTML = "";
    for (let i = 0; i < cocktailIngredients.length; i++) {
        if (cocktailIngredients[i] && cocktailMeasurements[i]) {
            let listItem = document.createElement("li");
            listItem.classList.add("cocktail-ingredient");
            listItem.textContent = cocktailMeasurements[i] + " " + cocktailIngredients[i];
            cocktailIngredientsOutput.appendChild(listItem);
        } else if (cocktailIngredients[i] && !cocktailMeasurements[i]) {
            let listItem = document.createElement("li");
            listItem.classList.add("cocktail-ingredient");
            listItem.textContent = cocktailIngredients[i];
            cocktailIngredientsOutput.appendChild(listItem);
        }
    }
}

function getStoredData(language) {
    let storedItem = JSON.parse(localStorage.getItem("cocktail"));
    showData(storedItem, "english");
    getTranslation(storedItem, language);
}