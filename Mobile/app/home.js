import React, { useState, useEffect} from "react";
import { View, Text } from "react-native";
import BottomNavigationBar from "./components/molecules/bottomNavigationBar";
import TweetLog from './components/organisms/tweetLog';
import homeStyles from "./styles/estilos_home";
import loginStyles from "./styles/estilos";
import TwApi from './services/services';

const Home = () => {
    const [followingTweets, setFollowingTweets] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        TwApi.getFollowingTweets()
            .then((response) => {
                setFollowingTweets(response.data.results);
                setError(null);
            })
            .catch((err) => {
                setError(err.description);
            });
    }, []);

    return (
        <View style={homeStyles.container}>
            <Text style={homeStyles.titleBold}>Inicio</Text>
            <View style={homeStyles.tweetsListContainer}>
                {error 
                    ? <View><Text style={loginStyles.errorText}>Ups... algo salió mal</Text><Text style={loginStyles.errorText}>{error}</Text></View>
                    : !followingTweets
                        ? <Text style={homeStyles.titleNormal}>Loading... </Text>
                        : (followingTweets.length > 0 )
                            ? <TweetLog tweets={followingTweets} />
                            : <Text style={homeStyles.titleNormal}>Aún no sigues a nadie!</Text>}
            </View>
            <BottomNavigationBar currentAction='home' />
        </View>
    );
};

export default Home;
