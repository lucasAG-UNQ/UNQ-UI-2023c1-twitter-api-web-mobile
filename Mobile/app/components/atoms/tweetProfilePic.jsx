import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TweetProfilePic = ({ image, user }) => {
    const navigation = useNavigation();

    const handleAvatarTouch = () => {
        navigation.navigate("user", { user: user });
    };

    return (
        <View style={{ margin: 10 }}>
            <TouchableOpacity
                style={{backgroundColor: "white", height: 50, width: 50, borderRadius: 20, alignItems:'center', justifyContent:'center' }}
                onPress={handleAvatarTouch}
            >
                <Image
                    source={{ uri: image }}
                    style={{ height: 48, width: 48, borderRadius: 20 }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default TweetProfilePic;
