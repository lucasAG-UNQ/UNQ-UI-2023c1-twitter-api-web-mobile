import { StyleSheet} from 'react-native';

const ReplyRetweetPostStyles = StyleSheet.create({
    container: {
      flexDirection:'row',
    },
    inputText: {
      backgroundColor: 'white',
      borderRadius: 4,
      padding: 8,
      marginBottom: 12,
    },
    inputImage: {
      backgroundColor: 'white',
      borderRadius: 4,
      padding: 8,
      marginBottom: 12,
    },
    inputsContainer: {
      width:'70%'
    },
    button:{
      backgroundColor: 'blue',
      borderRadius: 4,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
      width:100,
    }
});


export default ReplyRetweetPostStyles