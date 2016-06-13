//-------------------------------------
// Module Dependencies
//-------------------------------------
var yaml = require('js-yaml');
var fs = require('fs');
var _ = require('lodash/dist/lodash.underscore');
var path = require('path');
var mime = require('mime');
var util = require('../../app/util');


var data = { 
  app: yaml.safeLoad(fs.readFileSync('app/data/app-data.yaml', 'utf8')),
  about: yaml.safeLoad(fs.readFileSync('app/data/about.yaml', 'utf8')),
  projects: yaml.safeLoad(fs.readFileSync('app/data/projects.yaml', 'utf8')),
  art: {
    config: yaml.safeLoad(fs.readFileSync('app/data/art/config.yaml', 'utf8')),
    paintings: yaml.safeLoad(fs.readFileSync('app/data/art/paintings.yaml', 'utf8')),
    drawings: yaml.safeLoad(fs.readFileSync('app/data/art/drawings.yaml', 'utf8')),
    cartoons: yaml.safeLoad(fs.readFileSync('app/data/art/cartoons.yaml', 'utf8')),
    fantasy: yaml.safeLoad(fs.readFileSync('app/data/art/fantasy.yaml', 'utf8')),
  }
}

exports.index = function(req, res) {
  res.render('index');
};

exports.before = function( req, res, next ) {
  if ( util.privateOK(req) ) {
    data.activeProjects = data.projects;
  } else {
    data.activeProjects = _(data.projects).filter(function(o){return !o.private});
  }
  next();
}

exports.artDefault = function(req, res) {
  var url = req.originalUrl;
  var queryString = '';
  if (url.indexOf('?') > -1 ) {
    queryString = url.substr(url.indexOf('?'));
  }
  res.redirect(301, '/art/fine-art/paintings' + queryString );
}


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
  // data.activeProjects = _(data.projects).filter(function(o){return !o.private});
  res.render('ux-home', data );
};


exports.schoology = function(req, res) {
  data.audience = 'Schoology';
  // data.activeProjects = data.projects;
  res.render('ux-home', data );
};



exports.aboutZD = function(req, res) {
  res.render('about-zd', data );
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


exports.imageViewer = function( req, res ) {
  var image = req.params[0]
  data.image = '/' + req.params[0];
  res.render( 'image-viewer', data );
}


exports.sources = function( req, res ) {
  util.fetchSources();
  res.send(util.getSources());
}


