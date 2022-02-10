"use strict";

const HTTPError = require('./errors/http-errors');

module.exports = function (router, services) {

    //Routes for /app/*
    router.get('/', mainAppPageHandler);
    router.get('/app', selectBookPageHandler);
    router.get('/app/reading', readingPageHandler);

    //Return router express
    return router;

    //Route handlers
    async function mainAppPageHandler(request, response) {
        response.render('app-home-page');
    }

    //Shows page with possible Bible books
    function selectBookPageHandler(request, response) {
        services.getBooks()
            .then( books => response.render('select-reading-page', {books: books}) );
    }

    //Shows bible reading along with commentaries
    async function readingPageHandler(request, response) {
        const book = request.query.book, 
            chapter = request.query.chapter,
            verse = request.query.verse;
        try {
            const bibleReading = await services.getBibleReading(book, chapter, verse);
            const commentaries = await services.getCommentaries(book, chapter, verse);
            response.render('app-reading-page', 
                {
                    selection: { book: book, chapter: chapter, verse: verse },
                    reading: bibleReading,
                    commentaries: commentaries
                }
            );
        }
        catch (err) {
            const httpError = HTTPError.convertToHttpError(err);
            response.status(httpError.status).render('error', {status:httpError.status, error: httpError.body.description});
        }
    }

}