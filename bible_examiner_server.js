//NPM dependencies
const express = require('express');
const path = require('path');
const fetch = require("node-fetch");

//Scrapers
const HaydockScraper = require('./scrapers/haydock_scraper')(fetch);
const GillScraper = require('./scrapers/gill_scraper')(fetch);
const CalvinScraper = require('./scrapers/calvin_scraper')(fetch);

//Server variables
const APP_PORT = 8080;

//Main code
const app = express();

//Use Handlebars as template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Middleware for HTTP forms
app.use(express.urlencoded({extended : false}));

//Middleware for static content
app.use(express.static(path.join(__dirname, 'public')));

/*Scrapers for commentary -> these modules will fetch commentaries. 
God bless whoever made the websites that allow me to do this.*/
const scrapers = [ HaydockScraper, GillScraper, CalvinScraper ];

//Express routers -> have to pass fetch because of dumb error
const BibleExaminerServices = require('./bible_examiner_services')( fetch, scrapers );
const BibleExaminerApp = require('./bible_examiner_website')( express.Router(), BibleExaminerServices );
const BibleExaminerApi = require('./bible_examiner_webapi')(express.Router(), BibleExaminerServices );

//Main routes
app.use('/', BibleExaminerApp);
app.use('/api', BibleExaminerApi);

//Listen to port specified in arguments
app.listen(process.env.PORT || APP_PORT, () => console.log('Starting Bible Examiner Server'));
