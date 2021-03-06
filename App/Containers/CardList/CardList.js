import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import GameActions from '../../Redux/GameRedux';
// Styles
import styles from '../Styles/CardListStyles';
import {renderCards} from './Utils';
import {findIndexInArrayOfObjects} from '../../Lib/CommonUtils';

class CardList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {startGame, resetGame} = this.props;

    resetGame();
    startGame();
  }

  componentDidUpdate() {
    const {
      cards,
      increaseLevel,
      startGame,
      isUnderLevelTransition,
      setIsUnderLevelTransition,
      addScore,
      level,
    } = this.props;

    // if no card is left, increase level
    if (
      cards.length > 0 &&
      findIndexInArrayOfObjects(cards, 'status', 'closed') === -1 &&
      !isUnderLevelTransition
    ) {
      setIsUnderLevelTransition({value: true});
      setTimeout(() => {
        addScore({score: level * 10});
        increaseLevel();
        startGame();
        setIsUnderLevelTransition({value: false});
      }, 1);
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
      currentCard,
      changeStatusToClosed,
      changeStatusToOpen,
      isUnderLevelTransition,
      isUnderCardTransition,
      setIsUnderCardTransition,
      level,
    } = this.props;

    return (
      <View>
        <View style={styles.cardList}>
          {renderCards(
            cards,
            createCurrentCard,
            decrementChances,
            renewChances,
            chancesPending,
            clearCurrentCard,
            currentCard,
            changeStatusToClosed,
            changeStatusToOpen,
            isUnderLevelTransition,
            isUnderCardTransition,
            setIsUnderCardTransition,
            level,
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({
  game: {
    cards,
    currentCard,
    gameConfig: {chancesPending, level},
    isUnderLevelTransition,
    isUnderCardTransition,
  },
}) => {
  return {
    cards,
    currentCard,
    chancesPending,
    isUnderLevelTransition,
    isUnderCardTransition,
    level,
  };
};

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(GameActions.startGame()),
  resetGame: () => dispatch(GameActions.resetGame()),
  createCurrentCard: card => dispatch(GameActions.createCurrentCard(card)),
  increaseLevel: () => dispatch(GameActions.increaseLevel()),
  decrementChances: () => dispatch(GameActions.decrementChances()),
  renewChances: () => dispatch(GameActions.renewChances()),
  clearCurrentCard: () => dispatch(GameActions.clearCurrentCard()),
  changeStatusToClosed: id => dispatch(GameActions.changeStatusToClosed(id)),
  changeStatusToOpen: id => dispatch(GameActions.changeStatusToOpen(id)),
  setIsUnderLevelTransition: ({value}) =>
    dispatch(GameActions.setIsUnderLevelTransition(value)),
  setIsUnderCardTransition: ({value}) =>
    dispatch(GameActions.setIsUnderCardTransition(value)),
  addScore: ({score}) => dispatch(GameActions.addScore(score)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList);
