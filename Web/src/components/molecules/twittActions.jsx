import {BsChatDots, BsChatDotsFill, BsArrowRepeat, BsHeartFill, BsHeart} from "react-icons/bs";
import { useState } from "react";
import IconButtonStat from "../atoms/iconButtonStat";
import TwApi from "../services";

const TwittActions= ({twit})=>{
    
    const loggedUser = JSON.parse(localStorage.getItem('twitterLoggedUser'))

    const [like,setLike] = useState(twit.likes.some(like=>like.id==loggedUser.id))

    const handleLike=()=>{
        TwApi.toggleLike(twit.id)
                .then(response=>{twit.likes=response.data.likes
                                 setLike(twit.likes.some(like=>like.id==loggedUser.id))})
        
    }

    const handleRetweet=()=><></>

    const handleReply=()=>{}

    const liked= ()=> like? <BsHeartFill className="tw-like"/>: <BsHeart className="tw-like"/>
    return(
        
        <div className="iconsContainer">
            <IconButtonStat stat={twit.repliesAmount} action={handleReply}> <BsChatDotsFill className="tw-coment"/> </IconButtonStat>
            <IconButtonStat stat={twit.reTweetAmount} action={handleRetweet}> <BsArrowRepeat className="tw-retweet"/> </IconButtonStat>
            <IconButtonStat stat={twit.likes.length} action={handleLike}> {liked()} </IconButtonStat>
        </div>
    )
}

export default TwittActions