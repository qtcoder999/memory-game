import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';

// Styles
import styles from './Styles/CardListStyles';
import {isEmptyObject} from '../Lib/CommonUtils';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  clickHandler = () => event => {
    const {
      id,
      value: clickedCardValue,
      status,
      createCurrentCard,
      clearCurrentCard,
      currentCard,
      changeStatusToClosed,
      changeStatusToOpen,
      isUnderLevelTransition,
      isUnderCardTransition,
      setIsUnderCardTransition,
    } = this.props;


    if (!isUnderCardTransition && !isUnderLevelTransition) {
      if (isEmptyObject(currentCard)) {
        createCurrentCard({id, value: clickedCardValue, status});
        changeStatusToOpen(id);
      }

      if (!isEmptyObject(currentCard)) {
        if (currentCard.value && currentCard.value !== clickedCardValue) {
          setIsUnderCardTransition({value: true});
          changeStatusToOpen(id);
          setTimeout(() => {
            changeStatusToClosed(id);
            setIsUnderCardTransition({value: false});
          }, 300);
        } else {
          changeStatusToOpen(id);
          clearCurrentCard();
        }
      }
    }
  };

  render() {
    const {
      id,
      value,
      status,
      isUnderCardTransition,
      isUnderLevelTransition,
    } = this.props;

    return (
      <TouchableOpacity
        style={[
          styles.card,
          status === 'open' ? styles.cardOpen : styles.cardClosed,
        ]}
        onPress={
          !isUnderCardTransition && !isUnderLevelTransition
            ? this.clickHandler({id, value, status})
            : null
        }>
        {status === 'open' ? (
          <Text style={styles.cardText}>{value}</Text>
        ) : null}
      </TouchableOpacity>
    );
  }
}
