import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#9A1A24',
    display: 'flex',
  },
  pageHeader: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 18,
    marginRight: 14,
    paddingTop: 58,
    height: 36,
    zIndex: 1,
  },
  headerLabels: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  pageName: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  first: {
    zIndex: 3,
  },
  second: {
    zIndex: 2,
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
    borderRadius: 78,
  },
  pageBody: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  inputFieldContainer: {
    flex: 3,
    justifyContent: 'space-evenly',
    marginTop: 59,
    rowGap: 15,
  },
  imgIcon: {
    marginLeft: 28,
    marginRight: 9,
    width: 55,
    height: 55,
  },
  inputHolder: {},
  inputField: {
    backgroundColor: '#E6E6E6',
    flexDirection: 'row',
    alignItems: 'center',
    width: 347,
    height: 80,
    borderRadius: 20,
  },
  inputLabel: {
    color: '#5B5B5B',
    fontSize: 17,
    marginTop: 16,
    marginLeft: 4,
  },
  inputText: {
    color: '#000000',
    marginBottom: 16,
    fontSize: 20,
    width: 214,
  },
  btnContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 65,
    flexDirection: 'row',
  },
  btnGray: {
    backgroundColor: '#9A1A24',
    borderRadius: 100,
    width: 343,
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEdit: {
    backgroundColor: '#9A1A24',
    borderRadius: 100,
    width: 171,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnError: {
    backgroundColor: 'red',
    borderRadius: 100,
    width: 343,
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLabel: {
    color: '#FFFFFF',
  },
  errorMessage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorLabel: {
    color: '#000000',
    fontSize: 24,
    marginBottom: 48,
  },
  input: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fcf0e8',
    color: 'black',
  },
  focusedInput: {
    borderColor: '#9a1924', // Change border color when input is focused
  },
});
