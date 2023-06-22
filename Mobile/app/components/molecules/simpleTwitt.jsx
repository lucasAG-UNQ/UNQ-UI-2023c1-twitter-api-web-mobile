import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import TwitProfilePic from "../atoms/twitProfilePic";
import TwApi from "../../services/services";

const SimpleTwitt = ({ tweet }) => {
    const [twittAuthor, setTwittAuthor] = useState([]);

    useEffect(() => {
        TwApi.getUser(tweet.user.id).then((response) => setTwittAuthor(response.data));
    }, []);

    return (
        <View style={twittStyles.twittContainer}>
            <TwitProfilePic image={twittAuthor.image} id={twittAuthor.id} />
            <Text style={twittStyles.whiteText}>
                {tweet.user.username}: en{" "}
                {tweet.date.replace("T", " a ").slice(0, 18)}
            </Text>
            <Text style={twittStyles.grayText}>{tweet.content}</Text>
        </View>
    );
};

const twittStyles = StyleSheet.create({
    twittContainer: {
        padding: 10,
        borderWidth: 1,
        marginTop: 10,
        borderColor: "#DDDDDD",
    },
    whiteText: { color: "white" },
    grayText: { color: "#999999" },
});

export default SimpleTwitt;
