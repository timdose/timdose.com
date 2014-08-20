var yaml = require('js-yaml');
var fs = require('fs');

var data = { 
  app: yaml.safeLoad(fs.readFileSync('app/data/app-data.yaml', 'utf8')),
  about: yaml.safeLoad(fs.readFileSync('app/data/about.yaml', 'utf8')),
  projects: yaml.safeLoad(fs.readFileSync('app/data/projects.yaml', 'utf8')),
  art: {
    config: yaml.safeLoad(fs.readFileSync('app/data/art/config.yaml', 'utf8')),
    paintings: yaml.safeLoad(fs.readFileSync('app/data/art/paintings.yaml', 'utf8')),
    drawings: yaml.safeLoad(fs.readFileSync('app/data/art/drawings.yaml', 'utf8')),
  }
}

exports.index = function(req, res) {
  res.render('index', {portfolio:data.art.paintings} );
};


exports.art = function(req, res) {
  var portfolio = data.art[req.params.section];

  if (portfolio !== undefined ) {
    res.render('index', {portfolio:portfolio} );
  }
};


exports.resume = function(req, res) {
  res.render('resume', data );
};

