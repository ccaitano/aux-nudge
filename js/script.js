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
let hitsObj = [];

// Replaces spaces in search term with "%20" for url
function cleanSearchTerm() {
	searchTerm = searchBarEl.value.replace(/ /g, "%20");
	console.log('cleaned search term: ' + searchTerm)
}

//Search for Songs and Display Results
function runSearch() {
	cleanSearchTerm();
	// Add search term from #search-bar into url for search
	fetch(`https://genius-song-lyrics1.p.rapidapi.com/search?q=${searchTerm}&per_page=5&page=1`, options)
		.then(response => response.json())
		.then(function (data){
			hitsObj = data.response.hits;
			console.log(hitsObj);
			console.log('searched');
			// clears the search results placeholder
			document.getElementById('search-results').innerHTML = '';
			renderSearch();
			console.log('rendered');
			// cycle through the first 5 songs and do this function
				// write the title in titleEl
				// write artist name in artistEl
				// render cover art into placeholderEl
				//render save button 
		})
		.catch(err => console.error(err));
}

let albumArtEl = document.getElementById('albumArt');
let trackTitleEl = document.getElementById('trackTitle');
let artistNameEl = document.getElementById('artistName');


function renderSearch() {
	for (let i = 0; i < hitsObj.length; i++) {
		let relativeAlbumArt = hitsObj[i].result.song_art_image_thumbnail_url;
		let relativeTrackTitle = hitsObj[i].result.title_with_featured;
		let relativeArtistName = hitsObj[i].result.artist_names;
		// append a new article element with all of the other html elements inside of it in the following template literal
		let searchResultsEl = document.createElement('article');
		searchResultsEl.setAttribute('class', 'media box');
		searchResultsEl.innerHTML = `
			<figure class="media-left">
				<p class="image is-64x64" id="albumArt">
				<img src="${relativeAlbumArt}">
				</p>
			</figure>
			<div class="media-content">
				<div class="content">
				<p>
					<span class="title is-4 is-spaced" id="trackTitle">
					${relativeTrackTitle}
					</span>
					<span class="column subtitle is-7" id="artistName">
					${relativeArtistName}
					</span>
				</p>
				</div>
				
			</div>
			<div class="media-right">
				<button class="delete"></button>
			</div>
		`
		document.getElementById('search-results').appendChild(searchResultsEl);
	}
}

// Run search when search is clicked
let searchButtonEl = document.getElementById("search-button");
searchButtonEl.addEventListener('click', runSearch);

//Open Modal

	//YouTube URL search link

//Save Tracks
