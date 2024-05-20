import React from 'react';
import { ScrollView, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import './utils/i18n.js'
import { useTranslation } from 'react-i18next';

const FAQPage = ({navigation}: {navigation: any}) => {
    const { t } = useTranslation();

    return (
        <View style={{ flex: 1, backgroundColor: 'black'}}>
            <View id='Header' style={styles.pageHeader}>
                <Text style={styles.headerLabelsLeft} onPress={() => navigation.goBack()}>{t('Back')}</Text>
                <Text style={styles.headerLabelsRight} onPress={() => navigation.navigate('Feedback')}>Feedback</Text> 
                <Text style={styles.headerLabelsRight}>Logout</Text>
            </View>
            <ScrollView id='FAQContent' style={styles.faqContent}>
                {/* Add your FAQ items here */}
                <View style={styles.faqItem}>
                    <Text style={styles.faqQuestion}>{t('FAQ_Question_1')}</Text>
                    <Text style={styles.faqAnswer}>{t('FAQ_Answer_1')}</Text>
                </View>
                <View style={styles.faqItem}>
                    <Text style={styles.faqQuestion}>{t('FAQ_Question_2')}</Text>
                    <Text style={styles.faqAnswer}>{t('FAQ_Answer_2')}</Text>
                </View>
                <View style={styles.faqItem}>
                    <Text style={styles.faqQuestion}>{t('FAQ_Question_3')}</Text>
                    <Text style={styles.faqAnswer}>{t('FAQ_Answer_3')}</Text>
                </View>
                <View style={styles.faqItem}>
                    <Text style={styles.faqQuestion}>{t('FAQ_Question_4')}</Text>
                    <Text style={styles.faqAnswer}>{t('FAQ_Answer_4')}</Text>
                </View>
                {/* Repeat for more FAQ items */}
            </ScrollView>
            <View id='ImageHolder' style={styles.imageHolder}>
                <Image style={styles.schoolLogo} 
                    source={require('./images/pngegg.png')}></Image>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    faqContent: {
        flex: 3,
        paddingTop: 20,
    },
    faqItem: {
        marginBottom: 20,
        paddingHorizontal: 18,
    },
    faqQuestion: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    faqAnswer: {
        color: '#FFFFFF',
    },pageHeader:{
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

export default FAQPage;
