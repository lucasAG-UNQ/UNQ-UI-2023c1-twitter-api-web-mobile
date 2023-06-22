import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const BottomNavigationBar = ({ currentAction }) => {
  const navigation = useNavigation()

  const goToScreen = (boton) => {
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 60 }}>
        <TouchableOpacity onPress={currentAction != 'home' ? () => goToScreen('home') : null}>
          <Icon name="home" size={30} color={currentAction === 'home' ? 'white' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={currentAction != 'search' ? () => goToScreen('search') : null}>
          <Icon name="search" size={30} color={currentAction === 'search' ? 'white' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={currentAction != 'trending' ? () => goToScreen('trending') : null}>
          <Icon name="rss" size={30} color={currentAction === 'trending' ? 'white' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={currentAction != 'tweet' ? () => goToScreen('tweet') : null}>
          <Icon name="pencil-square-o" size={30} color={currentAction === 'tweet' ? 'white' : 'gray'} />
        </TouchableOpacity>
      </View>
    );
  };

  export default BottomNavigationBar