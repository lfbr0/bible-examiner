const fetch = require("node-fetch");
const scraper = require('../scrapers/haydock_scraper')(fetch);
const BibleServices = require('../bible_examiner_services')(fetch, [scraper]);

/**
 * TEST BIBLE READINGS API
 */
test('get Bible reading Genesis 1:1', () => {
    const expected = "At the first God made the heaven and the earth.";
    BibleServices.getBibleReading("Genesis", "1", "1")
        .then( passage => expect(passage).toStrictEqual(expected) )
        .catch( err => console.log(err) );
})

test('get bad bible reading missing parameter', () => {
    BibleServices.getBibleReading("Relevation", "")
        .catch( err => expect(err.code).toStrictEqual("e1") )
})

test('get bad bible reading non integer', () => {
    BibleServices.getBibleReading("Revelation", "24", "42$")
        .catch( err => expect(err.code).toStrictEqual("e2"))
})

test('get bad bible passage not found', () => {
    BibleServices.getBibleReading("Revelation", "1", "23242")
        .catch( err => expect(err.code).toStrictEqual("e3") )
})

/**
 * TEST BIBLE COMMENTARIES
 */
test('get bible commentaries', () => {

    const expected = "Ver. 1. Blow. The prophets often ordered, "+
    "to signify what will take place. (Worthington) — The people were gathered by the sound of trumpets."+
    " The danger from the locusts was imminent; and all are exhorted to avert it, by praying in the temple, "+
    "&c. — Tremble at the sound, Amos iii. 6. (Calmet) — Extemplo turbati. (Virgil, Æneid viii.) — Lord. That is, "+
    "the time when he will execute justice on sinners, (Challoner) and suffer affliction to fall upon them. "+
    "(Worthington) (Chap. i. 15.)";

    BibleServices.getCommentaries("Joel","2","1")
        .then( comms => expect(comms[0]).toStrictEqual(expected) )
})