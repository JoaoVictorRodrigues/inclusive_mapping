import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/index.js";

const Register = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accessibility, setAccessibility] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");

    const handleFocus = (inputName) => {
        setFocusedInput(inputName);
    };

    const handleBlur = () => {
        setFocusedInput(null);
    };

    const confPassword = () => {
        if (password === confirmPassword) {
            return true;
        } else {
            return false;
        }
    }

    const login = async () => {
        await api.post(`/users/login`, {
            email: email,
            password: password,
        })
            .then(async function (response: { data: { accessToken: any; id: any; type: any; }; }) {
                console.log(response.data);

                await AsyncStorage.setItem("token", response.data.accessToken);
                await AsyncStorage.setItem("userID", response.data.id);
                await AsyncStorage.setItem("type", response.data.type);
                navigation.navigate('Home')
            })
            .catch(function (error: { response: { data: { msg: React.SetStateAction<string>; }; }; }) {
                setErrorMessage(error.response.data.msg)
            });
    }

    const register = async () => {
        if (name == '' || email == '' || password == '' || accessibility == '' || confirmPassword == '') {
            setErrorMessage("Missing fields! Fill them all in!")
        } else {
            setErrorMessage("")
            if (confPassword()) {
                setErrorMessagePassword("")
                await api.post(`/users/register`, {
                    name: name,
                    email: email,
                    password: password,
                    AccessibilityLvl: accessibility
                })
                    .then(async function (response: { data: any; }) {
                        console.log(response.data);
                        login()
                    })
                    .catch(function (error: { response: { data: { msg: React.SetStateAction<string>; }; }; }) {
                        setErrorMessage(error.response.data.msg)
                    });
            } else {
                setErrorMessagePassword("The passwords are not the same!!");
            }
        }
    }

    const navigationLogin = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <View id='Header' style={styles.pageHeader}>
                <Text style={styles.title}>Create account</Text>
                <Text style={styles.headerText}>Join us! Create your account for exclusive benefits tailored to you</Text>
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
                        style={[styles.input, focusedInput === 'name' && styles.focusedInput]}
                        onChangeText={setName}
                        value={name}
                        placeholder="User Name"
                        placeholderTextColor="gray"
                        onFocus={() => handleFocus('name')}
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
                    <TextInput
                        style={[styles.input, focusedInput === 'confirmPassword' && styles.focusedInput]}
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        placeholderTextColor="gray"
                        secureTextEntry={true}
                        onFocus={() => handleFocus('confirmPassword')}
                        onBlur={handleBlur}
                    />
                    <Text style={errorMessagePassword !== "" ? styles.errorMessage : styles.errorMessageDisable}>{errorMessagePassword}</Text>
                    <Picker
                        selectedValue={accessibility}
                        style={[styles.input, focusedInput === 'accessibility' && styles.focusedInput]}
                        onValueChange={(itemValue) => setAccessibility(itemValue)}
                        dropdownIconColor="#9a1924"
                    >
                        <Picker.Item label="Select Accessibility" value="" enabled={false} />
                        <Picker.Item label="No disability" value="0" />
                        <Picker.Item label="Visual disability" value="1" />
                        <Picker.Item label="Motor disability" value="2" />
                    </Picker>
                    <Text style={errorMessage !== "" ? styles.errorMessage : styles.errorMessageDisable}>{errorMessage}</Text>
                    <TouchableOpacity style={styles.signUpButton} onPress={register}>
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.link} onPress={navigationLogin}>
                        <Text style={styles.linkText}>Already have an account?</Text>
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
    signUpButton: {
        marginTop: "5%",
        backgroundColor: '#9a1924',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 5,

    },
    signUpButtonText: {
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
        marginTop: "5%"
    },
    linkText: {
        color: "black",
        textAlign: "center",
        fontSize: 16,
        fontStyle: "italic",
        textDecorationLine: 'underline',
    }
});

export default Register;
