import React, { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconButtonStat from "../atoms/iconButtonStat";
import TwApi from "../../services/services";
import { View,Text } from "react-native";
import IconButtonStatStyle from "../../styles/estilos_iconButtonStat"
import axios from "axios";
//import { Overlay } from "./overlay";
//import RetweetPost from "./retweetPost";
//import ReplyPost from "./replyPost";

const TwittActions= ({twit})=>{
    
    const [loggedUser, setLoggedUser] = useState({id:'u_3'})

    const [like, setLike] = useState(false);
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

    const handleLike=()=>{
        TwApi.toggleLike(twit.id)
                .then(response=>{twit.likes=response.data.likes
                    setLike(twit.likes.some( like => like.id === loggedUser.id))})
        TwApi.retrieveDataFromStorage('twitterAccessToken').then(data=>console.log(data))
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    const handleRetweet=()=>{
        setOpenReply(false)
        TwApi.logout()
        toggleOverlay()
    }

    const handleReply=()=>{
        setOpenReply(true)
        TwApi.saveDataToStorage('twitterAccessToken','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6InVfMjgifQ.L8cTlW6Q8Obe-v6qeDrxOkR-lLAJDLq1ysRdo4nTwH0').then(console.log("done"))
        toggleOverlay()
    }

    //const overlayToOpen = () =>  openReply ? <ReplyPost id={twit.id} onPost={toggleOverlay} /> : <RetweetPost id={twit.id} onPost={toggleOverlay} />;

    const liked = () => like ? <Icon color={'white'} name="heart" size={20}/> : <Icon color={'white'} name="heart-o" size={20}/>;

    const canRetweet = () => { return twit.user.id !== loggedUser.id ? handleRetweet : (_=>_) };
    
    //if (!loggedUser) return <Text style={{color:'white'}} >Loading... </Text>;

    return(
        <View>
            {/*<Overlay isOpen={isOpen} onClose={toggleOverlay}>{overlayToOpen()}</Overlay>*/}
            <View style={IconButtonStatStyle.iconsContainer}>
                <IconButtonStat stat={twit.repliesAmount || twit.replies?.length} action={handleReply} title="Responder"> 
                    <Icon name="comments" color={"white"} size={20}/> 
                </IconButtonStat>
                <IconButtonStat stat={twit.reTweetAmount || twit.reTweet?.length} action={TwApi.logout} title="Retwitear"> 
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