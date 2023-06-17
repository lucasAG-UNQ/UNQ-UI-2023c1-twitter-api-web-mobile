import { View, TouchableOpacity, Text } from 'react-native';
import homeStyles from "../components/estilos/estilos_home";

const Tabs = ({ currentTab, onChangeTab }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 60, width: '100%' }}>
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: currentTab === 'following' ? 'black' : 'gray', width: '50%', borderRadius: 15}}  onPress={() => onChangeTab('following')}>
          <Text style={currentTab === 'following' ? homeStyles.titleBold : homeStyles.titleNormal }>Siguiendo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: currentTab === 'profile' ? 'black' : 'gray', width: '50%', borderRadius: 15}} onPress={() => onChangeTab('profile')}>
          <Text style={currentTab === 'profile' ? homeStyles.titleBold : homeStyles.titleNormal }>Perfil</Text>
        </TouchableOpacity>
      </View>
    );
  };

export default Tabs