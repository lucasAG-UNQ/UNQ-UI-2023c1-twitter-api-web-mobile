import React, { useState, useCallback, useEffect} from "react";
import { View, SafeAreaView } from "react-native";
import TopNavigationTabs from "./components/molecules/topNavigationTabs";
import BottomNavigationBar from "./components/molecules/bottomNavigationBar";
import Profile from "./components/screens/profile";
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

    return (
        <SafeAreaView style={homeStyles.container}>
            <TopNavigationTabs currentTab={currentTab} onChangeTab={handleTabChange} />

                    <View style={{ flex: 1 }}>
                        {currentTab === "profile" && <Profile user={loggedUser} />}
                        {currentTab === "following" && <Following />}
                    </View>

            <BottomNavigationBar currentAction={currentAction} />
        </SafeAreaView>
    );
};

export default Home;
