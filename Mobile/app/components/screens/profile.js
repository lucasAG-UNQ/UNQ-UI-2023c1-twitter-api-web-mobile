import React, { useState, useEffect} from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import homeStyles from "../../styles/estilos_home";
import loginStyles from "../../styles/estilos";
import TwApi from "../../services/services";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Profile = ({user}) => {

  const [loggedUser, setLoggedUser] = useState();
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [error, setError] = useState('')
  const navigation = useNavigation();

  const buttonFollowText = isFollowingUser ? 'Dejar de seguir' : 'Seguir';
  const buttonFollowClass = isFollowingUser ? 'red' : 'blue';

  useEffect(() => {
      TwApi.getLoggedUser()
          .then((response) => {
              setLoggedUser(response.data);
              setIsLoggedUser(response.data.id === user.id);
              setIsFollowingUser(response.data.following.some((usr) => usr.id === user.id));
          })    
  }, []);
  
  const handleClickFollow = () => {
      TwApi.followUser(user.id)
              .then( response => {
                  setIsFollowingUser(!isFollowingUser);
                  setError('');
              })
              .catch((err) => {
                  setError(err.description) })
  };

  const salir = () => {
    TwApi.logout();
    navigation.navigate("login")
  }

  if (error) return (
    <View>
      <Text style={homeStyles.titleBold}>Ups... algo salió mal</Text>
      <Text style={loginStyles.errorText}>{error}</Text>
    </View>
  )
      

  if (!loggedUser) return (
    <View>
      <Text style={homeStyles.titleBold}>Loading...</Text>
    </View>
  );

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={homeStyles.titleBold}>___________________</Text>
        <ScrollView contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <Image source={{ uri: user.backgroundImage }} style={{ width: '100%', aspectRatio: 1 }}/>
          <View style={styles.container}>
            <Image source={{ uri: user.image }} style={styles.image} />
              <Text style={homeStyles.titleNormal}>Nombre:</Text>
              <Text style={homeStyles.titleBold}>{user.username}</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={homeStyles.titleNormal}>Seguidosres</Text>
              <Text style={homeStyles.titleBold}>{user.followers.length}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={homeStyles.titleNormal}>Siguiendo</Text>
              <Text style={homeStyles.titleBold}>{user.following.length}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={homeStyles.titleNormal}>Twitts</Text>
              <Text style={homeStyles.titleBold}>{user.tweets.length}</Text>
            </View>
          </View>
          <View style={styles.container}>
            {
            (isLoggedUser)?
              <TouchableOpacity style={[styles.button, {backgroundColor:buttonFollowClass}]} onPress={salir} >
                <Text style={loginStyles.buttonText}>LOG OUT</Text>
              </TouchableOpacity>  :
              <TouchableOpacity style={[styles.button, {backgroundColor:buttonFollowClass}]} onPress={handleClickFollow}>
                  <Text style={loginStyles.buttonText}>{buttonFollowText}</Text>
              </TouchableOpacity>
            }
          </View>
        </ScrollView>
      </View>
    );
  };
  

  const styles = {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft:20,
    },
    image: {
      width: '20%',
      aspectRatio: 1,
    },
    textContainer: {
      marginLeft: 10,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 4,
    },
    button: {
      width: '80%',
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
    },

    statsNumber: {
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
    },
    statsLabel: {
      fontSize: 18,
      textAlign: 'center',
    },
  };


export default Profile