import React, {useState, useCallback } from 'react';
import { View, RefreshControl, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Tabs from './components/molecules/tabs';
import BarraInferior from './components/molecules/barraInferior';
import Profile from './components/screens/profile';
import Following from './components/screens/following';
import homeStyles from "./styles/estilos_home";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation()

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

  const ejecutarAccion = (boton) => {
    switch (boton) {
      case 'search':
        navigation.navigate("search");
        break;
      case 'home':
        navigation.navigate("home");
        break;
    }
  }


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
      <BarraInferior currentAction={currentAction} onChangeAction={ejecutarAccion}/>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

   
export default Home








