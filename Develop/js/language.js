function language() {

    function getTranslation() {

        let text = "Hello World";
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
              console.log(data);
            })
    }
    getTranslation();
}
language();