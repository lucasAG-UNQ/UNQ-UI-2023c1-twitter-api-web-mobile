import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import homeStyles from "../../styles/estilos_home";

import TwApi from "../../services/services";

const BasicTwitt = ({twit}) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        TwApi.getUser(twit.user.id).then((response) => setUser(response.data));
    }, []);

    return (
        <View key={twit.id} style={styles.twittContainer}>
            <Text style={homeStyles.titleNomal}>{user.id}</Text>
            <Text>{user.image}</Text>
            <Text style={homeStyles.titleNormal}>{twit.user.username}</Text>
            <Text style={homeStyles.titleNormal}>{twit.date}</Text>
            <Text style={homeStyles.titleNormal}>{twit.content}</Text>
            
        </View>
    );
};

const styles = StyleSheet.create({
    twittContainer: {
        paddingBottom: 5,
        paddingTop: 5,
    },
});

export default BasicTwitt;
