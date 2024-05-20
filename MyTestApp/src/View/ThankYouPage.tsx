import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import './utils/i18n.js'
import { useTranslation } from 'react-i18next';

const ThankYouPage = ({ navigation }: { navigation: any }) => {
    const { t, i18n } = useTranslation();
    return (
        <View style={styles.container}>
            <Text style={styles.thankYouText}>{t('Thank You!')}</Text>
            <Text style={styles.feedbackText}>{t('Your feedback is greatly appreciated.')}</Text>
            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate('Home')}>
                <Text style={styles.homeButtonText}>{t('Go to Home')}</Text>
            </TouchableOpacity>
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
    thankYouText: {
        color: '#9a1924',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    feedbackText: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 30,
    },
    homeButton: {
        backgroundColor: '#9a1924',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 5,
    },
    homeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default ThankYouPage;
