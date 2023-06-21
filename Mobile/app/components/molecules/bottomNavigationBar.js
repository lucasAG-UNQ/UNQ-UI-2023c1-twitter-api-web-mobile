import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';



const BottomNavigationBar = ({ currentAction }) => {
  const navigation = useNavigation()

  const ejecutarAccion = (boton) => {
    switch (boton) {
      case 'search':
        navigation.navigate("search", {text:''});
        break;
      case 'home':
        navigation.navigate("home");
        break;
      case 'trending':
        navigation.navigate("trending");
        break;
    }
  }

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60, width: '100%' }}>
        <TouchableOpacity style={{ flex: 1 }} 
          onPress={currentAction != 'home' ? () => ejecutarAccion('home') : null} 
        >
          <Icon name="home" size={30} color={currentAction === 'home' ? 'white' : 'gray'} />
        </TouchableOpacity>
        
        <TouchableOpacity style={{ flex: 1 }}
          onPress={currentAction != 'search' ? () => ejecutarAccion('search') : null} 
        >
          <Icon name="search" size={30} color={currentAction === 'search' ? 'white' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} 
          onPress={currentAction != 'trending' ? () => ejecutarAccion('trending') : null}
        >
          <Icon name="rss" size={30} color={currentAction === 'trending' ? 'white' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} 
          onPress={currentAction != 'tweet' ? () => ejecutarAccion('tweet') : null}
        >
          <Icon name="twitter" size={30} color={currentAction === 'tweet' ? 'white' : 'gray'} />
        </TouchableOpacity>
      </View>
    );
  };

  export default BottomNavigationBar