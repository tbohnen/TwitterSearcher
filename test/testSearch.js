var chai = require('chai'),
    chaiHttp = require('chai-http');

var expect = chai.expect; 
var app = require('./../app');
var request = require('supertest');

chai.use(chaiHttp);;
var url = "http://localhost:8081";

describe('TwitterSearch', function() {

    it('should not find tweets', function(done) {
        this.timeout(15000);

        chai.request('http://localhost:8081')
            .get('/api/searchtwitter?search=%23thisshouldreallynotwork123')
            .end(function(err, res) {
                expect(res.body.tweets.length).to.equal(0);
                done();
            });
    }) ;
    it('should find tweets', function(done) {
        this.timeout(15000);

        chai.request('http://localhost:8081')
            .get('/api/searchtwitter?search=%23NoEstimates')
            .end(function(err, res) {
                expect(res.body.tweets.length).to.equal(15);

                done();
            });
    }) ;
});
