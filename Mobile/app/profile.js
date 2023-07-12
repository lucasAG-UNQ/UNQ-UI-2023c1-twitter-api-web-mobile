import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import BottomNavigationBar from './components/molecules/bottomNavigationBar';
import UserCard from "./components/organisms/userCard";
import TweetLog from './components/organisms/tweetLog';
import homeStyles from "./styles/estilos_home";
import loginStyles from "./styles/estilos";
import TwApi from "./services/services";

const Profile = () => {
    const [loggedUser, setLoggedUser] = useState(null);
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
                setLoggedUser(null)
                setTweets([])
                setError(err.description)
            });
      }, []);

    return (
        <View style={homeStyles.container}>
            { !!loggedUser ? <UserCard {...loggedUser} /> : <></>}
            <View style={homeStyles.tweetsListContainer}>
            {error 
                ? <View><Text style={loginStyles.errorText}>Ups... algo salió mal</Text><Text style={loginStyles.errorText}>{error}</Text></View>
                : (!tweets || !loggedUser)
                    ? <Text style={homeStyles.titleBold}>Loading...</Text>
                    : <TweetLog tweets={tweets} />}
            </View>
            <BottomNavigationBar currentAction="profile" />
        </View>
    );
};

export default Profile;
