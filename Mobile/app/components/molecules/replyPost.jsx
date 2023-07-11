import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import TwApi from "../../services/services";
import TweetProfilePic from "../atoms/tweetProfilePic";
import { View,TouchableOpacity,Text } from "react-native";
import ReplyRetweetPostStyles from "../../styles/estilos_reply-retweet";
import { Input } from "../atoms/atomos_basic";

const ReplyPost = ({ id, onPost }) => {
    const [loggedUser, setLoggedUser] = useState();
    const [textPost, setTextPost] = useState("");
    const [imagePost, setImagePost] = useState("");
    const [error, setError] = useState(null);

    const navigation = useNavigation();
    
    const handleTweetPost = (event) => {
        event.preventDefault();
        const tweetToPost = { content: textPost, image: imagePost };
        TwApi.reply(id, tweetToPost)
            .then((_) => {
                setError(null);
                onPost();
            })
            .catch((error) => setError(error.status));
    };

    const handleError = () => error ? <Text style={{color:'white'}}>Ups... algo salió mal</Text> : <></>;

    useEffect(() => {
        TwApi.getLoggedUser().then((response) => {
            setLoggedUser(response.data);
        });
    }, []);

    if (!loggedUser) return <Text style={{color:'white'}}>Loading... </Text>;

    return (
        <View>
            {handleError()}
            <View style={ReplyRetweetPostStyles.container}>
                <TweetProfilePic image={loggedUser.image} id={loggedUser.id} />
                <View style={ReplyRetweetPostStyles.inputsContainer}>
                        <View style={{}}>
                            <Text style={{color:'white'}}>Respondiendo</Text>
                            <Input seccion={"Texto"} setFuncion={setTextPost} />
                            <Input seccion={"Link a Imagen"} setFuncion={setImagePost} />
                            <TouchableOpacity style={ReplyRetweetPostStyles.button} onPress={handleTweetPost}>
                                <Text style={{color:'white'}}>Twitear</Text>
                            </TouchableOpacity>
                            <Text style={{color:'red'}}>{error}</Text>
                        </View>
                </View>
            </View>
        </View>
    );
};

export default ReplyPost;
