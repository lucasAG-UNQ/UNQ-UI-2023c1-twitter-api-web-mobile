import React, {useState, useEffect} from 'react';
import { View, Text} from 'react-native';
import BottomNavigationBar from './components/molecules/bottomNavigationBar';
import TwittLog from './components/organisms/twittLog';
import homeStyles from "./styles/estilos_home";
import loginStyles from "./styles/estilos";
import TwApi from './services/services';

const Trending = () => {
  const [error, setError] = useState(null)
  const [twitts,setTwitts] = useState([]);

  useEffect(() => {
    TwApi.trendingTopics()
      .then(response => {
        setTwitts(response.data.results);
        setError(null);
      })
      .catch((error) => setError(error.description))
  }, []);

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.titleBold}>Trending topics</Text>
      <View style={homeStyles.tweetsListContainer}>
        {(twitts.length > 0) ? 
          <TwittLog tweets={twitts} /> : 
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