"use strict";

module.exports = function (router) {

    //Routes for /app/*
    router.get('/', mainAppPageHandler);
    router.get('/app', selectBookPageHandler);

    //Return router express
    return router;

    //Route handlers
    async function mainAppPageHandler(request, response) {
        response.render('app-home-page');
    }

    async function selectBookPageHandler(request, response) {
        response.render('select-reading-page'); //TODO
    }

}