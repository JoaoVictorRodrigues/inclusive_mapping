import React from 'react';
import {Text, View} from 'react-native';

const HomePage = () => {
    return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={{
                flex: 1, 
                //justifyContent: 'flex-start',
            /*alignItems: 'flex-start'*/}}>
                    <Text style={{alignSelf: 'flex-start'}}>Back</Text>
                    <Text style={{alignSelf: 'flex-end'}}>Logout</Text> </View>
        </View>
    );
};