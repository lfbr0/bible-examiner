const fetch = require("node-fetch");
const BibleServices = require('../bible_examiner_services')(fetch);

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