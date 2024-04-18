import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

//Html
const ProfilePage = ({navigation}: {navigation: any}) => {
    return (
        <View style={styles.page}>
            <View style={styles.pageHeader}>
                <Text style={styles.headerLabels} onPress={() => navigation.navigate("Home")}>Back</Text>
                <Text style={styles.pageName}>Profile</Text>
                <Text style={styles.headerLabels}>logout</Text>
            </View>
            <View style={styles.imageContainer}>
                <View style={styles.icon}>
                    <Image source={require('./images/img_01.png')} style={styles.profilePic}></Image>
                </View>
            </View>
            <View style={styles.pageBody}>
                <View style={styles.inputFieldContainer}>
                    <View style={styles.inputField}>
                      <Image id='userImg' source={require('./images/profile-user.png')} style={styles.imgIcon}></Image>
                      <View style={{alignItems: 'flex-start', flexDirection: 'column'}}>
                        <Text style={styles.inputLabel}>Name</Text>
                        <TextInput id='inputName' value='Name FamilyName' editable={false} selectTextOnFocus={false} style={styles.inputText}></TextInput>
                      </View>
                    </View>
                    <View style={styles.inputField}>
                      <Image source={require('./images/lock.png')} style={styles.imgIcon}></Image>
                      <View style={{alignItems: 'flex-start', flexDirection: 'column'}}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <TextInput id='inputPass' secureTextEntry={true} value='12345678' editable={false} selectTextOnFocus={false} style={styles.inputText}></TextInput>
                      </View>
                    </View>
                    <View style={styles.inputField}>
                      <Image source={require('./images/email.png')} style={styles.imgIcon}></Image>
                      <View style={{alignItems: 'flex-start', flexDirection: 'column'}}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput id='inputEmail' value='Email@email.com' editable={false} selectTextOnFocus={false} style={styles.inputText}></TextInput>
                      </View>
                    </View>
                </View>
                <View style={styles.btnContainer}>
                <TouchableOpacity id='btnChange' style={styles.btnGray}>
                            <Text style={styles.btnLabel}>Change Information</Text>    
                        </TouchableOpacity>
                </View>
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
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 18,
        marginRight: 14,
        paddingTop: 58,
        height: 36,
        zIndex: 2
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
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 3
    },
    icon: {
        backgroundColor: '#FFFFFF',
        width: 158,
        height: 158,
        borderRadius: 79,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePic: {
        width: 156,
        height: 156,
        borderRadius: 78
    },
    pageBody:{
        flex: 3,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        zIndex: 1,
    },
    inputFieldContainer:{
        flex: 3,
        justifyContent: 'space-evenly',
        marginTop: 59,
        rowGap: 15

    },
    imgIcon: {
        marginLeft: 28, 
        marginRight: 9,
        width: 55,
        height: 55
    },
    inputHolder:{
        
    },
    inputField:{
        backgroundColor: '#E6E6E6', 
        flexDirection: 'row',
        alignItems: 'center',
        width: 347, 
        height: 80, 
        borderRadius: 20
    },
    inputLabel:{
        color: '#5B5B5B',
        fontSize: 17,
        marginTop: 16, 
        marginLeft: 4

    },
    inputText:{
        color: '#000000',
        marginBottom: 16,
        fontSize: 20,
        width: 214
    },
    btnContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 65
    },
    btnGray:{
        backgroundColor: '#9A1A24',
        borderRadius: 100,
        width: 343,
        height: 51,  
        alignItems: 'center',
        justifyContent: 'center'        
    },
    btnLabel:{
        color: '#FFFFFF'
    }
})

export default ProfilePage