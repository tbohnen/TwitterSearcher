var Datastore = require('nedb')
, db = new Datastore({ filename: 'tweets', autoload: true });


function save(tweet,cb){
    db.insert(tweet, function (err, newDoc) {   // Callback is optional
        cb();
    });
}

function getTweets(cb){
    db.find({}).sort({ id: 1 }).exec(function (err, docs) {
        cb(docs);
    });
}

exports.save = save;
exports.getTweets = getTweets;

