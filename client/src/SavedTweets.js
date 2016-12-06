import React, { Component } from 'react';
import Time from 'react-time';

class SavedTweets extends Component {
    render(){
        var tweets = [];
        this.props.tweets.forEach(
            function(tweet) {
                var created_at = new Date(tweet.created_at);

                tweets.push(<div className="row">
                            <div className="col-lg-2"><Time value={created_at} format="DD MMM YY HH:mm" /></div>
                            <div className="col-lg-2"><a href={'https://twitter.com/' + tweet.user.screen_name} target='_blank'>@{tweet.user.screen_name}</a></div>
                            <div className="col-lg-8">{tweet.text}</div>
                            </div>);
            });

        return (
                <div>{tweets}</div>
        );
    }
}

export default SavedTweets;
