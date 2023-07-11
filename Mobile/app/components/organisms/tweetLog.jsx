import React from "react";
import { FlatList, Text} from 'react-native';
import { TweetWithActions, Retweet, ReplyTweet} from "./tweetWithActions";

const TweetLog = ({ tweets }) => {

    const renderTweet = ({item: tweet}) => {
        if(tweet.type.tweet == null){
            return <TweetWithActions key={tweet.id} tweet={tweet} />
        }else if(tweet.type.image==null){
            return <Retweet  key={tweet.id} tweet={tweet} />
        }else{
            return <ReplyTweet key={tweet.id} tweet={tweet} />
        }
    };

    return (
        <FlatList
            data={tweets}
            renderItem={ renderTweet }
            keyExtractor={item => item.id}
            ItemSeparatorComponent={ () => <Text> </Text>}
        />
    );
};

export default TweetLog;
