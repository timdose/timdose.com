
exports.privateOK = function(req) {
    if (req.query === undefined) return false;
    if (req.cookies === undefined) return false;

    if ( req.query.source === 'angellist' ) return true;
    if ( req.query.source === 'schoology' ) return true;
    if ( req.query.source === 'better' ) return true;


    if ( req.query.source === '0' ) return true;
    if ( req.query.source === '1' ) return true;
    if ( req.query.source === '2' ) return true;
    if ( req.query.source === '3' ) return true;
    if ( req.query.source === '4' ) return true;
    if ( req.query.source === '5' ) return true;
    if ( req.query.source === '6' ) return true;
    if ( req.query.source === '7' ) return true;
    if ( req.query.source === '8' ) return true;
    if ( req.query.source === '9' ) return true;
    if (req.cookies.showPrivate == '1') return true;
    
    if (req.query.source === undefined) return false;
    if ( req.query.source.indexOf('resume') === 0 ) return true;

    return false;
}
