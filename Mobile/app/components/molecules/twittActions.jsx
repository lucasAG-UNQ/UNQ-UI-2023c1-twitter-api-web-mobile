import React, { useState, useEffect } from "react";
import { BsChatDotsFill, BsArrowRepeat, BsHeartFill, BsHeart } from "react-icons/bs";
import IconButtonStat from "../atoms/iconButtonStat";
import TwApi from "../services";
import { View } from "react-native";
import IconButtonStatStyle from "../../styles/estilos_iconButtonStat"
//import { Overlay } from "./overlay";
//import RetweetPost from "./retweetPost";
//import ReplyPost from "./replyPost";

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
    }, [twit.likes])

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

    //const overlayToOpen = () =>  openReply ? <ReplyPost id={twit.id} onPost={toggleOverlay} /> : <RetweetPost id={twit.id} onPost={toggleOverlay} />;

    const liked = () => like ? <BsHeartFill className="tw-like"/> : <BsHeart className="tw-like"/>;

    const canRetweet = () => { return twit.user.id !== loggedUser.id ? handleRetweet : (_=>_) };
    
    if (!loggedUser) return <div>Loading... </div>;

    return(
        <View>
            {/*<Overlay isOpen={isOpen} onClose={toggleOverlay}>{overlayToOpen()}</Overlay>*/}
            <View style={IconButtonStatStyle.iconsContainer}>
                <IconButtonStat stat={twit.repliesAmount || twit.replies?.length} action={handleReply} title="Responder"> <BsChatDotsFill className="tw-coment"/> </IconButtonStat>
                <IconButtonStat stat={twit.reTweetAmount || twit.reTweet?.length} action={canRetweet()} title="Retwitear"> <BsArrowRepeat className="tw-retweet"/> </IconButtonStat> 
                <IconButtonStat stat={twit.likes.length} action={handleLike}> {liked()} </IconButtonStat>
            </View>
        </View>
    )
}

export default TwittActions