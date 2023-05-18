import {BsChatDots, BsChatDotsFill, BsArrowRepeat, BsHeartFill, BsHeart} from "react-icons/bs";
import { useState } from "react";
import IconButtonStat from "../atoms/iconButtonStat";
import TwApi from "../services";
import { Overlay } from "./overlay";
import RetweetPost from "./retweetPost";
import ReplyPost from "./replyPost";

const TwittActions= ({twit})=>{
    
    const loggedUser = JSON.parse(localStorage.getItem('twitterLoggedUser'))

    const [like,setLike] = useState(twit.likes.some(like=>like.id==loggedUser.id))
    const [isOpen, setIsOpen] = useState(false);
    const [openReply,setOpenReply]= useState()

    const handleLike=()=>{
        TwApi.toggleLike(twit.id)
                .then(response=>{twit.likes=response.data.likes
                                 setLike(twit.likes.some(like=>like.id==loggedUser.id))})
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    const handleRetweet=()=>{
        setOpenReply(false)
        toggleOverlay()
    }

    const handleReply=()=>{
        setOpenReply(true)
        toggleOverlay()
    }

    const overlayToOpen=()=>  openReply? <ReplyPost id={twit.id} onPost={toggleOverlay} />: <RetweetPost id={twit.id} onPost={toggleOverlay} />

    const liked= ()=> like? <BsHeartFill className="tw-like"/>: <BsHeart className="tw-like"/>
    return(
        <div>
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>{overlayToOpen()}</Overlay>
            <div className="iconsContainer">
                <IconButtonStat stat={twit.repliesAmount} action={handleReply}> <BsChatDotsFill className="tw-coment"/> </IconButtonStat>
                <IconButtonStat stat={twit.reTweetAmount} action={handleRetweet}> <BsArrowRepeat className="tw-retweet"/> </IconButtonStat>
                <IconButtonStat stat={twit.likes.length} action={handleLike}> {liked()} </IconButtonStat>
            </div>
        </div>
    )
}

export default TwittActions