import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import TwApi from "../../services/services";

const BasicTwitt = ({twit}) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        TwApi.getUser(twit.user.id).then((response) => setUser(response.data));
    }, []);

    console.log('twitt ', twit);
    return (
        <View key={twit.id} style={styles.twittContainer}>
            <Text>{twit.user.id}</Text>
            
            <Text>{twit.user.username}</Text>
            <Text>{twit.date}</Text>
            <Text>{twit.content}</Text>
            
        </View>
    );
};

const styles = StyleSheet.create({
    twittContainer: {
        padding: 20,
        paddingBottom: 5,
        paddingTop: 5,
    },
});

export default BasicTwitt;
