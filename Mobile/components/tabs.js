import { View, TouchableOpacity, Text } from 'react-native';
import homeStyles from "../components/estilos/estilos_home";

const Tabs = ({ currentTab, onChangeTab }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 60, width: '100%' }}>
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: currentTab === 'follow' ? 'black' : 'gray', width: '50%'}}  onPress={() => onChangeTab('follow')}>
          <Text style={currentTab === 'follow' ? homeStyles.titleBold : homeStyles.titleNormal }>Siguiendo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: currentTab === 'perfil' ? 'black' : 'gray', width: '50%'}} onPress={() => onChangeTab('perfil')}>
          <Text style={currentTab === 'perfil' ? homeStyles.titleBold : homeStyles.titleNormal }>Perfil</Text>
        </TouchableOpacity>
      </View>
    );
  };

  export default Tabs