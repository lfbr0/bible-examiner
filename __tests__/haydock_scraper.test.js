const fetch = require('node-fetch');
const scraper = require('../scrapers/haydock_scraper')(fetch);

const expected = "Ver. 1. Blow. The prophets often ordered, "+
    "to signify what will take place. (Worthington) — The people were gathered by the sound of trumpets."+
    " The danger from the locusts was imminent; and all are exhorted to avert it, by praying in the temple, "+
    "&c. — Tremble at the sound, Amos iii. 6. (Calmet) — Extemplo turbati. (Virgil, Æneid viii.) — Lord. That is, "+
    "the time when he will execute justice on sinners, (Challoner) and suffer affliction to fall upon them. "+
    "(Worthington) (Chap. i. 15.)";

test('jacob 2:1 test', () => {
    scraper.getCommentary("Joel","2","1")
        .then( data => expect(data).toStrictEqual(expected) )
})

test('bad request', () => {
    scraper.getCommentary("sdf", "sd", "ds")
        .then( data => expect(data).toStrictEqual([]) );
})