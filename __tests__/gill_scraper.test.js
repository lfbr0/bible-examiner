const fetch = require('node-fetch');
const scraper = require('../scrapers/gill_scraper')(fetch);

scraper.getCommentary("Colossians", 4, 18)
    .then(data => console.log(data))