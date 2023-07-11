import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import homeStyles from "../../styles/estilos_home";
import loginStyles from "../../styles/estilos";
import TwApi from "../../services/services";

const UserCard = ( user ) => {
    const [loggedUser, setLoggedUser] = useState();
    const [isLoggedUser, setIsLoggedUser] = useState(false);
    const [isFollowingUser, setIsFollowingUser] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const buttonFollowText = isFollowingUser ? "Dejar de seguir" : "Seguir";
    const buttonFollowClass = isFollowingUser ? "red" : "blue";

    useEffect(() => {
        TwApi.getLoggedUser().then((response) => {
            setLoggedUser(response.data);
            setIsLoggedUser(response.data.id === user.id);
            setIsFollowingUser(response.data.following.some((usr) => usr.id === user.id));
        });
    }, []);

    const handleClickFollow = () => {
        TwApi.followUser(user.id)
            .then((response) => {
                setIsFollowingUser(!isFollowingUser);
                setError(null);
            })
            .catch((err) => {
                setError(err.description);
            });
    };

    const handleLogout = () => {
        TwApi.logout();
        setTimeout(() => { navigation.navigate("login") }, 500);
    };    

    if (error)
        return (
            <View>
                <Text style={homeStyles.titleBold}>Ups... algo salió mal</Text>
                <Text style={loginStyles.errorText}>{error}</Text>
            </View>
        );

    if (!loggedUser)
        return (<View><Text style={homeStyles.titleBold}>Loading...</Text></View>);

    return (
        <View>
            <Image
                source={{ uri: user.backgroundImage }}
                style={{ width: "100%", aspectRatio: 2 }}
            />
            <View style={styles.headerContainer}>
                <Image
                    source={{ uri: user.image }}
                    style={styles.image}
                />
                <Text style={styles.username}>{user.username}</Text>
            </View>
            <View style={styles.statsContainer}>
                <View>
                    <Text style={styles.statsLabel}>Seguidores</Text>
                    <Text style={styles.statsNumber}>{user.followers.length}</Text>
                </View>
                <View>
                    <Text style={styles.statsLabel}>Siguiendo</Text>
                    <Text style={styles.statsNumber}>{user.following.length}</Text>
                </View>
                <View>
                    <Text style={styles.statsLabel}>Tweets</Text>
                    <Text style={styles.statsNumber}>{user.tweets.length}</Text>
                </View>
            </View>
            <View style={{alignItems: 'center', backgroundColor: 'black'}}>
                {isLoggedUser ? (
                    <TouchableOpacity style={[ styles.button, { backgroundColor: buttonFollowClass } ]} onPress={handleLogout} >
                        <Text style={loginStyles.buttonText}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={[ styles.button, { backgroundColor: buttonFollowClass }]} onPress={handleClickFollow}>
                        <Text style={loginStyles.buttonText}>{buttonFollowText}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = {
    headerContainer: {
        marginTop: -75,
        padding: 2,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: 'rgba(75, 85, 105, 0.8)',
    },
    username: { 
        fontWeight: 'bold',
        fontSize: 26,
        color: "white"
    },
    image: {
        width: "20%",
        aspectRatio: 1,
        borderRadius: 10,
        marginRight: 10
    },
    statsContainer: {
        padding: 2,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "center",
        gap: 20
    },
    button: {
        width: "80%",
        alignItems: "center",
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    statsNumber: {
        fontWeight: "bold",
        fontSize: 22,
        color: 'white',
        textAlign: "center",
    },
    statsLabel: {
        fontSize: 16,
        color: 'white',
        textAlign: "center",
    },
};

export default UserCard;
