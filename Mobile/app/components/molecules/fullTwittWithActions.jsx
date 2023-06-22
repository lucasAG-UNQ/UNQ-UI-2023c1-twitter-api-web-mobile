import { View } from "react-native-animatable";
import { SimpleTwitt } from "./simpleTwitt";
import TwittActions from "./twittActions";

const FullTwittWithActions=({twit})=>{

    return(
        <View>
            <SimpleTwitt twit={twit} />
            <TwittActions twit={twit} />
        </View>
    )
}

export default FullTwittWithActions