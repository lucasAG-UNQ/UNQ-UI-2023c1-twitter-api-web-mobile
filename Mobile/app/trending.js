import {React, useState, useCallback, useEffect} from 'react';
import { View, RefreshControl, SafeAreaView , Text} from 'react-native';
import homeStyles from "./styles/estilos_home";
import loginStyles from "./styles/estilos";
import { ScrollView } from 'react-native-gesture-handler';
import BottomNavigationBar from './components/molecules/bottomNavigationBar';
import TwApi from './services/services';
import TwittLog from './components/molecules/twittLog';

const Trending = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('')
  const [twitts,setTwitts] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const currentAction = 'trending';
  
  useEffect(() => {
    TwApi.trendingTopics()
      .then(response => {
        setTwitts(response.data.results);
        setError('');
      })
      .catch((error) => setError(error.description))
  }, []);

  return (
    <SafeAreaView style={homeStyles.container}>
      <ScrollView contentContainerStyle={homeStyles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>   
        <Text style={homeStyles.titleBold}>Trending topics</Text>
        <View>
          {(twitts.length > 0) ? 
            <TwittLog tweets={twitts} /> : 
            <Text style={homeStyles.titleNormal}>Loading...</Text>}
          <Text style={loginStyles.errorText}>{error}</Text>
        </View>
      </ScrollView>
      <BottomNavigationBar currentAction={currentAction} />
    </SafeAreaView>
  );
};

   
export default Trending








