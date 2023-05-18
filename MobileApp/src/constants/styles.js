import { StyleSheet } from 'react-native';
import { textInput, container, button } from './common.style';
import themeStyle from './theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  stackInContainer: {
    ...container,
  },
  heading: {
    marginTop: 4,
    fontSize: themeStyle.FONT_SIZE_TITLE,
    fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
  },
  text: {
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
  },

  //Login_Screen
  loginHospitalSelect: {
    ...textInput,
  },
  loginPhoneNumberInput: {
    ...textInput,
  },
  loginButton: {
    ...button,
  },

  //PersonInfoScreen
  exitButton: {
    ...button,
    backgroundColor: '#ff0000',
    marginBottom: 20,
  },

});
