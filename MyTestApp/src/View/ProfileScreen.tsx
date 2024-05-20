import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
  _ScrollView,
  Alert,
} from 'react-native';
import {styles} from './css/StylesSheet';
import {KeyboardAvoidingView} from 'react-native';
import api from '../api';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import './utils/i18n.js'
import { useTranslation } from 'react-i18next';

//Html
const ProfilePage = ({navigation}: {navigation: any}) => {
  //Variables
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [userName, setName] = useState('');
  const [postImage, setPostImage] = useState({myFile: ''});
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState('');
  let [edit, setEdit] = useState(false);
  let [focus, setFocus] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  const handleFocus = (inputName: string) => {
    setFocus(true);
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocus(false);
    setFocusedInput(null);
  };

  //Test login
  //Test18@test.pt
  //1234567

  // Get current user information
  const getUser = async () => {
    const userID = await AsyncStorage.getItem('userID');
    const pass = await AsyncStorage.getItem('pass');

    await api
      .get(`/users/${userID}`, {
        headers: {
          Accept: 'aplication/json',
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      })
      .then(async function (response: {data: {user: any}}) {
        setEmail(response.data.user.email);
        setName(response.data.user.name);
        setPassword(pass || '');
        setIsLoading(false);
      })
      .catch(function (error: {
        response: {data: {msg: React.SetStateAction<string>}};
      }) {
        console.error(error.response.data.msg);
        setError('It was not possivel to retrive user information.');
        setIsLoading(false);
      });
  };

  //Image converter
  function convertToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = error => {
        reject(error);
      };
    });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({...postImage, myFile: typeof base64});
  };
  // update loged user information
  const SaveChanges = async () => {
    setIsLoading(true);
    const userID = await AsyncStorage.getItem('userID');

    await api
      .put(
        `/users/${userID}`,
        {
          name: userName,
          email: email,
          password: password,
        },
        {
          headers: {
            Accept: 'aplication/json',
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      )
      .then(res => {
        if (res.status === 200) {
          console.log('Foi a actualisado as informações do utilizador ');
        } else {
          console.error('Something went wrong.');
        }
        setIsLoading(false);
      })
      .catch(function (error: {
        response: {data: {msg: React.SetStateAction<string>}};
      }) {
        console.error(error.response.data.msg);
        setError('It was not possivel to update user information.');
        setIsLoading(false);
      });
  };

  const ChangePage = (page: string) => {
    navigation.navigate(page);
  };

  const ShowButtons = () => {
    setEdit(true);
  };

  const HideButtons = () => {
    setEdit(false);
  };

  const getContent = () => {
    if (userName == '') getUser();

    if (isLoading)
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );

    if (error != '') {
      return (
        <View style={styles.errorMessage}>
          <Text style={styles.errorLabel}>{error}</Text>
          <TouchableOpacity
            id="btnBackError"
            style={styles.btnError}
            onPress={() => ChangePage('Home')}>
            <Text style={styles.btnLabel}>{t('Back')}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.headerLabels} onPress={() => ChangePage('Home')}>
            Back
          </Text>
          <Text style={styles.pageName}>{t('Profile')}</Text>
          <Text style={styles.headerLabels}>Logout</Text>
        </View>
        <View
          style={[
            styles.imageContainer,
            !focus ? styles.first : styles.second,
          ]}>
          <TouchableOpacity
            style={styles.icon}
            disabled={edit}
            onPress={handleSubmit}>
            <Image
              source={
                postImage.myFile != ''
                  ? postImage.myFile
                  : require('./images/profile-user.png')
              }
              style={styles.profilePic}></Image>
          </TouchableOpacity>
        </View>
        <View style={[styles.pageBody, !focus ? styles.second : styles.first]}>
          <KeyboardAwareScrollView>
            <View style={styles.inputFieldContainer}>
              <View style={styles.inputField}>
                <Image
                  id="userImg"
                  source={require('./images/profile-user.png')}
                  style={styles.imgIcon}></Image>
                <View
                  style={{alignItems: 'flex-start', flexDirection: 'column'}}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <TextInput
                    style={[
                      styles.inputText,
                      focusedInput === 'name' && styles.focusedInput,
                    ]}
                    onChangeText={setName}
                    value={userName}
                    editable={edit}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    selectTextOnFocus={false}></TextInput>
                </View>
              </View>
              <View style={styles.inputField}>
                <Image
                  source={require('./images/lock.png')}
                  style={styles.imgIcon}></Image>
                <View
                  style={{alignItems: 'flex-start', flexDirection: 'column'}}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    style={[
                      styles.inputText,
                      focusedInput === 'password' && styles.focusedInput,
                    ]}
                    onChangeText={setPassword}
                    value={password}
                    editable={edit}
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                    secureTextEntry={true}
                    selectTextOnFocus={false}></TextInput>
                </View>
              </View>
              <View style={styles.inputField}>
                <Image
                  source={require('./images/email.png')}
                  style={styles.imgIcon}></Image>
                <View
                  style={{alignItems: 'flex-start', flexDirection: 'column'}}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={[
                      styles.inputText,
                      focusedInput === 'email' && styles.focusedInput,
                    ]}
                    onChangeText={setEmail}
                    value={email}
                    editable={edit}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    selectTextOnFocus={false}></TextInput>
                </View>
              </View>
            </View>
            {!edit ? (
              <View id="btnContainer" style={styles.btnContainer}>
                <TouchableOpacity
                  id="btnChange"
                  style={styles.btnGray}
                  onPress={ShowButtons}>
                  <Text style={styles.btnLabel}>{t('Change Information')}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View id="btnContainer" style={styles.btnContainer}>
                <TouchableOpacity
                  id="btnSave"
                  style={styles.btnEdit}
                  onPress={SaveChanges}>
                  <Text style={styles.btnLabel}>{t('Save')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  id="btnCancel"
                  style={styles.btnEdit}
                  onPress={HideButtons}>
                  <Text style={styles.btnLabel}>{t('Cancel')}</Text>
                </TouchableOpacity>
              </View>
            )}
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  };

  return getContent();
};

export default ProfilePage;
