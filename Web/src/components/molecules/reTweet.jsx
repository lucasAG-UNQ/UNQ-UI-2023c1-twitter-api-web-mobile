import React from "react";
import SimpleTweet from "./simpleTweet";
import TweetActions from "./tweetActions";
import "../../styles/molecules/reTweet.css";
import "../../styles/molecules/fullTweetWithActions.css";

const Retweet=({tweet})=>{

    return(
        <article className="FullTweetWithActions bg-dark container-fluid mb-3">
            <span className="RetweetText text-muted">Retweeted</span>
            <SimpleTweet tweet={tweet} />
            <div className="RetweetedTweet">
                <SimpleTweet tweet={tweet.type.tweet}/>
            </div>
            <TweetActions tweet={tweet}/>
        </article>
    )
}

export default Retweet