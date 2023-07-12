import React, { useState, useEffect} from "react";
import { View, Text } from "react-native";
import BottomNavigationBar from "./components/molecules/bottomNavigationBar";
import TweetLog from './components/organisms/tweetLog';
import homeStyles from "./styles/estilos_home";
import loginStyles from "./styles/estilos";
import TwApi from './services/services';

const Home = () => {
    const [followingTweets, setFollowingTweets] = useState([]);
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

    if (error)
        return (
            <View>
                <Text style={{ color: "white" }}>Ups... algo salió mal</Text>
                <Text style={{ color: "white" }}>{error}</Text>
            </View>
        );

    if (!followingTweets)
        return <Text style={{ color: "white" }}>Loading... </Text>;

    return (
        <View style={homeStyles.container}>
            <Text style={homeStyles.titleBold}>Inicio</Text>
            <View style={homeStyles.tweetsListContainer}>
                {followingTweets.length > 0 
                    ? (<TweetLog tweets={followingTweets} />)
                    : (<Text style={homeStyles.titleNormal}>Aún no sigues a nadie!</Text>)}
                {error 
                    ? <Text style={loginStyles.errorText}>{error}</Text> 
                    : <></>}
            </View>
            <BottomNavigationBar currentAction='home' />
        </View>
    );
};

export default Home;
