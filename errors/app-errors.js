module.exports = {

    //If parameters are missing
    MISSING_PARAMS : msg => {
        return { code: "e1", error: msg };
    },

    //If parameters are invalid
    INVALID_PARAMS : msg => {
        return { code: "e2", error: msg };
    },

    //If not found
    NOT_FOUND : msg => {
        return { code: "e3", error: msg };
    }

}