import { StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#000'
    },
    card: {
      backgroundColor: 'dark',
      borderRadius: 8,
      width: '100%'
    },
    cardBody: {
      padding: 20,
    },
    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16
    },
    formContainer: {
      marginBottom: 24
    },
    title: {
      fontWeight: 'bold',
      fontSize: 24,
      marginBottom: 8,
      textAlign: 'center',
      color: 'white'
    },
    subtitle: {
      fontSize: 14,
      marginBottom: 16,
      textAlign: 'center',
      color: 'white'
    },
    input: {
      backgroundColor: 'white',
      borderRadius: 4,
      padding: 8,
      marginBottom: 12
    },
    inputSearch: {
      backgroundColor: 'white',
      borderRadius: 4,
      padding: 8,
      marginRight: 10,
      width: '80%'
    },
    button: {
      backgroundColor: 'blue',
      borderRadius: 4,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginBottom: 12
    },
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    registerText: {
      color: 'white'
    },
    registerLink: {
      color: 'blue'
    },
    logo: {
      width: 70,
      height: 70
    }
});


export default loginStyles