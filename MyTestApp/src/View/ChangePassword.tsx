import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import api from "../api/index.js";

const ChangePassword = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");

    const handleFocus = (inputName: string) => {
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

    const changePassword = async () => {
        if (name == '' || email == '' || password == '' || confirmPassword == '') {
            setErrorMessage("Missing fields! Fill them all in!")
        } else {
            setErrorMessage("")
            if (confPassword()) {
                setErrorMessagePassword("");

                try {
                    const response = await api.patch(`/users?email=${email}`, {
                        name: name,
                        password: password,
                    });
                    console.log('Deu!');
                    navigation.navigate('Login');
                } catch (error) {
                    if (error.response && error.response.data && error.response.data.msg) {
                        setErrorMessage(error.response.data.msg);
                    } else {
                        setErrorMessage("An unexpected error occurred.");
                    }
                }
            } else {
                setErrorMessagePassword("The passwords are not the same!!");
            }

        }
    }

    return (
        <View style={styles.container}>
            <View id='Header' style={styles.pageHeader}>
                <Text style={styles.title}>Change Password</Text>
                <Text style={styles.headerText}>Here you can recover your password!</Text>
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
                        placeholder="New Password"
                        placeholderTextColor="gray"
                        secureTextEntry={true}
                        onFocus={() => handleFocus('password')}
                        onBlur={handleBlur}
                    />
                    <TextInput
                        style={[styles.input, focusedInput === 'confirmPassword' && styles.focusedInput]}
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        placeholder="Confirm New Password"
                        placeholderTextColor="gray"
                        secureTextEntry={true}
                        onFocus={() => handleFocus('confirmPassword')}
                        onBlur={handleBlur}
                    />
                    <Text style={errorMessagePassword !== "" ? styles.errorMessage : styles.errorMessageDisable}>{errorMessagePassword}</Text>
                    <Text style={errorMessage !== "" ? styles.errorMessage : styles.errorMessageDisable}>{errorMessage}</Text>
                    <TouchableOpacity style={styles.signUpButton} onPress={changePassword}>
                        <Text style={styles.signUpButtonText}>Change Password</Text>
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
        display: "flex",
        textAlign: "center",
        marginBottom: 10
    },
    errorMessageDisable: {
        display: "none"
    },
});

export default ChangePassword;
