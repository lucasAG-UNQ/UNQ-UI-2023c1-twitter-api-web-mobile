import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BarraInferior = ({ currentAction, onChangeAction }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 60 }}>
        <TouchableOpacity onPress={() => onChangeAction('home')} >
          <Icon name="home" size={30} color={currentAction === 'home' ? 'white' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChangeAction('trending')} >
          <Icon name="hashtag" size={30} color={currentAction === 'trending' ? 'white' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChangeAction('search')} >
          <Icon name="search" size={30} color={currentAction === 'search' ? 'white' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChangeAction('tweet')} >
          <Icon name="twitter" size={30} color={currentAction === 'tweet' ? 'white' : 'gray'} />
        </TouchableOpacity>
      </View>
    );
  };

  export default BarraInferior