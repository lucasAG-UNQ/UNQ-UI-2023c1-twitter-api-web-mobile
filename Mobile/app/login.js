import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Input, InputPass, TwitterLogo } from "./components/atoms/atomos_basic";
import { useNavigation } from "@react-navigation/native";
import TwApi from "./services/services";

import loginStyles from "./styles/estilos";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigation = useNavigation();

    const validar = () => {
        let valida = true;
        if (password.length < 1) {
            setError("Debe ingresar la contraseña");
            valida = false;
        }
        if (username.length < 1) {
            setError("Debe ingresar un nombre de usuario");
            valida = false;
        }
        return valida;
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        if (validar()) {
            TwApi.login({ username: username, password: password })
                .then((response) => {
                    setError(null);
                    TwApi.saveDataToStorage( "twitterAccessToken", response.headers.authorization);
                    navigation.navigate("home", { state: { isLoggedUser: true }, });
                })
                .catch((error) => setError(error.description));
        }
    };

    return (
        <View style={loginStyles.container}>
            <View style={loginStyles.card}>
                <View style={loginStyles.cardBody}>
                    <View style={loginStyles.logoContainer}>
                        <TwitterLogo />
                    </View>
                    <View style={loginStyles.formContainer}>
                        <Text style={loginStyles.title}>LOGIN</Text>
                        <Text style={loginStyles.subtitle}>
                            Por favor ingrese su usuario y contraseña
                        </Text>
                        <Input seccion={"Usuario"} setFuncion={setUsername} />
                        <InputPass seccion={"Contraseña"} setFuncion={setPassword} />
                        <TouchableOpacity style={loginStyles.button} onPress={handleLoginSubmit}>
                            <Text style={loginStyles.buttonText}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                        <Text style={loginStyles.errorText}>{error}</Text>
                    </View>
                    <View style={loginStyles.registerContainer}>
                        <Text style={loginStyles.registerText}>
                            ¿No tienes cuenta?{" "}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("register")}>
                            <Text style={loginStyles.registerLink}>
                                REGISTRATE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Login;
