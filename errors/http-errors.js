const ERRORS_MAPPER = {
    e1: 400,
    e2: 400,
    e3: 404
}

const DEFAULT_ERROR = {
    status: 500, 
    body:  {
        description: `An internal error occurred. Please contact the developer: lfbr0 @ github`
    } 
}

function convertToHttpError(error) {
    const status = ERRORS_MAPPER[error.code]
    return status ?  
        {
            status: status, 
            body:  {
                description: error.error
            } 
        } 
        : DEFAULT_ERROR
}

module.exports = {
    convertToHttpError: convertToHttpError
}