import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomePage = ({navigation}: {navigation: any}) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'black'}}>
            <View id='Header' style={styles.pageHeader}>
                <Text style={styles.headerLabelsLeft}>Back</Text>
                <Text style={styles.headerLabelsRight}>Logout</Text> 
            </View>
            <View id='ImageHolder' style={styles.imageHolder}>
                <Image style={styles.schoolLogo} 
                    source={require('./images/pngegg.png')}></Image>
            </View>
            <View id='BtnContainer' 
                  style={styles.btnContainer}>
                    <View style={styles.whiteRect}>
                        <TouchableOpacity style={styles.btnOrange}>
                            <Text style={styles.btnLabelOrange}>Map</Text>    
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnGray}>
                            <Text style={styles.btnLabelGray}>Virtual Diary</Text>    
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnOrange} onPress={() => navigation.navigate("Profile")}>
                            <Text style={styles.btnLabelOrange}>Profile</Text>    
                        </TouchableOpacity>      
                    </View> 
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pageHeader:{
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 18,
        marginRight: 14,
        paddingTop: 58,
        height: 36,
    },
    headerLabelsLeft: {
        direction:'ltr', 
        color: '#FFFFFF' 
    },
    headerLabelsRight: {
        direction:'rtl', 
        color: '#FFFFFF' 
    },
    imageHolder: {
        flex: 2,  
        justifyContent: 'center', 
        alignContent: 'center'
    },
    schoolLogo:{
        height: 318, 
        width: 318, 
        alignSelf: 'center'
    },
    btnContainer:{
        flex: 3,  
        alignItems: 'center',
        justifyContent: 'center'
    },
    whiteRect: {
        width: 333, 
        height: 250, 
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 10
    },
    btnOrange:{
        backgroundColor: '#B43920',
        borderRadius: 4,
        width: 301.93,
        height: 49.31,  
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnLabelOrange:{
        color: '#FFFFFF'
    },
    btnGray:{
        backgroundColor: '#E6E6E6',
        borderRadius: 4,
        width: 301.93,
        height: 49.31,  
        alignItems: 'center',
        justifyContent: 'center'        
    },
    btnLabelGray:{
        color: '#000000'
    }
})

export default HomePage