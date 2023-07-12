import React, {useState, useEffect} from 'react';
import { View, Text} from 'react-native';
import BottomNavigationBar from './components/molecules/bottomNavigationBar';
import TweetLog from './components/organisms/tweetLog';
import homeStyles from "./styles/estilos_home";
import loginStyles from "./styles/estilos";
import TwApi from './services/services';

const Trending = () => {
  const [error, setError] = useState(null)
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    TwApi.trendingTopics()
      .then(response => {
        setTweets(response.data.results);
        setError(null);
      })
      .catch((error) => setError(error.description))
  }, []);

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.titleBold}>Trending topics</Text>
      <View style={homeStyles.tweetsListContainer}>
        {(tweets.length > 0) ? 
          <TweetLog tweets={tweets} /> : 
          <Text style={homeStyles.titleNormal}>Loading...</Text>}
        {error
          ? <Text style={loginStyles.errorText}>{error}</Text>
          : <></>
        }
      </View>
      <BottomNavigationBar currentAction='trending' />
    </View>
  );
};

export default Trending