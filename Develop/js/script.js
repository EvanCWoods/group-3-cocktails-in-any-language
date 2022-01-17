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



//set language//
let API_Language_Key = "2";
//API Key----f0eba571b5mshc9cca1ba3878dc8p1184e2jsn62f675d478a7//
let language = "";

// global variables for DOM elements
let languageSubmitButton = document.getElementById("language-submit-btn");

// Function to get the user input and handle button click
languageSubmitButton.addEventListener("click", function() {
    let languageInput = document.getElementById("language-input");
    let languageValue = languageInput.value;
    language = languageValue.toLowerCase();
    console.log(language);
    getLanguageApi();
});

function getLanguageApi() {
fetch("https://microsoft-translator-text.p.rapidapi.com/languages?api-version=3.0", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
		"x-rapidapi-key": "f0eba571b5mshc9cca1ba3878dc8p1184e2jsn62f675d478a7"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
})};

//translate API
function getTranslationApi() {
fetch("https://microsoft-translator-text.p.rapidapi.com/translate?to=%3CREQUIRED%3E&api-version=3.0&profanityAction=NoAction&textType=plain", {
	"method": "POST",
	"headers": {
		"content-type": "application/json",
		"x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
		"x-rapidapi-key": "f0eba571b5mshc9cca1ba3878dc8p1184e2jsn62f675d478a7"
	},
	"body": [
		{
			"Text": "I would really like to drive your car around the block a few times."
		}
	]
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
})};