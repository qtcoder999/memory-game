import React, {Component} from 'react';
import {ScrollView, Text, Image, View} from 'react-native';
import {connect} from 'react-redux';
import GameActions from '../../Redux/GameRedux';
// Styles
import styles from '../Styles/LaunchScreenStyles';
import {renderCards} from './utils';
import {findIndexInArrayOfObjects} from '../../Lib/commonUtils';

class CardList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {startGame} = this.props;
    startGame();
  }

  componentDidUpdate() {
    const {cards, increaseLevel, startGame} = this.props;

    // if no card left, increase level
    if (
      cards.length > 0 &&
      findIndexInArrayOfObjects(cards, 'status', 'closed') === -1
    ) {
      increaseLevel();
      startGame();
    }
  }

  render() {
    const {cards, createCurrentCard} = this.props;

    console.log('props in cardlist', this.props);

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          {renderCards(cards, createCurrentCard)}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({game: {cards, currentCard}}) => {
  return {
    cards,
    currentCard,
  };
};

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(GameActions.startGame()),
  createCurrentCard: card => dispatch(GameActions.createCurrentCard(card)),
  increaseLevel: () => dispatch(GameActions.increaseLevel()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList);
