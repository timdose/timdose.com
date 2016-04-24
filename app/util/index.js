
exports.privateOK = function(req) {
    if (req.query === undefined) return false;
    if (req.cookies === undefined) return false;

    if ( req.query.source !== undefined || req.cookies.showPrivate == '1') {
        return true;
    }
    return false;
}

exports.shouldSetPrivateCookie = function(req) {
    if (req.query === undefined) return false;
    if (req.cookies === undefined) return false;
    if ( req.query.source !== undefined && req.cookies.showPrivate === undefined ) {
        return true;
    }
    if (req.originalUrl.indexOf('ux/schoology') !== -1 ) {
        return true;
    }
    return false; 
}