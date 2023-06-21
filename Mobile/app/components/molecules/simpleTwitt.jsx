import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import TwApi from "../../services/services";

const SimpleTwitt = ({twit}) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        TwApi.getUser(twit.user.id).then((response) => setUser(response.data));
    }, []);

    console.log('twitt ', twit);
    return (
        <View key={twit.id} style={styles.twittContainer}>
            <Text style={styles.whiteText}>{twit.user.id}</Text>
            
            <Text style={styles.whiteText}>{twit.user.username}</Text>
            <Text style={styles.whiteText}>{twit.date}</Text>
            <Text style={styles.whiteText}>{twit.content}</Text>
            
        </View>
    );
};

const styles = StyleSheet.create({
    twittContainer: {
        paddingBottom: 5,
        paddingTop: 5,
    },
    whiteText:{color:'white'}
});

export default SimpleTwitt;
