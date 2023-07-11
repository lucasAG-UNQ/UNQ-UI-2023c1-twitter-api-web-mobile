import { View, Text } from "react-native-animatable";
import SimpleTweet from "../molecules/simpleTweet";
import TweetActions from "../molecules/tweetActions";
import TweetStyles from "../../styles/tweetStyles";

const TweetWithActions=({tweet})=>{
    return(
        <View style={TweetStyles.tweetWithActionsContainer}>
            <SimpleTweet tweet={tweet} />
            <TweetActions tweet={tweet} />
        </View>
    )
}

const Retweet=({tweet})=>{

    return(
        <View style={TweetStyles.tweetWithActionsContainer}>
            <SimpleTweet tweet={tweet} />
            <Text style={TweetStyles.greenText}>Retweeted</Text>
            <View style={TweetStyles.retweetContainer}>
                <SimpleTweet tweet={tweet.type.tweet}/>
            </View>
            <TweetActions tweet={tweet} />
        </View>
    )
}

const ReplyTweet=({tweet})=>{

    return(
        <View style={TweetStyles.tweetWithActionsContainer}>
            <SimpleTweet tweet={tweet} />
            <Text style={TweetStyles.blueText}>Respondió a {tweet.type.tweet.user.username}</Text>
            <View style={TweetStyles.replyContainer}>
                <SimpleTweet tweet={tweet.type.tweet}/>
            </View>
            <TweetActions tweet={tweet} />
        </View>
    )
}

export { TweetWithActions, Retweet, ReplyTweet }