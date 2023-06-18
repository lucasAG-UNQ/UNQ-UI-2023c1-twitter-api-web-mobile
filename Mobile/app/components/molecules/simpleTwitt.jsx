import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import TwApi from "../../services/services";

const BasicTwitt = (twit) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        TwApi.getUser(twit.user.id).then((response) => setUser(response.data));
    }, []);

    return (
        <View key={twit.id} style={styles.twittContainer}>
            <Text>{user.id}</Text>
            <Text>{user.image}</Text>
            <Text>{twit.user.username}</Text>
            <Text>{twit.date}</Text>
            <Text>{twit.content}</Text>
            <Text>{twit.type}</Text>
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
