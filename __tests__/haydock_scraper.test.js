const fetch = require('node-fetch');
const scraper = require('../scrapers/haydock_scraper')(fetch);

scraper.getCommentary("Joel","2","1")