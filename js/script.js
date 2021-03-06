// Genius Lyrics API
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "04d9c7ad81mshe5a167cf677bb86p1dd6e4jsnd372da947ed0",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

//Words API
const options2 = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "04d9c7ad81mshe5a167cf677bb86p1dd6e4jsnd372da947ed0",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
  },
};

// Store search bar input in searchBarEl
var searchBarEl = document.getElementById("search-bar");

//Get Random Word Function
function getRandomWord() {
  fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", options2)
    .then((response) => response.json())
    .then(function (data) {
      var randomWord = data.word;
      console.log(randomWord);
      $("#search-bar").val(randomWord);
    })
    .catch((err) => console.error(err));
}

//Listener for Generate Random Word Function
var randomButtonEl = document.getElementById("random-button");
randomButtonEl.addEventListener("click", getRandomWord);

//Declare Global Variables
let searchTerm = "";
let hitsObj = [];
let searchObjects = [];
let savedObjects = JSON.parse(localStorage.getItem("save-tracks"));
let albumArtEl = document.getElementById("albumArt");
let trackTitleEl = document.getElementById("trackTitle");
let artistNameEl = document.getElementById("artistName");

// Replaces spaces in search term with "%20" for url
function cleanSearchTerm() {
  searchTerm = searchBarEl.value.replace(/ /g, "%20");
  console.log("cleaned search term: " + searchTerm);
}

//Search for Songs using Genius API
function runSearch() {
  cleanSearchTerm();
  // Add search term from #search-bar into url for search
  fetch(
    `https://genius-song-lyrics1.p.rapidapi.com/search?q=${searchTerm}&per_page=5&page=1`,
    options
  )
    .then((response) => response.json())
    .then(function (data) {
      hitsObj = data.response.hits;
      console.log(hitsObj);
      console.log("searched");
      // clears the search results placeholder
      document.getElementById("search-results").innerHTML = "";
      renderSearch();
      console.log("rendered");
      // cycle through the first 5 songs and do this function
      // write the title in titleEl
      // write artist name in artistEl
      // render cover art into placeholderEl
      //render save button
    })
    .catch((err) => console.error(err));
}

//Display Search Results
function renderSearch() {
  //Displays "No Search Results" when no objects return from Genius Lyrics API
  if (hitsObj.length == 0) {
    var noResultsEl = document.createElement("div");
    noResultsEl.innerHTML = `
			<p class="has-text-light is-size-1 has-text-centered">No Search Results</p>
		`;
    document.getElementById("search-results").appendChild(noResultsEl);
    return;
  }
  for (let i = 0; i < hitsObj.length; i++) {
    let relativeAlbumArt = hitsObj[i].result.song_art_image_thumbnail_url;
    let relativeTrackTitle = hitsObj[i].result.title_with_featured;
    let relativeArtistName = hitsObj[i].result.artist_names;

    searchObjects[i] = {
      AlbumArt: relativeAlbumArt,
      TrackTitle: relativeTrackTitle,
      ArtistName: relativeArtistName,
    };

    // append a new article element with all of the other html elements inside of it in the following template literal
    let searchResultsEl = document.createElement("article");
    searchResultsEl.setAttribute("class", "media box js-modal-trigger");
    searchResultsEl.setAttribute("data-target", "modal-js-example");
    searchResultsEl.setAttribute("data-search", i);
    console.log(hitsObj.length);
    searchResultsEl.innerHTML = `
			<figure class="media-left">
				<p class="image is-128x128" id="albumArt">
				<img src="${relativeAlbumArt}" alt="Album art for this selected track">
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
		`;
    document.getElementById("search-results").appendChild(searchResultsEl);
  }
  console.log(searchObjects);
}

// Run search when search is clicked
let searchButtonEl = document.getElementById("search-button");
searchButtonEl.addEventListener("click", runSearch);

//Open Modal
document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }
  $("body").on("click", ".js-modal-trigger", function () {
    const modal = this.dataset.target;
    const $target = document.getElementById(modal);

    var songIndex = this.dataset.search;

    console.log(searchObjects[songIndex]);
    openModal($target);
    let youtubeURL = `https://www.youtube.com/results?search_query=${searchObjects[songIndex].ArtistName}+${searchObjects[songIndex].TrackTitle}`;
    var modalTemplateEl = document.getElementById("modal-content");
    modalTemplateEl.innerHTML = "";
    var modalContentEl = document.createElement("div");
    modalContentEl.innerHTML = `
		<div class="columns">
			<!-- Modal Song info -->
			<div class="column is-one-third">
				<div class="content">
					<p>
						<span class="title is-4 is-spaced" id="trackTitle">
						${searchObjects[songIndex].TrackTitle}
						</span>
						<span class="column subtitle is-7" id="artistName">
						${searchObjects[songIndex].ArtistName}
						</span>
						<span id='playerLink'>
						<a id='youtubeLink' href='${youtubeURL}' target="_blank"
						>Listen to <strong>${searchObjects[songIndex].TrackTitle}</strong> by <strong>${searchObjects[songIndex].ArtistName}</strong> on Youtube</a>
						</span>
					</p>
				</div>
			</div>
			<!-- Album Art -->

			<div class="column is-one-third" id="modalAlbumArt">
				<p class="image is-128x128" id="albumArt">

					<img src="${searchObjects[songIndex].AlbumArt}" alt="Album art for this selected track">
				</p>
			</div>
			<div class="column is-one-third">
				<button class="button is-dark" id = "saveBtn">SAVE</button>
			</div>
      	</div>
		`;
    $("#modal-content").append(modalContentEl);

    var button = $("#saveBtn");
    //Saves Track on Button Click
    button.on("click", function () {
      console.log(savedObjects);
      savedObjects = JSON.parse(localStorage.getItem("save-tracks"));
      savedObjects.push(searchObjects[songIndex]);
      localStorage.setItem("save-tracks", JSON.stringify(savedObjects));
      getSavedTracks();
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) {
      // Escape key
      closeAllModals();
    }
  });
});

getSavedTracks();

function getSavedTracks() {
  //Checks for Previously Saved Tracks in Local Storage
  if (localStorage.getItem("save-tracks") === null) {
    console.log("No Tracks!");
    localStorage.setItem("save-tracks", "[]");
    return;
  } else {
    console.log("Saved Tracks!");
    savedObjects = JSON.parse(localStorage.getItem("save-tracks"));
  }

  document.getElementById("saved-tracks").innerHTML =
    '<p class="is-italic is-size-3 is-underlined has-text-centered">Saved Tracks</p>';
  console.log(savedObjects);
  for (let i = 0; i < savedObjects.length; i++) {
    let relativeAlbumArt = savedObjects[i].AlbumArt;
    let relativeTrackTitle = savedObjects[i].TrackTitle;
    let relativeArtistName = savedObjects[i].ArtistName;

    // append a new article element with all of the other html elements inside of it in the following template literal
    let savedResultsEl = document.createElement("article");
    savedResultsEl.setAttribute("class", "media box");
    savedResultsEl.setAttribute("data-search", i);
    savedResultsEl.innerHTML = `
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
		`;
    document.getElementById("saved-tracks").appendChild(savedResultsEl);
  }
}
