import React, { Component } from 'react';
import './App.css';
import SavedTweets from './SavedTweets.js';
import Time from 'react-time';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {searchString:'', tweets:[], savedTweets:[], baseUrl: "http://localhost:8081"};

        this.search = this.search.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.saveTweet = this.saveTweet.bind(this);

        this.getSavedTweets();
    }

    getSavedTweets(){
        var _this = this;
        fetch(this.state.baseUrl + '/api/savedtweets')
            .then(function(response){
                return response.json();
            })
            .then(function(json){
                _this.setState({savedTweets: json});
            });
    }

    search(event){
        var searchString = event.target.value;
        this.setState({searchString:searchString});
    }

    doSearch(){
        var _this = this;
        fetch(this.state.baseUrl + '/api/searchtwitter?search=%23' + this.state.searchString)
            .then(function(response) {
                return response.json();
            })
            .then(function(json){
                _this.setState({tweets: json.tweets});
                _this.render();
            });
    }

    saveTweet(tweet){
        var _this = this;
        fetch(this.state.baseUrl + '/api/savetweet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tweet)
        }).then(function(response){
            _this.getSavedTweets();
        });
    }

  render() {
      var tweets = [];

      this.state.tweets.forEach(
          function(tweet) {
              var created_at = new Date(tweet.created_at);

              tweets.push(
                      <div className="row">
                      <div className="col-lg-2"><Time value={created_at} format="DD MMM YY HH:mm" /></div>
                      <div className="col-lg-2"><a href={'https://twitter.com/' + tweet.user.screen_name} target='_blank'>@{tweet.user.screen_name}</a></div>
                      <div className="col-lg-7">{tweet.text}</div>
                      <div className="col-lg-1"><button className="btn btn-xs" onClick={() => this.saveTweet(tweet)}>Save</button></div>
                      </div>
                      );
          }.bind(this));

      return (
              <div className="container-fluid">
              <div className="text-center">
                <div className="">
                  <h2>Twitter Searcher</h2>
                </div>
              </div>
              <div className="row">
              <div className="col-lg-6 text-center">
              <h3 >Search By HashTag</h3>
              <div><span>Search # </span><input type="text" onKeyUp={this.search}></input>&nbsp;<button className="btn btn-primary btn-md" onClick={this.doSearch}>Search</button></div>
                <table className="table">
                <tbody>{tweets}</tbody>
                </table>
              </div>
              <div className="col-lg-6 text-center">
              <h3>Saved Tweets</h3>
              <br/>
              <br/>
              <SavedTweets tweets={this.state.savedTweets}/>
              </div>
              </div>
            </div>
          );
  }
}

export default App;
