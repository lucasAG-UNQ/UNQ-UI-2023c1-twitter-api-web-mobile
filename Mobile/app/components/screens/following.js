import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import { TwitLog } from "../molecules/simpleTwitt";
import homeStyles from "../../styles/estilos_home";
import loginStyles from "../../styles/estilos";

import TwApi from "../../services/services";

const Following = () => {
const [followingTwitts, setFollowingTwitts] = useState([]);
const [error, setError] = useState("");

useEffect(() => {
    TwApi.getFollowingTwitts()
        .then((response) => {
            console.log(response);
            setFollowingTwitts(response.data.results);
            setError("");
        })
        .catch((err) => {
            setError(err.description);
        });
}, []);

return (
    <ScrollView contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <View>
        {(followingTwitts.length > 0) ? <TwitLog twits={followingTwitts} /> : <Text style={homeStyles.titleNormal}>Loading...</Text>}
        <Text style={loginStyles.errorText}>{error}</Text>
        </View>
    </ScrollView>
);
};


  

export default Following;
