"use strict";

const HTTPError = require('./errors/http-errors');

module.exports = function(router, services) {

    //Routes for /api/*
    router.get('/getBooks', getBooksHandler);
    router.get('/getCommentaries/:book/:chapter/:verse', getCommentariesHandler);
    router.get('/getPassage/:book/:chapter/:verse', getReadingHandler);

    return router;

    function getBooksHandler(request, response) {
        services.getBooks()
            .then( books => response.json(books) );
    }

    function getCommentariesHandler(request, response) {
        const book = request.params.book, 
        chapter = request.params.chapter,
        verse = request.params.verse;

        services.getCommentaries(book, chapter, verse)
            .then(commentaries => response.json(commentaries))
            .catch(err => {
                const httpError = HTTPError.convertToHttpError(err);
                response.status(httpError.status).json({
                    status: httpError.status,
                    description: httpError.body.description
                });
            });
    }

    function getReadingHandler(request, response) {
        const book = request.params.book, 
        chapter = request.params.chapter,
        verse = request.params.verse;

        services.getBibleReading(book, chapter, verse)
            .then( reading => response.json({passage: reading}) )
            .catch(err => {
                const httpError = HTTPError.convertToHttpError(err);
                response.status(httpError.status).json({
                    status: httpError.status,
                    description: httpError.body.description
                });
            });
    }

}