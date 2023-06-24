import React from 'react';
import SimpleTweet from "./simpleTweet";
import TweetActions from "./tweetActions";
import "../../styles/molecules/fullTweetWithActions.css";

const FullTweetWithActions= ({tweet})=>{

    return(<>
        <article className="FullTweetWithActions bg-dark container-fluid mb-3">
            <SimpleTweet tweet={tweet} />
            <TweetActions tweet={tweet} />
        </article>
        </>
    )
}

export default FullTweetWithActions