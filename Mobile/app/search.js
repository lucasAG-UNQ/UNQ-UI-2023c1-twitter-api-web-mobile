import {React, useState, useCallback, useEffect } from 'react';
import { View, RefreshControl, SafeAreaView , Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import homeStyles from "./styles/estilos_home";
import loginStyles from "./styles/estilos";
import { ScrollView } from 'react-native-gesture-handler';
import BarraInferior from './components/molecules/barraInferior';
import {InputSearch} from "./components/atoms/atomos_basic";
import TwApi from './services/services';

const Search = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('')
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
        navigation.navigate("search", {text:''});
        break;
      case 'home':
        navigation.navigate("home");
        break;
    }
  }
  const buscar = ()=>{
    TwApi.search(texto)
      .then(response => {
        setTwitts(response.data.results);
        setError('');
      })
      .catch((error) => setError(error.description))
    }

  return (
    <SafeAreaView style={homeStyles.container}>
      <ScrollView contentContainerStyle={homeStyles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>   
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <InputSearch seccion={"Texto a buscar"} setFuncion={setTexto} />
          <TouchableOpacity onPress={texto != '' ? buscar: null} >
            <Icon name="search" size={30} color='white' />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={homeStyles.titleBold}>B U S Q U E D A = {texto}</Text>
          <Text style={loginStyles.errorText}>{error}</Text>
        </View>
      </ScrollView>
      <BarraInferior currentAction={currentAction} onChangeAction={ejecutarAccion}/>
    </SafeAreaView>
  );
};

   
export default Search








