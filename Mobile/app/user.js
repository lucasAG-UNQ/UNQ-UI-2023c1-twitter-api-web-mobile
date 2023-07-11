import React from "react";
import { View, Text } from "react-native";
import { useRoute } from '@react-navigation/native';
import BottomNavigationBar from './components/molecules/bottomNavigationBar';
import UserCard from "./components/organisms/userCard";
import TweetLog from './components/organisms/tweetLog';
import homeStyles from "./styles/estilos_home";

const User = () => {
    
    const route = useRoute();
    const user = route.params.user;
    const tweets = user.tweets;

    if (!tweets || !user)
        return (<View><Text style={homeStyles.titleBold}>Loading...</Text></View>);

    return (
        <View style={homeStyles.container}>
            <UserCard {...user} />
            <View style={homeStyles.tweetsListContainer}>
                <TweetLog tweets={tweets} />
            </View>
            <BottomNavigationBar currentAction="user" />
        </View>
    );
};

export default User;
