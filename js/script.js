// Genius Lyrics API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '04d9c7ad81mshe5a167cf677bb86p1dd6e4jsnd372da947ed0',
		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	}
};

//Words API
const options2 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '04d9c7ad81mshe5a167cf677bb86p1dd6e4jsnd372da947ed0',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};

//Get Random Word
function getRandomWord() {
	fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true', options2)
		.then(response => response.json())
		.then(function (data){
			var randomWord = data.word;
			console.log(randomWord);
			var searchBarEl = document.getElementById("search-bar");
			searchBarEl.setAttribute("value", randomWord);
		})
		.catch(err => console.error(err));
	
}
var randomButtonEl = document.getElementById("random-button");
randomButtonEl.addEventListener("click", getRandomWord);


//Search for Songs and Display Results
function searchSongs(keyword) {
	var lyricsAPI = `https://genius-song-lyrics1.p.rapidapi.com/search/multi?q="${keyword}"&per_page=5&page=1`
	fetch(lyricsAPI, options)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));
}

//Open Modal

	//YouTube URL search link

//Save Tracks