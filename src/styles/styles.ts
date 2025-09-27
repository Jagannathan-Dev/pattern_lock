import { StyleSheet } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  timeTxt: {
    color: colors.white,
    fontSize: 50,
    fontFamily: fonts.N_Regular,
  },
  imgIcon: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
  imgIconView: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 100,
  },
  buttonView: {
    backgroundColor: '#80e5ff',
    padding: 10,
    borderRadius: 5,
  },
});
