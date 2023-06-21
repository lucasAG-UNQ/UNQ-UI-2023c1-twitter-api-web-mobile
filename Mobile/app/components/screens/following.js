import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import BasicTwitt from "../molecules/simpleTwitt";

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

    if (error)
        // ToDo: darle estilos al error
        return (
            <View>
                <Text style={{color:'white'}}>Ups... algo salió mal</Text>
                <Text style={{color:'white'}}>{error}</Text>
            </View>
        );

    if (!followingTwitts) return <Text style={{color:'white'}}>Loading... </Text>;

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            {followingTwitts.map(t=><BasicTwitt twit={t} />)}
            
            
        </View>
    );
};

export default Following;
