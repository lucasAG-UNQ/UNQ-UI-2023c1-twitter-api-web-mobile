import {React, useState, useCallback, useEffect} from 'react';
import { View, RefreshControl, SafeAreaView , Text} from 'react-native';
import homeStyles from "./styles/estilos_home";
import { ScrollView } from 'react-native-gesture-handler';
import BottomNavigationBar from './components/molecules/bottomNavigationBar';
import TwApi from './services/services';
import { TweetWithActions, ReplyTweet, Retweet } from './components/organisms/tweetWithActions';
import {useRoute} from "@react-navigation/native"

const TweetScreen = () => {
    
    const route= useRoute();
    const tweetId=route.params.tweetId;

    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [tweet,setTweet]=useState()

    useEffect(()=>{
        TwApi.getTwitt(tweetId).then(response=>{
            setTweet(response.data)
            setError(null)
        })
        .catch(error=>setError(error.description))
    },[tweet])

    const currentAction = 'tweetScreen';
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);

    const decideTweet=(tweet)=>{
        if(tweet.type.tweet==null){
            return <TweetWithActions tweet={tweet} key={tweet.id} />
        }else if(tweet.type.image==null){
            return <Retweet tweet={tweet} key={tweet.id} />
        }else{
            return <ReplyTweet tweet={tweet} key={tweet.id}/>
        }
    }

  
  if (!tweet) return <Text style={{color:'white'}}>Loading... </Text>;

  
  if (error) return <Text style={{color:'red'}}>{error} </Text>;

  return (
    <SafeAreaView style={homeStyles.container}>
      <ScrollView contentContainerStyle={homeStyles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>   
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={homeStyles.titleBold}>Tweet de: {tweet.user.username} </Text>
        </View>
        <ScrollView contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <View>
                {decideTweet(tweet)}
            </View>
            <View>
                {tweet.replies.map(reply=><TweetWithActions tweet={reply} key={reply.id} />)}
            </View>
        </ScrollView>
      </ScrollView>
      <View style={{width:'100%'}}>
        <BottomNavigationBar currentAction={currentAction}/>
      </View>
    </SafeAreaView>
  );
};

   
export default TweetScreen