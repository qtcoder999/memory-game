import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import GameActions from '../../Redux/GameRedux';
// Styles
import styles from '../Styles/LaunchScreenStyles';
import {renderCards} from './Utils';
import {findIndexInArrayOfObjects} from '../../Lib/CommonUtils';

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
    const {
      cards,
      createCurrentCard,
      decrementChances,
      renewChances,
      chancesPending,
      clearCurrentCard,
    } = this.props;

    console.log('props in cardlist', this.props);

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          {renderCards(
            cards,
            createCurrentCard,
            decrementChances,
            renewChances,
            chancesPending,
            clearCurrentCard,
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({
  game: {
    cards,
    currentCard,
    gameConfig: {chancesPending},
  },
}) => {
  return {
    cards,
    currentCard,
    chancesPending,
  };
};

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(GameActions.startGame()),
  createCurrentCard: card => dispatch(GameActions.createCurrentCard(card)),
  increaseLevel: () => dispatch(GameActions.increaseLevel()),
  decrementChances: () => dispatch(GameActions.decrementChances()),
  renewChances: () => dispatch(GameActions.renewChances()),
  clearCurrentCard: () => dispatch(GameActions.clearCurrentCard()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList);
