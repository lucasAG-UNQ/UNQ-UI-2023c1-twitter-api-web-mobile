import { Button, View, Text} from "react-native"
import IconButtonStatStyle from "../../styles/estilos_iconButtonStat"


const IconButtonStat= ({children,stat,action,title})=>{
    return(
        <View className="button-stat">
            <Button style={IconButtonStatStyle.button} onPress={()=>action()} title={title}> 
                {children}
            </Button>
            <Text> {stat} </Text>
        </View>
    )
}

export default IconButtonStat