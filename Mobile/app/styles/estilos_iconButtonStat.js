import { StyleSheet } from "react-native";

const IconButtonStatStyle= StyleSheet.create({
    button:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        height: 30,
        width: 30,
        borderRadius: 30/2,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: '#fff',
    },
    iconsContainer:{
        flexDirection:'row',
        paddingRight: '10%',
        paddingLeft: '10%',
        justifyContent: 'space-between',
        alignItems: 'center', 
        height: 60,
    }
});

export default IconButtonStatStyle;