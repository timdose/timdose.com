var request = require('request');

var sources = null;
var sourcesUrl = 'https://gist.githubusercontent.com/timdose/aa7606e7fddf9f19648859ab231a82ed/raw/ddc167a0ea2a3a4830ee99be0dd5c517c33ab0ba/timdose-com-sources.txt';


exports.getSources = function() {
    if ( sources === null ) {
        request( sourcesUrl, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                sources = body.trim().split('\n');
                console.log(sources);
              }
        });
    }   
}


exports.privateOK = function(req) {
    if (req.query === undefined) return false;
    if (req.cookies === undefined) return false;

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
    if (sources.indexOf(req.query.source) !== -1 ) return true;

    return false;
}
