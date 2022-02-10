const RAPID_API_KEY = process.env.RAPID_API_KEY;
const BibleBooks = require('./bible_examiner_books');

module.exports = function (scrapers) {

	//Returns possible books
	function getBooks() {
		return Promise.resolve( BibleBooks );
	}

	//Returns commentary for that chapter, verse and book
	function getCommentaries(book, chapter, verse) {}

	//Returns bible reading
	function getBibleReading(book, chapter, verse) {}

	return {
		getCommentary,
		getBibleReading,
		getBooks,
	};
};
