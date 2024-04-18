import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const Register = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const part = 2

    const handleFocus = (inputName) => {
        setFocusedInput(inputName);
    };

    const handleBlur = () => {
        setFocusedInput(null);
    };

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
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fcf0e8',
    },
    focusedInput: {
        borderColor: '#9a1924', // Change border color when input is focused
    },
    visible:{
        display: 'inline-block',
    }
});

export default Register;
