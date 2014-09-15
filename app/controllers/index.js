//-------------------------------------
// Module Dependencies
//-------------------------------------
var yaml = require('js-yaml');
var fs = require('fs');
var _ = require('lodash/dist/lodash.underscore');
var path = require('path');
var mime = require('mime');


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
  res.render('index');
};


exports.art = function(req, res) {
  var portfolio = data.art[req.params.section];
  var genre = _(data.art.config.genres).findWhere({name:req.params.genre});
  console.log('GENRE:::');
  console.log(JSON.stringify(genre));

  if (portfolio !== undefined && genre !== undefined) {
    res.render('art-section', {genre:genre, portfolio:portfolio} );
  }

  res.status(404);
  res.send('ack, 404!');
};


exports.ux = function(req, res) {
  res.render('ux-home', data );
};

exports.uxAbout = function(req, res) {
  res.render('ux-about', data );
};

exports.yodleCMS3 = function(req, res) {
  data.project = _(data.projects).findWhere({name:'yodle-cms3'});
  res.render('ux-project', data );
}

exports.yodleCom = function(req, res) {
  data.project = _(data.projects).findWhere({name:'yodle-com'});
  res.render('ux-project', data );
}

exports.uxProject = function(req, res) {
  data.project = _(data.projects).findWhere({name:req.params.project});
  res.render('ux-project', data );
}

exports.yodleSelfSignup = function(req, res) {
  res.render('yodle-self-signup', data );
}

exports.resume = function(req, res) {
  var file = __dirname + '/../../public/assets/pdf/Tim-Dose-Resume.pdf';

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
}

