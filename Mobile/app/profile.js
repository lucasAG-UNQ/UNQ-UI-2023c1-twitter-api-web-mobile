import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import BottomNavigationBar from './components/molecules/bottomNavigationBar';
import UserCard from "./components/organisms/userCard";
import TwittLog from './components/organisms/twittLog';
import homeStyles from "./styles/estilos_home";
import loginStyles from "./styles/estilos";
import TwApi from "./services/services";

const Profile = () => {
    const [loggedUser, setLoggedUser] = useState();
    const [twitts, setTwitts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        TwApi.getLoggedUser()
            .then((response) => {
                setLoggedUser(response.data);
                setTwitts(response.data.tweets);
                setError(null);
            })
      }, []);

    if (error)
        return (
            <View>
                <Text style={homeStyles.titleBold}>Ups... algo salió mal</Text>
                <Text style={loginStyles.errorText}>{error}</Text>
            </View>
        );

    if (!twitts || !loggedUser)
        return (<View><Text style={homeStyles.titleBold}>Loading...</Text></View>);

    return (
        <View style={homeStyles.container}>
            <UserCard {...loggedUser} />
            <View style={homeStyles.tweetsListContainer}>
                <TwittLog tweets={twitts} />
            </View>
            <BottomNavigationBar currentAction="profile" />
        </View>
    );
};

export default Profile;
