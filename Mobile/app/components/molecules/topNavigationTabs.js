import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import homeStyles from "../../styles/estilos_home";

const TopNavigationTabs = ({ currentTab, onChangeTab }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 60, width: '100%' }}>
        <TouchableOpacity style={ [ tabsStyles.tab , currentTab === 'following' ? tabsStyles.activeTab : tabsStyles.inactiveTab ] } onPress={() => onChangeTab('following')}>
          <Text style={currentTab === 'following' ? homeStyles.titleBold : homeStyles.titleInactive }>Siguiendo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ [ tabsStyles.tab , currentTab === 'profile' ? tabsStyles.activeTab : tabsStyles.inactiveTab ] } onPress={() => onChangeTab('profile')}>
          <Text style={currentTab === 'profile' ? homeStyles.titleBold : homeStyles.titleInactive }>Perfil</Text>
        </TouchableOpacity>
      </View>
    );
  };

const tabsStyles = StyleSheet.create({
  tab: {
    alignItems: 'center', 
    width: '50%', 
    borderRadius: 15
  },
  activeTab: {
    backgroundColor: 'gray',
  },
  inactiveTab: {
    backgroundColor: 'black',
  }
});

export default TopNavigationTabs