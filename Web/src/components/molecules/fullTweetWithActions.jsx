import "./fullTweetWithActions.css"
import SimpleTweet from "./simpleTweet";
import TweetActions from "./tweetActions";

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