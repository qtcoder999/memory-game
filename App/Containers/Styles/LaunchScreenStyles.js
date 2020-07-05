import {StyleSheet} from 'react-native';
import {Metrics, ApplicationStyles, Fonts, Colors} from '../../Themes/';
import {Dimensions} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    flexGrow: 1,
    marginTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
  },
  centered: {
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 0,
  },
  heading: {
    textAlign: 'center',
    alignItems: 'center',
  },
  subHeading: {
    width: (screenWidth - 10) / 2,
    textAlign: 'center',
    alignItems: 'center',
  },
  timeLeftText: {
    width: screenWidth - 10,
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: Fonts.type.bold,
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: 16,
  },
  timeLeftValue: {
    width: screenWidth - 10,
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: Fonts.type.bold,
    fontWeight: 'bold',
    color: Colors.red,
    fontSize: 16,
    marginBottom: 20,
  },
});
