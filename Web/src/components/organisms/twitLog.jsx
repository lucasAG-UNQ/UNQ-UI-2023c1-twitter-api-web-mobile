import FullTwittWithActions from "../molecules/fullTwittWithActions"
import Retweet from "../molecules/reTweet"
import ReplyTwitt from "../molecules/replyTwitt"

const TwitLog= ({twits})=>{
    
    const decideTwit=(twit)=>{
        if(twit.tipe.tweet==null){
            return <FullTwittWithActions twit={twit} key={twit.id} />
        }else if(twit.tipe.image==null){
            return <Retweet twit={twit} key={twit.id} />
        }else{
            return <ReplyTwitt twit={twit} key={twit.id}/>
        }
    }

    return (
      <>{ twits.map((twit)=>decideTwit(twit))}</>  
    )
}

export default TwitLog