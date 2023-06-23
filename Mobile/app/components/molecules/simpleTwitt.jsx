import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import TwitProfilePic from "../atoms/twitProfilePic";
import TwApi from "../../services/services";
import TweetStyles from "../../styles/tweetStyles";

const SimpleTwitt = ({ tweet }) => {
    const [tweetAuthor, setTweetAuthor] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        TwApi.getUser(tweet.user.id)
            .then((response) => setTweetAuthor(response.data));
    }, []);

    const handleUsernameTouch = () => {
        navigation.navigate("user", { user: tweetAuthor });
    };

    const handleImage = () => tweet.type.image
                ? <Image source={{ uri: tweet.type.image }} style={{ height: 320, width: 320 }} />
                : <View></View>

    return (
        <View style={TweetStyles.tweetContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', padingBottom: 2 }}>
                <TwitProfilePic image={tweetAuthor.image} user={tweetAuthor} />
                <View>
                    <TouchableOpacity onPress={handleUsernameTouch}>
                        <Text style={TweetStyles.username}>{tweet.user.username}</Text>
                    </TouchableOpacity>
                    <Text style={TweetStyles.whiteText}>Publicado el {tweet.date.replace("T", " a las ").slice(0, 18)} hs</Text>
                </View>
            </View>
            <Text style={TweetStyles.tweetContent}>{tweet.content}</Text>
            <View style={{ marginTop: 5, alignItems: 'center'}}>
                { handleImage() }
            </View>
        </View>
    );
};

export default SimpleTwitt;
