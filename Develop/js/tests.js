function language() {
  let translatedData = "";
  // Get data from local storage
  function getLocalStorage() {
    let storedValue = JSON.parse(localStorage.getItem("cocktail"));
    translatedData = storedValue;
    console.log(translatedData);
  }
  getLocalStorage();

  // make a list of acceptable languages (array)
  let language = "";

  // Variables for DOM elements
  let languageSubmitButton = document.getElementById("language-submit-btn");

  // Function to get the user input and handle button click
  languageSubmitButton.addEventListener("click", function () {
    let languageInput = document.getElementById("language-input");
    let languageValue = languageInput.value;
    languageValue = languageValue.toLowerCase();
    language = languageValue.charAt(0).toUpperCase() + languageValue.slice(1);
    // console.log(language);
    languageInput.value = "";
  });
  // filter languages to code (eg spanish = es)
  //   if (language == "spanish") {
  //       toLanguage = "es"
  //   }
  // get the cocktail data (cocktail variable)
  // translate the cocktail data
  // add the cocktail data to the output box

  //   append each value of interest to a single string with mwasurements and ingredients being its own subsection joined by a seperate delimeter
  ingredients = [];
  measurements = [];
  for (let i = 1; i < 15; i++) {
    if (translatedData["strIngredient" + i] != null) {
      ingredients.push(translatedData["strIngredient" + i]);
    }
    if (translatedData["strMeasure" + i] != null) {
      measurements.push(translatedData["strMeasure" + i]);
    }
  }

  let cocktail = "hello world";//translatedData.strDrink + "~" + translatedData.strInstructions + "~" + ingredients.join(",") + "~" + measurements.join(",");
  let toLanguage = "es";
  let fromLanguage = "";

  console.log(cocktail);

  fetch(
    `https://fast-translate.p.rapidapi.com/fastTranslate/translate?text=${cocktail}&langDest=${toLanguage}&langOrigin=${fromLanguage}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "fast-translate.p.rapidapi.com",
        "x-rapidapi-key": "e796e5b386msh092aba973e5001ap1f4c3djsn150ad429e4a2",
      },
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // spliting the data based on delimetr
      splitData = data.translated_text.split("~");
      for (let i = 0; i < splitData.length; i++) {
        console.log(splitData[i] + "\n" + splitData[i].length);
      }
      // Isolate variables based on index in the array or strings
      let cocktailName = splitData[0];
      let cocktailInstructions = splitData[1];
      // fix this
      let splitIngredients = splitData[2].split(","); //split the string by a , to create an array of strings
      let splitMeasure = splitData[3].split(","); //split the string by a , to create an array of strings

      console.log(cocktailName);
      console.log(cocktailInstructions);
      console.log(splitIngredients);
      console.log(splitMeasure);

      let translatedIngredientList = document.getElementById("translated-ingredient-list")

      for (let i = 1; i <= 15; i++) {
        ingredient = attr["strIngredient" + i];
        measure = attr["strMeasure" + i];
        let listItem = document.createElement("li");
        listItem.classList.add("cocktail-ingredient");
        listItem.textContent = measure + " " + ingredient;
        translatedIngredientList.appendChild(listItem);
      }
      let listItem = document.createElement("li");
      listItem.classList.add("cocktail-ingredient");
      listItem.textContent = ingredient;
      translatedIngredientList.appendChild(listItem);

      ingredients = data[3].split(",");
    })
    .catch((err) => {
      console.error(err);
    });
}

language();
