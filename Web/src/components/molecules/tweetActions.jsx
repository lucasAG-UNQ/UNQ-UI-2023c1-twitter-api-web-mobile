import React, { useState, useEffect } from "react";
import { BsChatDotsFill, BsArrowRepeat, BsHeartFill, BsHeart } from "react-icons/bs";
import IconButtonStat from "../atoms/iconButtonStat";
import TwApi from "../services";
import { Overlay } from "./overlay";
import RetweetPost from "./retweetPost";
import ReplyPost from "./replyPost";

const TweetActions= ({tweet})=>{
    
    const [loggedUser, setLoggedUser] = useState()

    const [like, setLike] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [openReply, setOpenReply]= useState();

    useEffect(() => {
        TwApi.getLoggedUser()
            .then((response) => {
                setLoggedUser(response.data);
                setLike(tweet.likes.some( like => like.id === response.data.id));
            })
    }, [tweet.likes])

    const handleLike=()=>{
        TwApi.toggleLike(tweet.id)
                .then(response=>{tweet.likes=response.data.likes
                    setLike(tweet.likes.some( like => like.id === loggedUser.id))})
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

    const overlayToOpen = () =>  openReply ? <ReplyPost id={tweet.id} onPost={toggleOverlay} /> : <RetweetPost id={tweet.id} onPost={toggleOverlay} />;

    const liked = () => like ? <BsHeartFill className="tw-like"/> : <BsHeart className="tw-like"/>;

    const canRetweet = () => { return tweet.user.id !== loggedUser.id ? handleRetweet : (_=>_) };
    
    if (!loggedUser) return <div>Loading... </div>;

    return(
        <div>
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>{overlayToOpen()}</Overlay>
            <div className="iconsContainer">
                <IconButtonStat stat={tweet.repliesAmount || tweet.replies?.length} action={handleReply} title="Responder"> <BsChatDotsFill className="tw-coment"/> </IconButtonStat>
                <IconButtonStat stat={tweet.reTweetAmount || tweet.reTweet?.length} action={canRetweet()} title="Retweetear"> <BsArrowRepeat className="tw-retweet"/> </IconButtonStat> 
                <IconButtonStat stat={tweet.likes.length} action={handleLike}> {liked()} </IconButtonStat>
            </div>
        </div>
    )
}

export default TweetActions