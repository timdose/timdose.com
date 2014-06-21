var yaml = require('js-yaml');
var fs = require('fs');

var data = { 
  app: yaml.safeLoad(fs.readFileSync('app/data/app-data.yaml', 'utf8')),
  about: yaml.safeLoad(fs.readFileSync('app/data/about.yaml', 'utf8')),
  projects: yaml.safeLoad(fs.readFileSync('app/data/projects.yaml', 'utf8'))
}

exports.index = function(req, res) {
  res.render('index', data );
};
