import {StyleSheet} from 'react-native';
import {Metrics, ApplicationStyles} from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    flexGrow: 1,
    marginTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
  },
  centered: {
    alignItems: 'center',
  },
});
