import { View, Text } from "react-native-animatable";
import SimpleTwitt from "../molecules/simpleTwitt";
import TwittActions from "../molecules/twittActions";
import TweetStyles from "../../styles/tweetStyles";

const FullTwittWithActions=({tweet})=>{
    return(
        <View style={TweetStyles.tweetWithActionsContainer}>
            <SimpleTwitt tweet={tweet} />
            <TwittActions tweet={tweet} />
        </View>
    )
}

const Retweet=({tweet})=>{

    return(
        <View style={TweetStyles.tweetWithActionsContainer}>
            <SimpleTwitt tweet={tweet} />
            <Text style={TweetStyles.greenText}>Retweeted</Text>
            <View style={TweetStyles.retweetContainer}>
                <SimpleTwitt tweet={tweet.type.tweet}/>
            </View>
            <TwittActions tweet={tweet} />
        </View>
    )
}

const ReplyTwitt=({tweet})=>{

    return(
        <View style={TweetStyles.tweetWithActionsContainer}>
            <SimpleTwitt tweet={tweet} />
            <Text style={TweetStyles.blueText}>Respondió a {tweet.type.tweet.user.username}</Text>
            <View style={TweetStyles.replyContainer}>
                <SimpleTwitt tweet={tweet.type.tweet}/>
            </View>
            <TwittActions tweet={tweet} />
        </View>
    )
}

export { FullTwittWithActions, Retweet, ReplyTwitt }