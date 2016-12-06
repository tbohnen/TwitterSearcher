var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var querystring = require('querystring');
var twitter = require('twitter');
var tweetRepo = require('./tweetRepo');
var routes = require('./routes');

var bearerToken = undefined;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

routes.init(app);

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});

function auth(searchTerm, cb, res){

    var OAuth2 = require('OAuth').OAuth2;
    var oauth2 = new OAuth2('kkKY6GNd26npqucgeXfj6XhmN', 'RTdgxR7gILSL3p3y0L1zC9O2NRySy2OAPQtNLNk4k6KF5tvaCb', 'https://api.twitter.com/', null, 'oauth2/token', null);

    oauth2.getOAuthAccessToken('', {
        'grant_type': 'client_credentials'
    }, function (e, accessToken) {
        cb(searchTerm, accessToken, res);
    });
}

function search(searchTerm, accessToken, res){
    request.get( {url: 'https://api.twitter.com/1.1/search/tweets.json?q=' + searchTerm,
                  'auth': {
                      'bearer': accessToken
                  }
                 },
                 function (error, response, body) {
                     var bodyConverted = JSON.parse(response.body);
                     res.json({tweets: bodyConverted.statuses});
                 });
}
