const cheerio = require('cheerio');

const FETCH_URL = "https://www.studylight.org/commentaries/eng/cal/";


function convertToURL(book, chapter) {
    const bookName = book.trim().toLowerCase().replace(' ','-');
    return `${bookName}-${chapter}.html?print=yes`;
}

module.exports = function(fetch) {

    const author = {
        name: "John Calvin",
        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/John_Calvin_Museum_Catharijneconvent_RMCC_s84_cropped.png/220px-John_Calvin_Museum_Catharijneconvent_RMCC_s84_cropped.png",
        biography_link: "https://en.wikipedia.org/wiki/John_Calvin",
    };

    const source = "https://www.studylight.org/commentaries/eng/cal.html";

    //Functions to export
    return {

        //Gets Calvin's commentary for specific book, chapter & verse
        getCommentary : function (book, chapter, verse) {
            
            return fetch(FETCH_URL + convertToURL(book, chapter))
                .then(resp => resp.text())
                .then(html => {
                    //Convert to cheerio for DOM transverse
                    const selector = cheerio.load(html);
                    //Get text
                    let element = selector('div.tl-lightgrey')
                        .text().split('\n')
                        .find(str => str.startsWith(`${verse}.`));
                    //Format it
                    element = element.substring(0, element.indexOf('Verse ')).trim();
                    //Get text between verses
                    return element;
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
                .catch(err => Promise.resolve(null));
        }

    }


}