import Colors from '../../Themes/Colors';
import {Dimensions} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);

const CardListStyles = {
  cardList: {
    display: 'flex',
    flex: 1,
    flexGrow: 1,
    width: screenWidth - 10,
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 10,
  },
  card: {
    display: 'flex',
    borderRadius: 7,
    marginVertical: 8,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  cardClosed: {
    backgroundColor: Colors.green,
  },
  cardOpen: {
    backgroundColor: Colors.snow,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
  },
  cardText: {
    textAlign: 'center',
    fontSize: 16,
  },
};

export default CardListStyles;
