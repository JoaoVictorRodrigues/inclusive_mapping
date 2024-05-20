import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/index.js";
import './utils/i18n.js'
import { useTranslation } from 'react-i18next';

const Login = ({ navigation }: { navigation: any }) => {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");

    const handleFocus = (inputName: string) => {
        setFocusedInput(inputName);
    };

    const handleBlur = () => {
        setFocusedInput(null);
    };

    const login = async () => {
        if (email !== "" && password !== "") {
            await api.post(`/users/login`, {
                email: email,
                password: password,
            })
                .then(async function (response: { data: { accessToken: any; id: any; type: any; accessibilityLvl: any; }; }) {
                    await AsyncStorage.setItem("token", response.data.accessToken);
                    await AsyncStorage.setItem("userID", response.data.id);
                    await AsyncStorage.setItem("type", response.data.type);
                    await AsyncStorage.setItem('accessibilityLvl', response.data.accessibilityLvl.toString());
                    navigation.navigate('Home')
                })
                .catch(function (error: { response: { data: { msg: React.SetStateAction<string>; }; }; }) {
                    setErrorMessage(error.response.data.msg)
                });
        } else {
            setErrorMessage("Missing fields! Fill them all in!")
        }

    }

    const navigationRegister = () => {
        navigation.navigate('Register')
    }

    const navigationForgotPassword = () => {
        navigation.navigate('ChangePassword')
    }

    return (
        <View style={styles.container}>
            <View id='Header' style={styles.pageHeader}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.headerText}>{t('Sign in to access your account')}</Text>
            </View>
            <View id="Form" style={[styles.form]}>
                <View style={styles.visible}>
                    <TextInput
                        style={[styles.input, focusedInput === 'email' && styles.focusedInput]}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                        placeholderTextColor="gray"
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                    />
                    <TextInput
                        style={[styles.input, focusedInput === 'password' && styles.focusedInput]}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor="gray"
                        secureTextEntry={true}
                        onFocus={() => handleFocus('password')}
                        onBlur={handleBlur}
                    />
                    <TouchableOpacity style={styles.forgotPassword} onPress={navigationForgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                    </TouchableOpacity>
                    <Text style={errorMessagePassword !== "" ? styles.errorMessage : styles.errorMessageDisable}>{errorMessagePassword}</Text>
                    <Text style={errorMessage !== "" ? styles.errorMessage : styles.errorMessageDisable}>{errorMessage}</Text>
                    <TouchableOpacity style={styles.signInButton} onPress={login}>
                        <Text style={styles.signInButtonText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.link} onPress={navigationRegister}>
                        <Text style={styles.linkText}>{t('Create new account')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageHeader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 58,
        height: 36
    },
    title: {
        color: "#9a1924",
        fontSize: 30,
        fontWeight: 'bold',
    },
    headerText: {
        color: "black",
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    form: {
        flex: 2,
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fcf0e8',
        color: "black"
    },
    focusedInput: {
        borderColor: '#9a1924', // Change border color when input is focused
    },
    visible: {
        display: 'inline-block',
    },
    signInButton: {
        marginTop: "5%",
        backgroundColor: '#9a1924',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 5,

    },
    signInButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    errorMessage: {
        fontSize: 12,
        color: "red",
        opacity: 0.75,
        fontWeight: "bold",
        display: "block",
        textAlign: "center",
        marginBottom: 10
    },
    errorMessageDisable: {
        display: "none"
    },
    link: {
        marginTop: "15%"
    },
    linkText: {
        color: "black",
        textAlign: "center",
        fontSize: 16,
        fontStyle: "italic",
        textDecorationLine: 'underline',
    },
    forgotPassword: {
        marginTop: -10,
    },
    forgotPasswordText: {
        color: "black",
        textAlign: "right",
        fontSize: 13,
        fontStyle: "italic",
        textDecorationLine: 'underline',
    }

});

export default Login;
