let text = "Hello World";
let toLanguage = "es";
let fromLanguage = "en";

fetch(`https://fast-translate.p.rapidapi.com/fastTranslate/translate?text=${text}&langDest=${toLanguage}&langOrigin=${fromLanguage}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "fast-translate.p.rapidapi.com",
		"x-rapidapi-key": "e796e5b386msh092aba973e5001ap1f4c3djsn150ad429e4a2"
	}
})
.then(function(res) {
    res.json()
    .then(function(data) {
        console.log(data);
    })
})
.catch(err => {
	console.error(err);
});