import React from "react";
import SimpleTwitt from "./simpleTwitt";
import TwittActions from "./twittActions";
import "./reTweet.css"
import "./fullTwittWithActions.css"

const Retweet=({twit})=>{

    const handleReTweeted=()=><SimpleTwitt twit={twit.type.tweet}/>

    return(
        <article className="FullTwittWithActions bg-dark container-fluid mb-3">
            <span className="RetweetText text-muted">Retweeted</span>
            <SimpleTwitt twit={twit} />
            <div className="RetwitedTweet">
                {handleReTweeted()}
            </div>
            <TwittActions twit={twit}/>
        </article>
    )
}

export default Retweet