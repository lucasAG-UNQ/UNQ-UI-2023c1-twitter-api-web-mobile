import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import TwApi from "../../services/services";
import TwitProfilePic from "../atoms/twitProfilePic";
import { View,TouchableOpacity,Text } from "react-native";
import ReplyRetweetPostStyles from "../../styles/estilos_reply-retweet";
import { Input } from "../atoms/atomos_basic";

const RetwittPost = ({ id, onPost }) => {
    const [loggedUser, setLoggedUser] = useState();
    const [textPost, setTextPost] = useState("");
    const [error, setError] = useState(null);

    const navigation = useNavigation();
    
    const handleTwitPost = (event) => {
        event.preventDefault();
        const twitToPost = { content: textPost };
        TwApi.retwitt(id, twitToPost)
            .then((_) => {
                setError(null);
                onPost();
                navigation.navigate('tweetScreen',{tweetId:id})
            })
            .catch((error) => {console.log(error);setError(error.status)});
    };

    const handleError = () => error ? <Text style={{color:'white'}}>Ups... algo salió mal</Text> : <></>;

    useEffect(() => {
        TwApi.getLoggedUser().then((response) => {
            setLoggedUser(response.data)
        });
    }, []);

    if (!loggedUser) return <Text style={{color:'white'}}>Loading... </Text>;

    return (
        <View>
            {handleError()}
            <View style={ReplyRetweetPostStyles.container}>
                <TwitProfilePic image={loggedUser.image} id={loggedUser.id} />
                <View style={ReplyRetweetPostStyles.inputsContainer}>
                        <View style={{}}>
                            <Text style={{color:'white'}}>Retwiteando</Text>
                            <Input seccion={"Texto"} setFuncion={setTextPost} />
                            <TouchableOpacity style={ReplyRetweetPostStyles.button} onPress={handleTwitPost}>
                                <Text style={{color:'white'}}>Twitear</Text>
                            </TouchableOpacity>
                            <Text style={{color:'white'}}>{error}</Text>
                        </View>
                </View>
            </View>
        </View>
    );
};

export default RetwittPost;