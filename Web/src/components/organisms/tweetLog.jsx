import FullTweetWithActions from "../molecules/fullTweetWithActions"
import Retweet from "../molecules/reTweet"
import ReplyTweet from "../molecules/replyTweet"

const TweetLog= ({tweets})=>{
    
    const decideTweet=(tweet)=>{
        if(tweet.type.tweet==null){
            return <FullTweetWithActions tweet={tweet} key={tweet.id} />
        }else if(tweet.type.image==null){
            return <Retweet tweet={tweet} key={tweet.id} />
        }else{
            return <ReplyTweet tweet={tweet} key={tweet.id}/>
        }
    }

    return (
      <>{ tweets.map((tweet)=>decideTweet(tweet))}</>
    )
}

export default TweetLog