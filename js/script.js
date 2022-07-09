const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '04d9c7ad81mshe5a167cf677bb86p1dd6e4jsnd372da947ed0',
		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	}
};

function testAPI(keyword) {
var lyricsAPI = `https://genius-song-lyrics1.p.rapidapi.com/search/multi?q="${keyword}"&per_page=3&page=1`
fetch(lyricsAPI, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
}
var keyword = "accupuncture"
testAPI(keyword);