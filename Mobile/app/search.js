import {React, useState, useCallback } from 'react';
import { View, RefreshControl, SafeAreaView , Text, TextInput,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import homeStyles from "../components/estilos/estilos_home";
import { ScrollView } from 'react-native-gesture-handler';
import BarraInferior from '../components/barraInferior';
import {InputSearch} from "../components/atomos_basic";

const Search = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation()
  const [texto, setTexto] = useState('')

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const [currentAction, setCurrentAction] = useState('search');

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
      <ScrollView contentContainerStyle={homeStyles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>   
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <InputSearch seccion={"Texto a buscar"} setFuncion={setTexto} />
          <TouchableOpacity>
            <Icon name="search" size={30} color='white' />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={homeStyles.titleBold}>B U S Q U E D A</Text>
        </View>
      </ScrollView>
      <BarraInferior currentAction={currentAction} onChangeAction={ejecutarAccion}/>
    </SafeAreaView>
  );
};

   
export default Search








