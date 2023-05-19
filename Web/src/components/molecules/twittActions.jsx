import React, { useState, useEffect } from "react";
import {BsChatDots, BsChatDotsFill, BsArrowRepeat, BsHeartFill, BsHeart} from "react-icons/bs";
import IconButtonStat from "../atoms/iconButtonStat";
import TwApi from "../services";
import { Overlay } from "./overlay";
import RetweetPost from "./retweetPost";
import ReplyPost from "./replyPost";

const TwittActions= ({twit})=>{
    
    const [loggedUser, setLoggedUser] = useState()

    const [like, setLike] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [openReply, setOpenReply]= useState();

    useEffect(() => {
        TwApi.getLoggedUser()
            .then((response) => {
                setLoggedUser(response.data);
                setLike(twit.likes.some( like => like.id === response.data.id));
            })
    }, [])

    const handleLike=()=>{
        TwApi.toggleLike(twit.id)
                .then(response=>{twit.likes=response.data.likes
                    setLike(twit.likes.some( like => like.id === loggedUser.id))})
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

    const canRetweet=()=> {return !(twit.user.id==loggedUser.id)? handleRetweet: (_=>_)
    }
    
    if (!loggedUser) return <div>Loading... </div>;
    
    return(
        <div>
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>{overlayToOpen()}</Overlay>
            <div className="iconsContainer">
                <IconButtonStat stat={twit.repliesAmount} action={handleReply} title="Replicar tweet"> <BsChatDotsFill className="tw-coment"/> </IconButtonStat>
                <IconButtonStat stat={twit.reTweetAmount} action={canRetweet()} title="Retwitear" > <BsArrowRepeat className="tw-retweet"/> </IconButtonStat> 
                <IconButtonStat stat={twit.likes.length} action={handleLike}> {liked()} </IconButtonStat>
            </div>
        </div>
    )
}

export default TwittActions