import {React, useState, useCallback } from 'react';
import { View, RefreshControl, SafeAreaView } from 'react-native';
import homeStyles from "../components/estilos/estilos_home";
import { ScrollView } from 'react-native-gesture-handler';
import Tabs from '../components/tabs';
import Perfil from '../components/perfil';
import Follow from '../components/follow';
import BarraInferior from '../components/barraInferior';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const [currentTab, setCurrentTab] = useState('follow');
  const [currentAction, setCurrentAction] = useState('home');

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };


  return (
    <SafeAreaView style={homeStyles.container}>
      <ScrollView contentContainerStyle={homeStyles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
    <View style={{ flex: 1 }}>
      <Tabs currentTab={currentTab} onChangeTab={handleTabChange} />
      <View style={{ flex: 1 }}>
        {currentTab === 'perfil' && <Perfil />}
        {currentTab === 'follow' && <Follow />}
      </View>
      <BarraInferior currentAction={currentAction} />
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

   
export default Home








