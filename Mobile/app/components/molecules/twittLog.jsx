import React from "react";
import { View, FlatList, Text} from 'react-native';
import FullTwittWithActions from "./fullTwittWithActions";

const TwittLog = ({ tweets }) => {

    // ToDo: acá debería ir la función decideTwit() para mapear con el tipo de twitt correcto
    const renderTwitt = ({item: tweet}) => {
      return <FullTwittWithActions key={tweet.id} tweet={tweet} /> ;
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
