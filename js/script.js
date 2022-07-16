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

// Store search bar input in searchBarEl
var searchBarEl = document.getElementById("search-bar");

//Get Random Word
function getRandomWord() {
	fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true', options2)
		.then(response => response.json())
		.then(function (data){
			var randomWord = data.word;
			console.log(randomWord);
			searchBarEl.setAttribute("value", randomWord);
		})
		.catch(err => console.error(err));
	
}
var randomButtonEl = document.getElementById("random-button");
randomButtonEl.addEventListener("click", getRandomWord);

let searchTerm = '';

// Replaces spaces in search term with "%20" for url
function cleanSearchTerm() {
	searchTerm = searchBarEl.value.replace(/ /g, "%20");
	console.log('cleaned search term: ' + searchTerm)
}

//Search for Songs and Display Results
function runSearch() {
	cleanSearchTerm();
	// Add search term from #search-bar into url for search
	fetch(`https://genius-song-lyrics1.p.rapidapi.com/search?q=${searchTerm}&per_page=10&page=1`, options)
		.then(response => response.json())
		.then(function (data){
			console.log(data);
			searchDomain = data.response.hits[0].result.title;
			console.log(searchDomain);
			console.log('test');
		})
		.catch(err => console.error(err));
	
}

// Run search when search is clicked
let searchButtonEl = document.getElementById("search-button");
searchButtonEl.addEventListener('click', runSearch);

//Open Modal

	//YouTube URL search link

//Save Tracks
