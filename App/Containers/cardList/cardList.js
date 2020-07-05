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
    this.state = {isUnderLevelTransition: false};
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
    } = this.props;

    console.log('isUnderLevelTransition', isUnderLevelTransition);
    // if no card is left, increase level
    if (
      cards.length > 0 &&
      findIndexInArrayOfObjects(cards, 'status', 'closed') === -1 &&
      !isUnderLevelTransition
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      setIsUnderLevelTransition({value: true});
      setTimeout(() => {
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
    } = this.props;

    console.log('props in card list ', this.props);

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
            currentCard,
            changeStatusToClosed,
            changeStatusToOpen,
            isUnderLevelTransition,
            isUnderCardTransition,
            setIsUnderCardTransition,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList);
