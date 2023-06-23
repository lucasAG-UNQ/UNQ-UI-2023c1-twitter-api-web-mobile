import React, { useState, useCallback, useEffect} from "react";
import { View, Text, SafeAreaView } from "react-native";
import TopNavigationTabs from "./components/molecules/topNavigationTabs";
import BottomNavigationBar from "./components/molecules/bottomNavigationBar";
import Profile from "./profile";
import Following from "./components/screens/following";
import homeStyles from "./styles/estilos_home";
import TwApi from "./services/services";

const Home = () => {
    const [loggedUser, setLoggedUser] = useState();

    useEffect(() => {
      TwApi.getLoggedUser()
          .then((response) => {
              setLoggedUser(response.data);
          })
    }, []);

    const [currentTab, setCurrentTab] = useState("following");
    const [currentAction, setCurrentAction] = useState("home");

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    console.log(loggedUser);
    if (!loggedUser)
        return (<View><Text style={homeStyles.titleBold}>Loading...</Text></View>);

    return (
        <SafeAreaView style={homeStyles.container}>
            <TopNavigationTabs currentTab={currentTab} onChangeTab={handleTabChange} />

                    <View style={{ flex: 1 }}>
                        
                        {currentTab === "following" && <Following />}
                    </View>

            <BottomNavigationBar currentAction={currentAction} />
        </SafeAreaView>
    );
};

export default Home;
