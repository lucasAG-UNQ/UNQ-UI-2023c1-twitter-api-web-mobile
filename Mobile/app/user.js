import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRoute } from '@react-navigation/native';
import BottomNavigationBar from './components/molecules/bottomNavigationBar';
import UserCard from "./components/organisms/userCard";
import TwittLog from './components/organisms/twittLog';
import homeStyles from "./styles/estilos_home";
import loginStyles from "./styles/estilos";

const User = () => {
    const [error, setError] = useState(null);
    
    const route = useRoute();
    const user = route.params.user;
    const twitts = user.tweets;

    if (error)
        return (
            <View>
                <Text style={homeStyles.titleBold}>Ups... algo salió mal</Text>
                <Text style={loginStyles.errorText}>{error}</Text>
            </View>
        );

    if (!twitts || !user)
        return (<View><Text style={homeStyles.titleBold}>Loading...</Text></View>);

    return (
        <View style={homeStyles.container}>
            <UserCard {...user} />
            <View style={homeStyles.tweetsListContainer}>
                <TwittLog tweets={twitts} />
            </View>
            <BottomNavigationBar currentAction="user" />
        </View>
    );
};

export default User;
