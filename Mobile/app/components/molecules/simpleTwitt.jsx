import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import TwApi from "../../services/services";
import FullTwittWithActions from "./fullTwittWithActions";

const SimpleTwitt = ({twit}) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        TwApi.getUser(twit.user.id).then((response) => setUser(response.data));
    }, []);

    console.log('twitt ', twit);
    return (
        <View key={twit.id} style={styles.twittContainer}>            
            <Text style={styles.whiteText}>{twit.user.username}: en {twit.date.replace("T", " a ").slice(0,18)}</Text>
            <Text style={styles.grayText}>{twit.content}</Text>
        </View>
    );
};
const TwitLog = ({twits}) => {
    return twits.map((twit) => <FullTwittWithActions key={twit.id} twit={twit}/>);
}

const styles = StyleSheet.create({
    twittContainer: {
        padding: 10,
        borderWidth: 1,
        marginTop:10,
        borderColor: '#DDDDDD',
    },
    whiteText:{color:'white'},
    grayText:{color:'#999999'},
});


export {SimpleTwitt, TwitLog};
