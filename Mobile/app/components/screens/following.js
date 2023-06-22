import React, { useState, useEffect, useCallback } from "react";
import { View, Text, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import homeStyles from "../../styles/estilos_home";
import SimpleTwitt from "../molecules/simpleTwitt";

import TwApi from "../../services/services";

const Following = () => {
    const [followingTwitts, setFollowingTwitts] = useState([]);
    const [error, setError] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => { setRefreshing(false) }, 500);
    }, []);

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
        <ScrollView
        contentContainerStyle={homeStyles.container}
        refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        }
    >
        <View style={{ backgroundColor: 'green', flex: 1, justifyContent: "center", alignItems: "center" }}>
            {followingTwitts.map(t=><SimpleTwitt twit={t} />)}
        </View>
        </ScrollView>
    );
};

export default Following;
