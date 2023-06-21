import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BottomNavigationBar = ({ currentAction, onChangeAction }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60, width: '100%' }}>
        <TouchableOpacity style={{ flex: 1 }} 
          onPress={currentAction != 'home' ? () => onChangeAction('home') : null} 
        >
          <Icon name="home" size={30} color={currentAction === 'home' ? 'white' : 'gray'} />
        </TouchableOpacity>
        
        <TouchableOpacity style={{ flex: 1 }}
          onPress={currentAction != 'search' ? () => onChangeAction('search') : null} 
        >
          <Icon name="search" size={30} color={currentAction === 'search' ? 'white' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} 
          onPress={currentAction != 'trending' ? () => onChangeAction('setrendingarch') : null}
        >
          <Icon name="rss" size={30} color={currentAction === 'trending' ? 'white' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} 
          onPress={currentAction != 'tweet' ? () => onChangeAction('tweet') : null}
        >
          <Icon name="twitter" size={30} color={currentAction === 'tweet' ? 'white' : 'gray'} />
        </TouchableOpacity>
      </View>
    );
  };

  export default BottomNavigationBar