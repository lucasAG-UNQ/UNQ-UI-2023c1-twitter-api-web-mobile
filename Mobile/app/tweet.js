import {React, useState, useCallback, useEffect} from 'react';
import { View, RefreshControl, SafeAreaView , Text, TouchableOpacity} from 'react-native';
import homeStyles from "./styles/estilos_home";
import loginStyles from "./styles/estilos";
import { ScrollView } from 'react-native-gesture-handler';
import BottomNavigationBar from './components/molecules/bottomNavigationBar';
import TwApi from './services/services';
import TwitProfilePic from './components/atoms/twitProfilePic';
import ReplyRetweetPostStyles from './styles/estilos_reply-retweet';
import { Input } from './components/atoms/atomos_basic';

const TwitPost = () => {
    const [loggedUser, setLoggedUser] = useState();

    
    const [refreshing, setRefreshing] = useState(false);
    const [textPost, setTextPost] = useState("");
    const [imagePost, setImagePost] = useState("");
    const [error, setError] = useState("");
    const [tweetId, setTweetId] = useState("");

    const currentAction= 'tweet';

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 500);
    }, []);
  

    useEffect(() => {
        TwApi.getLoggedUser().then((response) => {
            setLoggedUser(response.data);
        });
    }, []);

    const validar = () => {
        let valida = true;
        if (textPost.length < 1) {
            setError("Debe ingresar un texto para el Tweet");
            return false;
        }
        if (
            imagePost.length > 0 &&
            (imagePost.length < 12 ||
                (!imagePost.toLowerCase().startsWith("http://") &&
                    !imagePost.toLowerCase().startsWith("https://")))
        ) {
            setError("La imagen debe ser una URL válida");
            return false;
        }
        return valida;
    };

    const handleTwitPost = (event) => {
        event.preventDefault();
        if (validar()) {
            const twitToPost = { content: textPost, image: imagePost };
            TwApi.postNormalTwitt(twitToPost)
                .then((response) => {
                    setTweetId(response.data.id);
                    setError('');
                })
                .catch((error) => setError(error.description));
        }
    };

    useEffect(() => {
        if (tweetId) {
            setError("HAS GENERADO UN NUEVO TWEET");
            setTextPost("");
            setImagePost("");
            setTimeout(() => {
                navigate(`/twitt/${tweetId}`);
            }, 2000);
        }
    }, [tweetId]);

    if (!loggedUser) return <Text style={{color:'white'}}>Loading... </Text>;

    return (
        <SafeAreaView style={homeStyles.container}>
            
            <ScrollView contentContainerStyle={homeStyles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              <View style={{flex:1}}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={homeStyles.titleBold}>Nuevo Twit</Text>
                </View>
                <ScrollView contentContainerStyle={[{flex:1,paddingTop:30},ReplyRetweetPostStyles.container]}>
                  <TwitProfilePic image={loggedUser.image} id={loggedUser.id} />
                  <View style={ReplyRetweetPostStyles.inputsContainer}>
                          <View>
                              <Input seccion={"¿Que estas pensando?"} setFuncion={setTextPost} />
                              <Input seccion={"Link a Imagen"} setFuncion={setImagePost} />
                              <TouchableOpacity style={ReplyRetweetPostStyles.button} onPress={handleTwitPost}>
                                  <Text style={{color:'white'}}>Twitear</Text>
                              </TouchableOpacity>
                              <Text style={{color:'red'}}>{error}</Text>
                          </View>
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
            <View style={{width:'100%'}}>
              <BottomNavigationBar currentAction={currentAction}/>
            </View>
            
        </SafeAreaView>
    );
};

   
export default TwitPost