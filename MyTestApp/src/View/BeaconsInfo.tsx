import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";
import './utils/i18n.js'
import { useTranslation } from 'react-i18next';

const BeaconsInfo = ({ navigation }: { navigation: any }, { route }: { route: any }) => {
    const { beaconInfo } = route.params;
    const { t, i18n } = useTranslation();

    const back = () => {
        navigation.navigate('Map');
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity style={styles.BackBtn} onPress={back}>
                    <Text style={styles.BackBtnText}>{t('Back')}</Text>
                </TouchableOpacity>
                <Text style={styles.beaconName}>{beaconInfo.name}</Text>
                <Image
                    source={{ uri: beaconInfo.image }}
                    style={styles.image} // Usando estilo definido
                    resizeMode="contain"
                />
                <Text style={styles.beaconInfo}>
                    {beaconInfo.description}
                </Text>
            </View>
            <TouchableOpacity style={styles.GoBtn} onPress={() => { onPressGoTo(); back(); }} disabled={true}>
                <Text style={styles.GoBtnText}>{t('GO TO')}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    beaconName: {
        fontSize: 30,
        marginTop: 45,
        marginBottom: 10,
        color: "black",
    },
    beaconInfo: {
        margin: 10,
        color: "black",
    },
    BackBtn: {
        position: "absolute",
        top: 20,
        left: 15,
        backgroundColor: '#9a1924',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    BackBtnText: {
        color: "white",
    },
    GoBtn: {
        backgroundColor: '#9a1924',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginBottom: 20,
        opacity: 0.5
    },
    GoBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    image: {
        width: "100%",
        height: 250, // Ajuste o tamanho conforme necessário
    },
});

export default BeaconsInfo;
