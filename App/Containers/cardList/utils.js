import React from 'react';
import shortid from 'shortid';
import Card from '../Cards';
import {duplicateElements, shuffleArray} from '../../Lib/commonUtils';

export const renderCards = (cards, createCurrentCard) => {
  return (
    cards &&
    cards.map(({id, value, status}) => (
      <Card
        clickHandler={createCurrentCard}
        key={id}
        id={id}
        value={value}
        status={status}
      />
    ))
  );
};

export const getTotalNumbers = level => {
  return getTotalCards(level) / 2;
};

export const getTotalCards = level => {
  return level * 2 + 2;
};

export const populateArrayWithNumbers = (totalNumbers, cardList) => {
  for (let j = 1; j <= totalNumbers; j++) {
    cardList.push(j);
  }

  return cardList;
};

export const convertIntoCardListObjects = cardList => {
  let newCardList = [];

  for (let j = 0; j < cardList.length; j++) {
    const randomUniqueId = shortid.generate();
    newCardList.push({
      id: randomUniqueId,
      value: cardList[j],
      status: 'closed',
    });
  }
  return newCardList;
};

export const getCardsArray = level => {
  let cardList = [];
  const totalNumbers = getTotalNumbers(level);

  cardList = populateArrayWithNumbers(totalNumbers, cardList);

  cardList = duplicateElements(cardList);

  cardList = shuffleArray(cardList);

  cardList = convertIntoCardListObjects(cardList);

  return cardList;
};
