import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//Html
const ProfilePage = ({navigation}: {navigation: any}) => {
    return (
        <View style={styles.page}>
            <View style={styles.pageHeader}>
                <Text style={styles.headerLabels} onPress={() => navigation.navigate("Home")}>Back</Text>
                <Text style={styles.pageName}>Profile</Text>
                <Text style={styles.headerLabels}>logout</Text>
            </View>
        </View>
    );
};

//CSS 
const styles = StyleSheet.create({
    page:{
        flex:1,
        backgroundColor: '#9A1A24'
    },
    pageHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 58,
        height: 36
    },
    headerLabels: {
        color: '#FFFFFF',
        fontSize: 16
    },
    pageName: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold'
    },
    imageContainer:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        backgroundColor: '#FFFFFF',
        width: 158,
        height: 158,
        borderRadius: 79
    },
    pageBody:{
        flex: 3,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputFieldContainer:{
        flex: 1,
        backgroundColor: '#E6E6E6'
    },
    btnContainer: {
        flex: 2,
        backgroundColor: '#B43920'
    }
})

export default ProfilePage