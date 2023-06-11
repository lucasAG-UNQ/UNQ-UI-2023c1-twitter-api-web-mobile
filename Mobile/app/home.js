import React from 'react';
import { View, Text } from 'react-native';
import loginStyles from "../components/estilos/estilos";


const Home = () => {
return (
    <View style={loginStyles.container}>
      <View style={loginStyles.card}>
        <View style={loginStyles.cardBody}>
          <View style={loginStyles.formContainer}>
            <Text style={loginStyles.title}>HOME</Text>
            <Text style={loginStyles.subtitle}>usuario loguado</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

   
  export default Home