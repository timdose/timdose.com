var request = require('request');

var sources = ['me'];
var sourcesUrl = 'https://gist.githubusercontent.com/timdose/aa7606e7fddf9f19648859ab231a82ed/raw/timdose-com-sources.txt';


exports.fetchSources = function() {
    request( sourcesUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            sources = body.trim().split('\n');
          }
    });
}

exports.getSources = function() {
    return sources;
}


exports.privateOK = function(req) {
    if (req.query === undefined) return false;
    if (req.cookies === undefined) return false;

    if (req.cookies.showPrivate == '1') return true;
    
    if (req.query.source === undefined) return false;
    if (sources.indexOf(req.query.source) !== -1 ) return true;

    return false;
}
