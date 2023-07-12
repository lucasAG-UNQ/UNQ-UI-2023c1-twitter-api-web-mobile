import {React, useState, useEffect} from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import homeStyles from "./styles/estilos_home";
import { ScrollView } from 'react-native-gesture-handler';
import BottomNavigationBar from './components/molecules/bottomNavigationBar';
import TwApi from './services/services';
import TweetProfilePic from './components/atoms/tweetProfilePic';
import ReplyRetweetPostStyles from './styles/estilos_reply-retweet';
import { Input } from './components/atoms/atomos_basic';
import { useNavigation } from '@react-navigation/native';
import loginStyles from "./styles/estilos";

const TweetPost = () => {
    const navigation=useNavigation()

    const [loggedUser, setLoggedUser] = useState();

    const [textPost, setTextPost] = useState("");
    const [imagePost, setImagePost] = useState("");
    const [error, setError] = useState(null);
    const [tweetId, setTweetId] = useState(null);

    useEffect(() => {
        TwApi.getLoggedUser()
            .then((response) => {
                setLoggedUser(response.data);
                setError(null);
            })
            .catch((error) => setError(error.description));
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

    const handleTweetPost = (event) => {
        event.preventDefault();
        if (validar()) {
            const tweetToPost = { content: textPost, image: imagePost };
            TwApi.postNormalTwitt(tweetToPost)
                .then((response) => {
                    setTweetId(response.data.id);
                    setError(null);
                })
                .catch((error) => setError(error.description));
        }
    };

    useEffect(() => {
        if (tweetId) {
            setTextPost("");
            setImagePost("");
            setTimeout(() => {
                navigation.navigate('tweetScreen',{tweetId:tweetId});
            }, 1500);
        }
    }, [tweetId]);

    const postView=()=>{
        return(
            <View style={{width:'100%',alignItems:'center'}}>
            <TweetProfilePic image={loggedUser.image} id={loggedUser.id} />
            <View style={ReplyRetweetPostStyles.inputsContainer}>
                    <View>
                        <Input seccion={"¿Que estas pensando?"} setFuncion={setTextPost} />
                        <Input seccion={"Link a Imagen"} setFuncion={setImagePost} />
                        <TouchableOpacity style={ReplyRetweetPostStyles.button} onPress={handleTweetPost}><Text style={{color:'white'}}>Twitear</Text></TouchableOpacity>
                        <Text style={{color:'red'}}>{error}</Text>
                    </View>
            </View>
            </View>
        )
    }

    return (
        <View style={homeStyles.container}>
              <View style={{flex:1}}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={homeStyles.titleBold}>Nuevo Twit</Text>
                </View>
                <ScrollView contentContainerStyle={[{flex:1,paddingTop:30},ReplyRetweetPostStyles.container]}>
                  { !!loggedUser ? postView() : <Text style={loginStyles.errorText}>{error}</Text>}
                </ScrollView>
              </View>
            <BottomNavigationBar currentAction='tweet'/>
        </View>
    );
};

export default TweetPost