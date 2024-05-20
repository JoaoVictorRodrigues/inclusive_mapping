import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import './utils/i18n.js'
import { useTranslation } from 'react-i18next';

const ViewEntries = ({ navigation }: { navigation: any }) => {
    const rows = new Array(4).fill('Previous Entry');
    const { t, i18n } = useTranslation();

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={styles.pageHeader}>
                <Text style={styles.headerLabelsLeft} onPress={() => navigation.navigate('Home')}>{t('Back')}</Text> 
            </View>
            <View style={styles.container}>
                {rows.map((row, index) => (
                    <TouchableOpacity key={index} style={styles.row}>
                        <Text style={styles.rowText}>{row}</Text>
                    </TouchableOpacity>
                ))}
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
        paddingTop: 94, // Adjust this value as needed to make room for the header
    },
    pageHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white', // Set the background color to white
        paddingTop: 58,
        height: 94, // Adjust the height to fit the content of your header
        zIndex: 10, // Ensure the header is above other elements
    },
    headerLabelsLeft: {
        marginLeft: 18,
        color: 'black', // Change the color to black for visibility on the white background
    },
    row: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        width: '100%',
        alignItems: 'center',
    },
    rowText: {
        fontSize: 16,
        color: '#AAA7A6', // Light gray color for the text
    },
});

export default ViewEntries;
