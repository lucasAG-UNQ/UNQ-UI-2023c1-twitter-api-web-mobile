import React from "react";
import SimpleTwitt from "./simpleTwitt";
import TwittActions from "./twittActions";
import "./replyTwitt.css"

const ReplyTwitt=({twit})=>{

    return(
        <div className="Reply bg-dark container-fluid mb-3">
            <span className="text-muted">Respondió a {twit.type.tweet.user.username}</span>
            <SimpleTwitt twit={twit} />
            <div className="CommentedTwit">
                <SimpleTwitt twit={twit.type.tweet} />
            </div>
            <TwittActions twit={twit} />
        </div>
    )
}

export default ReplyTwitt