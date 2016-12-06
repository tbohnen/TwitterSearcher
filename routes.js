var querystring = require('querystring');
var request = require('request');
var tweetRepo = require('./tweetRepo');
var config = require('./config');

function init(app){
    app.get('/', function(req,res){
        res.sendFile(path.join(__dirname + '/index.html'));
    });


    app.get('/api/savedtweets',function(req,res){
        tweetRepo.getTweets(function(tweets){
            res.json(tweets);
        });
    });

    app.post('/api/savetweet', function(req,res){
        tweetRepo.save(req.body, function(){
            res.sendStatus(201);
        });
    });

    app.get('/api/searchtwitter', function (req, res) {
        var searchTerm = querystring.escape(req.query.search);
        auth(searchTerm, search, res);
    });
}

function auth(searchTerm, cb, res){

    var OAuth2 = require('OAuth').OAuth2;
    var oauth2 = new OAuth2(config.key, config.secret,  'https://api.twitter.com/', null, 'oauth2/token', null);

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

exports.init = init;
