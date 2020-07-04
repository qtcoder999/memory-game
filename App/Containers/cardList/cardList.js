import React, {Component} from 'react';
import {ScrollView, Text, Image, View} from 'react-native';
import {connect} from 'react-redux';
import GameActions from '../../Redux/GameRedux';
// Styles
import styles from '../Styles/LaunchScreenStyles';
import {renderCards} from './utils';

class CardList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {startGame} = this.props;
    console.log('props in Carlist component', this.props);
    startGame();
  }

  render() {
    const {cards} = this.props;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>{renderCards(cards)}</ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({game: {cards, currentCard, gameConfig}}) => {
  return {
    cards,
    currentCard,
  };
};

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(GameActions.startGame()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList);
