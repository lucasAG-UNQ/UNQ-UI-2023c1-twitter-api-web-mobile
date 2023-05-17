import "./fullTwittWithActions.css"
import "./reTweet.css"
import SimpleTwitt from "./simpleTwitt";
import TwittActions from "./twittActions";

const Retweet=({twit})=>{

    const handleReTweeted=()=><SimpleTwitt twit={twit.tipe.tweet}/>

    return(
        <article className="FullTwittWithActions bg-dark container-fluid mb-3">
            <span className="RetweetText text-muted">Retweeted</span>
            <SimpleTwitt twit={twit} />
            <div className="RetwitedTweet">
                {handleReTweeted()}
            </div>
            <TwittActions twit={twit} />
        </article>
    )
}

export default Retweet