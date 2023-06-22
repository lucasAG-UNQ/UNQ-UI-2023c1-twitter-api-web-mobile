import { TouchableOpacity, View, Text} from "react-native"
import IconButtonStatStyle from "../../styles/estilos_iconButtonStat"
import { TouchableHighlight } from "react-native-gesture-handler"


const IconButtonStat= ({children,stat,action,title})=>{
    return(
        <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
            <TouchableHighlight 
                activeOpacity={0.5} 
                underlayColor={'rgba(255,255,255,0.5)'}
                onPress={()=>action()} 
                title={title} 
                style={{backgroundColor:'rgba(0,0,0,0)',width:40, height:40, borderRadius:40/2, alignItems:'center',justifyContent:'center'}}
            > 
                <View >
                    {children}
                </View>
            </TouchableHighlight>
            <Text style={{color:'white'}}> {stat} </Text>
        </View>
    )
}

export default IconButtonStat