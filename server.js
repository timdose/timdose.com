var express = require('express');
var logger = require('morgan');
var lessMiddleware = require('less-middleware');
var cookieParser = require('cookie-parser');

var controllers = require('./app/controllers');

var app = express();
module.exports = app; // expose for testing

var logMode = 'combined';

if (app.get('env') === 'development') {
  logMode = 'dev';
  app.locals.pretty = true;
}

// global function to process markdown and return html
app.locals.md = require("node-markdown").Markdown;

var uxBefore = [
  function( req, res, next ) {
    app.locals.showPrivate = false;
    if( req.query.source !== undefined && req.cookies.showPrivate != '1' ) {
      app.locals.showPrivate = true;
      res.cookie('showPrivate', '1' );
    } else if ( req.cookies.showPrivate == '1' ) {
      app.locals.showPrivate = true;
    }
    next();
  },

  function( req, res, next ) {
    if ( req.query.clear !== undefined ) {
      res.clearCookie('showPrivate');
    }
    next();
  }
]



//-------------------------------------
// Configuration
//-------------------------------------
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(logger(logMode));
app.use(cookieParser());
app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));



//-------------------------------------
// Routes
//-------------------------------------
app.get('/', controllers.index );
app.get('/art', controllers.artDefault );
app.get('/art/:genre/:section', controllers.art );

app.get('/ux',                    uxBefore, controllers.ux );
app.get('/ux/about',              uxBefore, controllers.uxAbout );
app.get('/ux/projects/:project',  uxBefore, controllers.uxProject );
app.get('/ux/resume',             uxBefore, controllers.resume );

app.get(/^\/ux\/image-viewer\/(.*)/, controllers.imageViewer );



//-------------------------------------
// 404 Functionality
//-------------------------------------

// This function must be referenced as the **LAST** middleware in app.configure block above
function handle404(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
}

var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
