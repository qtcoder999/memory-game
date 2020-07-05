import {createReducer, createActions} from 'reduxsauce';
import Immutable, {asMutable} from 'seamless-immutable';
import {getCardsArray} from '../Containers/CardList/Utils';
import {findIndexInArrayOfObjects} from '../Lib/CommonUtils';
import {CHANCES_GIVEN} from '../Lib/CommonConstants';

const GAME_DATA = {
  gameConfig: {
    level: 1,
    chancesPending: CHANCES_GIVEN,
  },
  currentCard: {},
  cards: [],
  isUnderLevelTransition: false,
  isUnderCardTransition: false,
};

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  resetGame: null,
  startGame: null,
  increaseLevel: null,
  createCurrentCard: ['card'],
  renewChances: null,
  decrementChances: null,
  clearCurrentCard: null,
  changeStatusToClosed: ['id'],
  changeStatusToOpen: ['id'],
  setIsUnderLevelTransition: ['value'],
  setIsUnderCardTransition: ['value'],
});

export const GameTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  ...GAME_DATA,
});

/* ------------- Reducers ------------- */

export const resetGame = state => INITIAL_STATE;

export const startGame = (state = INITIAL_STATE) => {
  const {
    gameConfig: {level},
  } = state;

  const cards = getCardsArray(level);

  return state.merge({cards});
};

export const increaseLevel = state => {
  let newState = asMutable({...state}, {deep: true});

  newState.gameConfig.level++;

  return state.merge({
    ...newState,
  });
};

export const createCurrentCard = (state, {card}) => {
  return state.merge({currentCard: card});
};

export const renewChances = state => {
  let newState = asMutable({...state}, {deep: true});

  newState.gameConfig.chancesPending = CHANCES_GIVEN;

  return state.merge({...newState});
};

export const decrementChances = state => {
  let newState = asMutable({...state}, {deep: true});

  newState.gameConfig.chancesPending--;

  return state.merge({...newState});
};

export const clearCurrentCard = state => {
  return state.merge({currentCard: {}});
};

export const changeStatusToClosed = (state, {id}) => {
  let newState = asMutable({...state}, {deep: true});

  const {cards} = newState;

  const foundIndex = findIndexInArrayOfObjects(cards, 'id', id);

  foundIndex > -1 ? (cards[foundIndex].status = 'closed') : null;

  return state.merge({cards});
};

export const changeStatusToOpen = (state, {id}) => {
  let newState = asMutable({...state}, {deep: true});

  const {cards} = newState;

  const foundIndex = findIndexInArrayOfObjects(cards, 'id', id);

  foundIndex > -1 ? (cards[foundIndex].status = 'open') : null;

  return state.merge({cards});
};

export const setIsUnderLevelTransition = (state, {value}) => {
  console.log('reducer IsUnderLevelTransition', value);

  console.log(
    'state after change in reducer',
    state.merge({isUnderLevelTransition: value}),
  );

  return state.merge({isUnderLevelTransition: value});
};

export const setIsUnderCardTransition = (state, {value}) => {
  console.log('reduxStore', state);

  console.log('reducer setIsUnderCardTransition', value);

  console.log(
    'state after change in reducer',
    state.merge({isUnderCardTransition: value}),
  );

  return state.merge({isUnderCardTransition: value});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_GAME]: resetGame,
  [Types.START_GAME]: startGame,
  [Types.INCREASE_LEVEL]: increaseLevel,
  [Types.CREATE_CURRENT_CARD]: createCurrentCard,
  [Types.RENEW_CHANCES]: renewChances,
  [Types.DECREMENT_CHANCES]: decrementChances,
  [Types.CLEAR_CURRENT_CARD]: clearCurrentCard,
  [Types.CHANGE_STATUS_TO_CLOSED]: changeStatusToClosed,
  [Types.CHANGE_STATUS_TO_OPEN]: changeStatusToOpen,
  [Types.SET_IS_UNDER_LEVEL_TRANSITION]: setIsUnderLevelTransition,
  [Types.SET_IS_UNDER_CARD_TRANSITION]: setIsUnderCardTransition,
});
