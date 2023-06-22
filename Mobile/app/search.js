import {React, useState, useCallback} from 'react';
import { View, RefreshControl, SafeAreaView , Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import homeStyles from "./styles/estilos_home";
import loginStyles from "./styles/estilos";
import { ScrollView } from 'react-native-gesture-handler';
import BottomNavigationBar from './components/molecules/bottomNavigationBar';
import {InputSearch, TwitterLogo} from "./components/atoms/atomos_basic";
import TwApi from './services/services';
import TwittLog from './components/organisms/twittLog';

const Search = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('')
  const [twitts,setTwitts] = useState([]);
  const [texto, setTexto] = useState('');
  const [buscando, setBuscando] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const currentAction = 'search';
  
  const buscar = ()=>{
    TwApi.search(texto)
      .then(response => {
        setTwitts(response.data.results);
        twitts.length == 0 ? setBuscando(true): setBuscando(false);
        setError('');
      })
      .catch((error) => setError(error.description))
    }

  return (
    <SafeAreaView style={homeStyles.container}>
      <ScrollView contentContainerStyle={homeStyles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>   
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom:10}}>
          <InputSearch seccion={"Texto a buscar"} setFuncion={setTexto} />
          <TouchableOpacity onPress={texto != '' ? buscar: null} >
            <Icon name="search" size={30} color='white' />
          </TouchableOpacity>
        </View>
        <View>
          {(twitts.length > 0) ? 
            <TwittLog tweets={twitts} /> : 
            buscando ? 
              <Text style={homeStyles.titleBold}>No se encontró nada para: '{texto}'</Text> : 
              <View style={{flex:1}}>
                <TwitterLogo />
              </View>}
          <Text style={loginStyles.errorText}>{error}</Text>
        </View>
      </ScrollView>
      <View style={{width:'100%'}}>
        <BottomNavigationBar currentAction={currentAction}/>
      </View>
    </SafeAreaView>
  );
};

export default Search
