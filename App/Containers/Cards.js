import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Styles
import styles from './Styles/LaunchScreenStyles';
import {CHANCES_GIVEN} from '../Lib/CommonConstants';
import {isEmptyObject} from '../Lib/CommonUtils';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {isUnderCardTransition: false};
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

    console.log(
      'event fired',
      'isUnderCardTransition',
      isUnderCardTransition,
      'isUnderLevelTransition',
      isUnderLevelTransition,
    );

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
          }, 1);
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

    console.log('render isUnderCardTransition', isUnderCardTransition);
    console.log('render isUnderLevelTransition', isUnderLevelTransition);

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text
            style={styles.sectionText}
            onPress={
              !isUnderCardTransition && !isUnderLevelTransition
                ? this.clickHandler({id, value, status})
                : null
            }>
            Card {value} : {status}
          </Text>
        </ScrollView>
      </View>
    );
  }
}
