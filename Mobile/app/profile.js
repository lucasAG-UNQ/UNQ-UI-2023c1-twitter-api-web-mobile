import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import BottomNavigationBar from './components/molecules/bottomNavigationBar';
import UserCard from "./components/organisms/userCard";
import TweetLog from './components/organisms/tweetLog';
import homeStyles from "./styles/estilos_home";
import loginStyles from "./styles/estilos";
import TwApi from "./services/services";

const Profile = () => {
    const [loggedUser, setLoggedUser] = useState();
    const [tweets, setTweets] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        TwApi.getLoggedUser()
            .then((response) => {
                setLoggedUser(response.data);
                setTweets(response.data.tweets);
                setError(null);
            })
            .catch((err) => {
                setError(err.description);
            });
      }, []);

    if (error)
        return (
            <View>
                <Text style={homeStyles.titleBold}>Ups... algo salió mal</Text>
                <Text style={loginStyles.errorText}>{error}</Text>
            </View>
        );

    if (!tweets || !loggedUser)
        return (<View><Text style={homeStyles.titleBold}>Loading...</Text></View>);

    return (
        <View style={homeStyles.container}>
            <UserCard {...loggedUser} />
            <View style={homeStyles.tweetsListContainer}>
                <TweetLog tweets={tweets} />
            </View>
            <BottomNavigationBar currentAction="profile" />
        </View>
    );
};

export default Profile;
