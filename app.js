var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var path = require('path');
var bodyParser = require('body-parser');

app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'html');

app.use('/static', express.static(path.join(__dirname, '/public')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use('/', require('./routes/'));

// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log({error: err});
    res.render('error', {error: err.toString()});
        // ... fill in this part
    
});

module.exports = app;
