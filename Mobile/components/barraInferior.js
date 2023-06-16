import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BarraInferior = ({ currentAction, onChangeAction }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60,width: '100%' }}>
        <TouchableOpacity onPress={() => onChangeAction('home')} style={{ flex: 1 }}>
          <Icon name="home" size={30} color={currentAction === 'home' ? 'white' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChangeAction('search')} style={{ flex: 1 }}>
          <Icon name="search" size={30} color={currentAction === 'search' ? 'white' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChangeAction('trending')} style={{ flex: 1 }}>
          <Icon name="rss" size={30} color={currentAction === 'trending' ? 'white' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChangeAction('tweet')} style={{ flex: 1 }}>
          <Icon name="twitter" size={30} color={currentAction === 'tweet' ? 'white' : 'gray'} />
        </TouchableOpacity>
      </View>
    );
  };

  export default BarraInferior