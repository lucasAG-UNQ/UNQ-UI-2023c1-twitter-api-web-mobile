import Twit from "../molecules/twit"
import Retweet from "../molecules/reTweet"

const TwitLog= ({twits})=>{
    
    const decideTwit=(twit)=>{
        if(twit.tipe.tweet==null){
            return <Twit twit={twit} key={twit.id} />
        }else if(twit.tipe.image==null){
            return <Retweet twit={twit} key={twit.id} />
        }
    }

    return (
      <>{ twits.map((twit)=>decideTwit(twit))}</>  
    )
}

export default TwitLog