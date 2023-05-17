import FullTwittWithActions from "./fullTwittWithActions";
import Retweet from "./reTweet";
import "./replyTwitt.css"

const ReplyTwitt=({twit})=>{

    const decideTwit=(twit)=>{
        if(twit.tipe.tweet==null){
            return <FullTwittWithActions twit={twit} key={twit.id} />
        }else if(twit.tipe.image==null){
            return <Retweet twit={twit} key={twit.id} />
        }else{
            return <ReplyTwitt twit={twit} key={twit.id}/>
        }
    }

    return(
        <div className="ReplyThread">
            <div className="thread"></div>
            <div className="tweetsInThread">
                {decideTwit(twit.tipe.tweet)}
                <FullTwittWithActions twit={twit}/>
            </div>
        </div>
    )
}

export default ReplyTwitt