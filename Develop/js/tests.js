function language() {
    // make a list of acceptable languages (array)
    // filter languages to code (eg spanish = es)
    // get the cocktail data (cocktail variable)
    // translate the cocktail data
    // add the cocktail data to the output box
  let cocktail = {
      name: "margarita",
      ingredient1: "vodka",
      ingredient2: "salt",
      instructions: "Stir the ingredients together"
  };
  let toLanguage = "es";
  let fromLanguage = "en";

  fetch(
    `https://fast-translate.p.rapidapi.com/fastTranslate/translate?text=${text}&langDest=${toLanguage}&langOrigin=${fromLanguage}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "fast-translate.p.rapidapi.com",
        "x-rapidapi-key": "e796e5b386msh092aba973e5001ap1f4c3djsn150ad429e4a2",
      },
    }
  )
    .then(function (response) {
      response.json().then(function (data) {
        console.log(data);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}
