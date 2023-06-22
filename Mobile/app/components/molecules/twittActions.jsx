import React, { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconButtonStat from "../atoms/iconButtonStat";
import TwApi from "../../services/services";
import { View,Text } from "react-native";
import IconButtonStatStyle from "../../styles/estilos_iconButtonStat"
import Overlay from 'react-native-modal-overlay';
import OverlayStyles from "../../styles/estilos_overlay";
import ReplyPost from "./replyPost";
import RetwittPost from "./retweetPost";

const TwittActions= ({twit})=>{
    
    const [loggedUser, setLoggedUser] = useState({id:'u_3'})

    const [like, setLike] = useState(false);
    const [replyCount,setReplyCount] = useState(twit.replies?.length||twit.repliesAmount||0);
    const [retweetCount,setRetweetCount] = useState(twit.reTweet?.length||twit.reTweetAmount||0)
    
    const [isOpen, setIsOpen] = useState(false);
    const [openReply, setOpenReply]= useState();

    useEffect(() => {
        TwApi.getLoggedUser()
            .then((response) => {
                setLoggedUser(response.data)
                setLike(twit.likes.some( like => like.id === response.data.id));
            })
            .catch(error=>console.log(error))
    }, [twit.likes])

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    const handleLike=()=>{
        TwApi.toggleLike(twit.id)
                .then(response=>{twit.likes=response.data.likes
                    setLike(twit.likes.some( like => like.id === loggedUser.id))})
    }

    const handleRetweet=()=>{
        setOpenReply(false)
        toggleOverlay()
    }

    const handleReply=()=>{
        setOpenReply(true)
        toggleOverlay()
    }

    const onReplyPost=()=>{
        toggleOverlay()
        setReplyCount(replyCount+1)
    }

    const onRetweetPost=()=>{
        toggleOverlay()
        setRetweetCount(retweetCount+1)
    }

    const overlayToOpen = () =>  openReply ? <ReplyPost id={twit.id} onPost={onReplyPost} />:<RetwittPost id={twit.id} onPost={onRetweetPost} />;

    const liked = () => like ? <Icon color={'white'} name="heart" size={20}/> : <Icon color={'white'} name="heart-o" size={20}/>;

    const canRetweet = () => { return twit.user.id !== loggedUser.id ? handleRetweet : (_=>_) };
    
    if (!loggedUser) return <Text style={{color:'white'}} >Loading... </Text>;

    return(
        <View>
            <Overlay    containerStyle={{backgroundColor:'rgba(255,255,255,0.3)'}}
                        childrenWrapperStyle={OverlayStyles.container}
                        visible={isOpen} 
                        onClose={toggleOverlay} 
                        closeOnTouchOutside>
                {overlayToOpen()}
            </Overlay>
            

            <View style={IconButtonStatStyle.iconsContainer}>
                <IconButtonStat stat={replyCount} action={handleReply} title="Responder"> 
                    <Icon name="comments" color={"white"} size={20}/> 
                </IconButtonStat>
                <IconButtonStat stat={retweetCount} action={canRetweet()} title="Retwitear"> 
                    <Icon name="refresh" color={"white"} size={20}/>
                </IconButtonStat> 
                <IconButtonStat stat={twit.likes.length} action={handleLike}>
                    {liked()} 
                </IconButtonStat>
            </View>
        </View>
    )
}

export default TwittActions