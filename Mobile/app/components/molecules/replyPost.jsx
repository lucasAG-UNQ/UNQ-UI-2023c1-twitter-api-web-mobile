import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import TwApi from "../../services/services";
import TwitProfilePic from "../atoms/twitProfilePic";
import { View,TouchableOpacity,Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ReplyRetweetPostStyles from "../../styles/estilos_reply-retweet";

const ReplyPost = ({ id, onPost }) => {
    const [loggedUser, setLoggedUser] = useState();
    const [textPost, setTextPost] = useState("");
    const [imagePost, setImagePost] = useState("");
    const [error, setError] = useState("");

    const navigation = useNavigation();
    
    const handleTwitPost = (event) => {
        event.preventDefault();
        const twitToPost = { content: textPost, image: imagePost };
        TwApi.reply(id, twitToPost)
            .then((_) => {
                setError("");
                navigation(`/twitt/${id}`);
                onPost();
            })
            .catch((error) => setError(error.status));
    };

    const handleError = () => error ? <Text style={{color:'white'}}>Ups... algo salió mal</Text> : <></>;

    useEffect(() => {
        TwApi.getLoggedUser().then((response) => {
            setLoggedUser(response.data);
            console.log(response.data)
        });
    }, []);

    if (!loggedUser) return <Text style={{color:'white'}}>Loading... </Text>;

    return (
        <View>
            {handleError()}
            <View style={ReplyRetweetPostStyles.container}>
                <TwitProfilePic image={loggedUser.image} id={loggedUser.id} />
                <View >
                        <View style={{}}>
                            <Text style={{color:'white'}}>Respondiendo</Text>
                            <TextInput multiline numberOfLines={4} style={ReplyRetweetPostStyles.inputText} placeholder={"Texto"} onChange={setTextPost} />
                            <TextInput style={ReplyRetweetPostStyles.inputImage} placeholder={"Link a imagen"} onChange={setImagePost} /> 
                            <TouchableOpacity style={{}} onPress={handleTwitPost}>
                            <Text style={{color:'white'}}>Twitear</Text>
                            </TouchableOpacity>
                            <Text style={{color:'white'}}>{error}</Text>
                        </View>
                </View>
            </View>
        </View>
    );
};

export default ReplyPost;
