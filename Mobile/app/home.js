import React, { useState, useCallback } from "react";
import { View, RefreshControl, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import TopNavigationTabs from "./components/molecules/topNavigationTabs";
import BottomNavigationBar from "./components/molecules/bottomNavigationBar";
import Profile from "./components/screens/profile";
import Following from "./components/screens/following";
import homeStyles from "./styles/estilos_home";

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => { setRefreshing(false) }, 500);
    }, []);

    const [currentTab, setCurrentTab] = useState("following");
    const [currentAction, setCurrentAction] = useState("home");

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    return (
        <SafeAreaView style={homeStyles.container}>
            <ScrollView
                contentContainerStyle={homeStyles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={{ flex: 1 }}>
                    <TopNavigationTabs currentTab={currentTab} onChangeTab={handleTabChange} />
                    <View style={{ flex: 1 }}>
                        {currentTab === "profile" && <Profile />}
                        {currentTab === "following" && <Following />}
                    </View>
                    <BottomNavigationBar currentAction={currentAction} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
