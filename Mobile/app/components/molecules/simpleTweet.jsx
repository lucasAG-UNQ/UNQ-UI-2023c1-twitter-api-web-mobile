import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import TweetProfilePic from "../atoms/tweetProfilePic";
import TwApi from "../../services/services";
import TweetStyles from "../../styles/tweetStyles";

const SimpleTweet = ({ tweet }) => {
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

    const handleNavigateTweet=()=>navigation.navigate('tweetScreen',{ tweetId: (tweet.id) })

    return (
        <TouchableOpacity style={TweetStyles.tweetContainer} onPress={handleNavigateTweet}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', padingBottom: 2 }}>
                <TweetProfilePic image={tweetAuthor.image} user={tweetAuthor} />
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
        </TouchableOpacity>
    );
};

export default SimpleTweet;
