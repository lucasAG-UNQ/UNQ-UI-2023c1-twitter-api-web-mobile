import React from "react";
import { View, FlatList, Text} from 'react-native';
import { FullTwittWithActions, Retweet, ReplyTwitt} from "./tweetWithActions";

const TwittLog = ({ tweets }) => {

    const renderTwitt = ({item: tweet}) => {
        if(tweet.type.tweet == null){
            return <FullTwittWithActions key={tweet.id} tweet={tweet} />
        }else if(tweet.type.image==null){
            return <Retweet  key={tweet.id} tweet={tweet} />
        }else{
            return <ReplyTwitt key={tweet.id} tweet={tweet} />
        }
    };

    return (
        <FlatList
            data={tweets}
            renderItem={ renderTwitt }
            keyExtractor={item => item.id}
            ItemSeparatorComponent={ () => <Text> </Text>}
        />
    );
};

export default TwittLog;
