
let language = "";
// let cocktail = "";

// global variables for DOM elements
let languageSubmitButton = document.getElementById("language-submit-btn");

// Function to get the user input and handle button click
languageSubmitButton.addEventListener("click", function() {
    let languageInput = document.getElementById("language-input");
    let languageValue = languageInput.value;
    language = languageValue.toLowerCase();
    console.log(language);
    getTranslationApi("hello world");
});

// function getLanguageApi(lan) {
// fetch("https://microsoft-translator-text.p.rapidapi.com/languages?api-version=3.0", {
// 	"method": "GET",
// 	"headers": {
//         "accept-language": lan,
// 		"x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
// 		"x-rapidapi-key": "f0eba571b5mshc9cca1ba3878dc8p1184e2jsn62f675d478a7"
// 	}
// })
// .then(response => 
// 	response.json())
// .then(data => {
//         console.log(data);
// })
// .catch(err => {
// 	console.error(err);
// });
// }

// getLanguageApi(language);


function getTranslationApi(text) {
fetch(`https://microsoft-translator-text.p.rapidapi.com/translate?api-version=3.0&profanityAction=NoAction&textType=plain&to=de&to=it&to=fr`, {
	"method": "POST",
	"headers": {
		"content-type": "application/json",
		"x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
		"x-rapidapi-key": "f0eba571b5mshc9cca1ba3878dc8p1184e2jsn62f675d478a7"
	},
	"body": [
		{
			"Text": text
		}
	]
})
.then(response => {
	console.log(response);
    return response.json()
})
.then(data => {
    console.log(data);
})
.catch(err => {
	console.error(err);
});
}

//
fetch("https://microsoft-translator-text.p.rapidapi.com/translate?to=fr&api-version=3.0&profanityAction=NoAction&textType=plain", {
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
});

// getTranslationApi(language);

//https://microsoft-translator-text.p.rapidapi.com/languages?api-version=3.0//
