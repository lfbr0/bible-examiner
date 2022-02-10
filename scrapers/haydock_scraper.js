const Books = require('../bible_examiner_books');
const cheerio = require('cheerio');

const FETCH_URL = "https://haydockcommentary.com/";

/**
 * Auxiliary function to convert Books in NKJV to Douay-Rheims
 * @param {*} book in JSON format -> the one in the forms
 * @returns name according to https://haydockcommentary.com/
 */
function convertBookName(book) {
    switch (book) {
        case "1 Samuel": return "1 Kings"
        case "2 Samuel": return "2 Kings"
        case "1 Kings": return "3 Kings"
        case "2 Kings": return "4 Kings"
        case "1 Chronicles": return "1 Paralipomenon"
        case "2 Chronicles": return "2 Paralipomenon"
        case "Ezra": return "1 Esdras"
        case "Nehemiah": return "2 Esdras"
        case "Song of Solomon": return "Song of Songs"
        case "Isaiah": return "Isaias"
        case "Jeremiah": return "Jeremias"
        case "Ezekiel": return "Ezechiel"
        case "Hosea": return "Osee"
        case "Obadiah": return "Abdias"
        case "Jonah": return "Jonas"
        case "Micah": return "Micheas"
        case "Habakkuk": return "Habacuc"
        case "Zephaniah": return "Sophonias"
        case "Haggai": return "Aggeus"
        case "Zechariah": return "Zacharias"
        case "Malachi": return "Malachias"
        case "Acts": return "Acts of Apostles"
        case "Revelation": return "Apocalypse"
        default: return book
    }
}

function convertToURL(book, chapter) {
    const bookName = convertBookName(book);
    return bookName.trim().toLowerCase().replace(' ','-') + `-${chapter}`;
}

/* Uses https://haydockcommentary.com/ */
module.exports = function(fetch) {

    const author = {
        name: "George Leo Haydock",
        image_url: "https://upload.wikimedia.org/wikipedia/en/d/dd/HaydockPortrait.jpg",
        biography_link: "https://en.wikipedia.org/wiki/George_Leo_Haydock",
    };

    const source = "https://haydockcommentary.com/";

    //Functions to export
    return {

        //Gets Haydock's commentary for specific book, chapter & verse
        getCommentary : function (book, chapter, verse) {
            
            fetch(FETCH_URL + convertToURL(book, chapter))
                .then(resp => resp.text())
                .then(html => {
                    //Convert to cheerio for DOM transverse
                    const selector = cheerio.load(html);
                    //Array with texts
                    const nodes = [];
                    selector('.wp-block-column p').each(
                        (_idx, el) => nodes.push( selector(el).text() )
                    );
                    return nodes;
                })
                .then(nodes => nodes.find(text => text.startsWith(`Ver. ${verse}`)))
                .then(node => {
                    if (node == undefined) return Promise.resolve(null);
                    return {
                        comment: node,
                        author: author,
                        source: source
                    }
                });

        }

    }


}