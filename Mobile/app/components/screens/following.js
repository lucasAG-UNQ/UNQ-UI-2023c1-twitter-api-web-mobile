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
                <Text>Ups... algo salió mal</Text>
                <Text>{error}</Text>
            </View>
        );

    if (!followingTwitts) return <Text>Loading... </Text>;

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <BasicTwitt twitt={followingTwitts[0]} />
            
        </View>
    );
};

export default Following;
