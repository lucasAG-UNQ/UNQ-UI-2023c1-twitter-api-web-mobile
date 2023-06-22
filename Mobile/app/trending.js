import React, {useState, useEffect} from 'react';
import { View, Text} from 'react-native';
import homeStyles from "./styles/estilos_home";
import loginStyles from "./styles/estilos";
import BottomNavigationBar from './components/molecules/bottomNavigationBar';
import TwApi from './services/services';
import TwittLog from './components/organisms/twittLog';

const Trending = () => {
  const [error, setError] = useState(null)
  const [twitts,setTwitts] = useState([]);

  const currentAction = 'trending';
  
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
      <BottomNavigationBar currentAction={currentAction} />
    </View>
  );
};

export default Trending