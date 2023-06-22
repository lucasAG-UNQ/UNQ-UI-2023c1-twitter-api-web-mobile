import React, { useState, useEffect, useCallback } from "react";
import { View, Text, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TwittLog from '../molecules/twittLog';
import homeStyles from "../../styles/estilos_home";
import loginStyles from "../../styles/estilos";

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
        <View>
            {(followingTwitts.length > 0) ? 
                <TwittLog tweets={followingTwitts} /> : 
                <Text style={homeStyles.titleNormal}>Loading...</Text>}
            <Text style={loginStyles.errorText}>{error}</Text>
        </View>
        </ScrollView>
    );
};


  

export default Following;
