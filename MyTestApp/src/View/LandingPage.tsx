import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import './utils/i18n.js'
import { useTranslation } from 'react-i18next';

const LandingPage = ({ navigation }: { navigation: any }) => {
    const { t, i18n } = useTranslation();
    return (
        <View style={styles.container}>
            <View id='ImageHolder' style={styles.imageHolder}>
                <Image style={styles.schoolLogo}
                    source={require('./images/pngegg.png')}></Image>
            </View>
            <View id='BtnContainer' style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.btnLabelRegister}>{t('Register')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.btnLabelLogin}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9a1924',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageHolder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    schoolLogo: {
        width: 200,
        height: 200,
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "25%"
    },
    btnRegister: {
        backgroundColor: '#E89865',
        width: "40%",
        height: 50,
        padding: 10,
        margin: 5,
        borderRadius: 5,
        justifyContent: 'center', // centraliza o texto verticalmente
    },
    btnLabelRegister: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center', // centraliza o texto horizontalmente
    },
    btnLogin: {
        backgroundColor: 'white',
        width: "40%",
        height: 50,
        padding: 10,
        margin: 5,
        borderRadius: 5,
        justifyContent: 'center', // centraliza o texto verticalmente
    },
    btnLabelLogin: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center', // centraliza o texto horizontalmente
    }
})

export default LandingPage;
