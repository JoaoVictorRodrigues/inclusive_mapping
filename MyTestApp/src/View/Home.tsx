import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import './utils/i18n.js'
import { useTranslation } from 'react-i18next';

const HomePage = ({navigation}: {navigation: any}) => {
    const { t, i18n } = useTranslation();
    const changevalue = () => {
        const newLang = i18n.language === 'en' ? 'pt' : 'en';
        i18n.changeLanguage(newLang);
        console.log(i18n.language);
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'black'}}>
            <View id='Header' style={styles.pageHeader}>
                <Text style={styles.headerLabelsLeft}>{t('Back')}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('FAQs')}>
                    <Text style={styles.headerLabelsRight}>'FAQs'</Text>
                </TouchableOpacity>
                <Text style={styles.headerLabelsRight} onPress={() => navigation.navigate('Feedback')}>Feedback</Text> 
                <Text style={styles.headerLabelsRight}>Logout</Text>
                <TouchableOpacity onPress={changevalue}>
                    <Text style={styles.headerLabelsRight}>{i18n.language === 'en' ? 'PT' : 'EN'}</Text>
                </TouchableOpacity>
            </View>
            <View id='ImageHolder' style={styles.imageHolder}>
                <Image style={styles.schoolLogo} 
                    source={require('./images/pngegg.png')}></Image>
            </View>
            <View id='BtnContainer' 
                  style={styles.btnContainer}>
                    <View style={styles.whiteRect}>
                        <TouchableOpacity style={styles.btnOrange} onPress={() => navigation.navigate("Map")}>
                            <Text style={styles.btnLabelOrange}>{t('Map')}</Text>    
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnOrange} onPress={() => navigation.navigate("ViewEntries")}>
                            <Text style={styles.btnLabelOrange}>{t('View Entries')}</Text>    
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnGray}>
                            <Text style={styles.btnLabelGray}>{t('Virtual Diary')}</Text>    
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnOrange} onPress={() => navigation.navigate("Profile")}>
                            <Text style={styles.btnLabelOrange}>{t('Profile')}</Text>    
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