import {StyleSheet} from 'react-native';
import {Metrics, ApplicationStyles} from '../../Themes/';
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
    marginBottom: 10,
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
});
