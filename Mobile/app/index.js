import React, { useEffect, useState } from "react";
import Login from "./login";
import Home from "./home";
import { StatusBar } from "expo-status-bar";
import TwApi from "./services/services";

export default function App() {
    const [isLoggedUser, setIsLoggedUser] = useState(false);

    useEffect(() => {
        TwApi.isUserLogged().then((data) => {
            console.log(data);
            setIsLoggedUser(data);
        });
    }, []);

    return (
        <>
            <StatusBar backgroundColor="#666" style="light" />
            {isLoggedUser ? <Home /> : <Login />}
        </>
    );
}
