function language() {

    // Function to get the data object from local storage
    function getLocalStorage() {
        let storedValue = JSON.parse(localStorage.getItem("cocktail"));
        let cocktailName = storedValue.strDrink;
        let cocktailInstructions = storedValue.strInstructions;
        let cocktailIngredients = [];
        let cocktailMeasurements = [];

        for (let i=0; i<15; i++) {
            if (storedValue["strIngredient" + i] != null) {
                cocktailIngredients.push(storedValue["strIngredient" + i]);
            }
            if (storedValue["strMeasure" + i] != null) {
                cocktailMeasurements.push(storedValue["strMeasure" + i]);
            }
        }

        let cocktail = cocktailName + "~" + cocktailInstructions + "~" + cocktailMeasurements.join(",") + "~" + cocktailIngredients.join(",");
        getTranslation(cocktail);
      }
      getLocalStorage();


    // Function to get the translation from the api
    function getTranslation(value) {

        let text = value;
        let fromLanguage = "";
        let toLanguage = "es";

        fetch(
            `https://fast-translate.p.rapidapi.com/fastTranslate/translate?text=${text}&langDest=${toLanguage}&langOrigin=${fromLanguage}`,
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
              splitTranslation = data.translated_text.split("~");
              console.log(splitTranslation);
              displayData(splitTranslation);
            })
    }

    function displayData(value) {

        // Get the DOM elements
        let nameEl = document.getElementById("translated-cocktail-name");
        let instructionsEl = document.getElementById("translated-instructions");
        let ingredientsContainer = document.getElementById("translated-ingredients-list");

        // Clear the placeholder value
        ingredientsContainer.innerHTML = "";

        // Destructure the data into individual variables
        let cocktailName = value[0];
        let cocktailInstructions = value[1];
        let cocktailMeasurements = value[2].split(",");
        let cocktailIngredients = value[3].split(",");

        // Assign the data values to the DOM elements
        nameEl.textContent = cocktailName;
        instructionsEl.textContent = cocktailInstructions;

        for (let i=0; i<cocktailIngredients.length; i++) {
            let listItem = document.createElement("li");
            listItem.classList.add("cocktail-ingredient");
            listItem.textContent = cocktailMeasurements[i] + " " + cocktailIngredients[i];
            ingredientsContainer.appendChild(listItem);
        }
    }
}
language();