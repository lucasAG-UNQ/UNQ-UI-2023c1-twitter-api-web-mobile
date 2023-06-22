import { View } from "react-native-animatable";
import SimpleTwitt from "./simpleTwitt";
import TwittActions from "./twittActions";

const FullTwittWithActions=({tweet})=>{

    return(
        <View>
            <SimpleTwitt tweet={tweet} />
            <TwittActions tweet={tweet} />
        </View>
    )
}

export default FullTwittWithActions