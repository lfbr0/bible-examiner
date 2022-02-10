const RAPID_API_KEY = process.env.RAPID_API_KEY;
const BibleBooks = require('./bible_examiner_books');
const Error = require('./errors/app-errors');

//URLs
const VERSE_URL = "https://ajith-holy-bible.p.rapidapi.com/GetVerseOfaChapter";

module.exports = function (fetch, scrapers) {

	//Returns possible books
	function getBooks() {
		return Promise.resolve( BibleBooks );
	}

	//Returns commentary for that chapter, verse and book
	function getCommentaries(book, chapter, verse) {}

	//Returns bible reading
	function getBibleReading(book, chapter, verse) {

		//check if parameter is missing or is non-sensical
		if (!book || !chapter || !verse)
			return Promise.reject( Error.MISSING_PARAMS("Parameter is missing. Did you fill all fields?"));

		if (isNaN(chapter) || isNaN(verse))
			return Promise.reject( Error.INVALID_PARAMS("Please make sure the chapter or verse inputted is an integer."));
		
		const formattedBookString = encodeURIComponent(book.trim());
		const queryString = `?Book=${formattedBookString}&chapter=${chapter}&Verse=${verse}`;
		return fetch(VERSE_URL + queryString, {
			"method" : "GET",
			"headers" : {
				"x-rapidapi-host" : "ajith-holy-bible.p.rapidapi.com",
				"x-rapidapi-key" : RAPID_API_KEY
			}
		})
		.then( resp => resp.json() )
		.then(body => {
			if (body.Output == "Wrong slection!!! Please try again.")
				return Promise.reject( Error.NOT_FOUND("The selected passage has not been found. Please try again!") );
			else
				return Promise.resolve( body.Output );
		});
	}

	return {
		getCommentaries,
		getBibleReading,
		getBooks,
	};
};
