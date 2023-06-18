import { StyleSheet } from "react-native";

const IconButtonStatStyle= StyleSheet.create({
    button:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        height: 30,
        width: 30,
        borderRadius: '50%',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: '#fff',
    },
    iconsContainer:{
        flex:1,
        paddingRight: '10%',
        paddingLeft: '10%',
        justifyContent:'space-between',
        color: '#fff',
    }
});

export default IconButtonStatStyle;