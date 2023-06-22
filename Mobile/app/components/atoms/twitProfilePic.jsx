import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

const TwitProfilePic = ({ image, id }) => {
    const handleTouch = () => {
        // ToDo: usar id aca con el navigate
    };

    return (
        <View style={{ margin: 10 }}>
            <TouchableOpacity
                style={{backgroundColor: "white", height: 50, width: 50, borderRadius: 20, }}
                onPress={handleTouch}
            >
                <Image
                    source={{ uri: image }}
                    style={{ height: 48, width: 48, borderRadius: 20 }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default TwitProfilePic;
