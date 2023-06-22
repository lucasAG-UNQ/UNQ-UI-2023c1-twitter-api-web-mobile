import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TwApi from "../../services/services";
import loginStyles from "../../styles/estilos";

const Profile = () => {

  const navigation = useNavigation()

  const handleLogout = () => {
    TwApi.logout();
    setTimeout(() => { navigation.navigate("login") }, 500);
  };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>ACA VA contenido de la página de Perfil</Text>
        <TouchableOpacity
                        style={loginStyles.button}
                        onPress={handleLogout}
                    >
                        <Text style={loginStyles.buttonText}>
                            LOG OUT - olvidar token
                        </Text>
                    </TouchableOpacity>
      </View>
    );
  };

export default Profile