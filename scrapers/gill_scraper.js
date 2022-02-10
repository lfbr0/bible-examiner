const cheerio = require('cheerio');

const FETCH_URL = "https://www.christianity.com/bible/commentary/john-gill/";


function convertToURL(book, chapter) {
    const bookName = book.trim().toLowerCase().replace(' ','-');
    return `${bookName}/${chapter}`;
}

/* Uses https://haydockcommentary.com/ */
module.exports = function(fetch) {

    const author = {
        name: "John Gill",
        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/John_Gill_by_Vertue.png/220px-John_Gill_by_Vertue.png",
        biography_link: "https://en.wikipedia.org/wiki/John_Gill_(theologian)",
    };

    const source = "https://www.christianity.com/bible/commentary/john-gill/";

    //Functions to export
    return {

        //Gets Haydock's commentary for specific book, chapter & verse
        getCommentary : function (book, chapter, verse) {
            
            return fetch(FETCH_URL + convertToURL(book, chapter))
                .then(resp => resp.text())
                .then(html => {
                    //Convert to cheerio for DOM transverse
                    const selector = cheerio.load(html);
                    //Get text
                    let element = selector('div.text').html()
                    //Get text between verses
                    element = cheerio.load(element)('span.line')
                        .parent().parent().text().split('Verse ')
                    //Remove first one -> intro
                    element.shift()
                    return element.find(text => text.startsWith(`${verse}.`))
                })
                .then(node => {
                    if (!node) return Promise.resolve(null);
                    //Make commentary
                    const commentary = {
                        comment: node,
                        author: author,
                        source: source
                    };
                    return Promise.resolve(commentary);
                })

        }

    }


}