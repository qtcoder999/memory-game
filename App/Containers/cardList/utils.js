import React from 'react';
import shortid from 'shortid';
import Card from '../Cards';

export const renderCards = cards => {
  return (
    cards &&
    cards.map(({id, value, status}) => (
      <Card key={id} id={id} value={value} status={status} />
    ))
  );
};

export const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const duplicateElements = arr => {
  return arr.reduce(function(res, current, index, array) {
    return res.concat([current, current]);
  }, []);
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
