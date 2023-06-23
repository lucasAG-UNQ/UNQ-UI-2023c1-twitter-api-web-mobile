import React, { useState, useEffect} from "react";
import { View, Text } from "react-native";
import BottomNavigationBar from "./components/molecules/bottomNavigationBar";
import TwittLog from './components/organisms/twittLog';
import homeStyles from "./styles/estilos_home";
import loginStyles from "./styles/estilos";
import TwApi from './services/services';

const Home = () => {
    const [followingTwitts, setFollowingTwitts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        TwApi.getFollowingTwitts()
            .then((response) => {
                setFollowingTwitts(response.data.results);
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

    if (!followingTwitts)
        return <Text style={{ color: "white" }}>Loading... </Text>;

    return (
        <View style={homeStyles.container}>
            <Text style={homeStyles.titleBold}>Inicio</Text>
            <View style={homeStyles.tweetsListContainer}>
                {followingTwitts.length > 0 
                    ? (<TwittLog tweets={followingTwitts} />)
                    : (<Text style={homeStyles.titleNormal}>Loading...</Text>)}
                {error 
                    ? <Text style={loginStyles.errorText}>{error}</Text> 
                    : <></>}
            </View>
            <BottomNavigationBar currentAction='home' />
        </View>
    );
};

export default Home;
