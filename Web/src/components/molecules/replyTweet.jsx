import React from "react";
import SimpleTweet from "./simpleTweet";
import TweetActions from "./tweetActions";
import "../../styles/molecules/replyTweet.css";

const ReplyTweet=({tweet})=>{

    return(
        <div className="Reply bg-dark container-fluid mb-3">
            <span className="text-muted">Respondió a {tweet.type.tweet.user.username}</span>
            <SimpleTweet tweet={tweet} />
            <div className="CommentedTweet">
                <SimpleTweet tweet={tweet.type.tweet} />
            </div>
            <TweetActions tweet={tweet} />
        </div>
    )
}

export default ReplyTweet