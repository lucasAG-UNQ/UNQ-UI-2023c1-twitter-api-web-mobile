import { TouchableOpacity, View, Text} from "react-native"
import IconButtonStatStyle from "../../styles/estilos_iconButtonStat"


const IconButtonStat= ({children,stat,action,title})=>{
    return(
        <View style={{flexDirection:'row', alignContent:'center',justifyContent:'center'}}>
            <TouchableOpacity 
                activeOpacity={0.5} 
                onPress={()=>action()} 
                title={title} 
                style={{backgroundColor:'#000',width:30, height:30, borderRadius:30/2, alignItems:'center',justifyContent:'center'}}
            > 
                <View >
                    {children}
                </View>
            </TouchableOpacity>
            <Text style={{color:'white'}}> {stat} </Text>
        </View>
    )
}

export default IconButtonStat