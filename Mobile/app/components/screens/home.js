import React, {useState, useCallback } from 'react';
import { View, RefreshControl, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Tabs from '../molecules/tabs';
import BarraInferior from '../molecules/barraInferior';
import Profile from './profile';
import Following from './following';

import homeStyles from "../../styles/estilos_home";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const [currentTab, setCurrentTab] = useState('following');
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
        {currentTab === 'profile' && <Profile />}
        {currentTab === 'following' && <Following />}
      </View>
      <BarraInferior currentAction={currentAction} />
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

   
export default Home








