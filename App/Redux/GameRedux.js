import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const GAME_DATA = {
  gameConfig: {
    level: 1,
  },
  currentCard: {},
  cards: [],
};

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  resetGame: null,
  startGame: null,
  increaseLevel: null,
});

export const GameTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  ...GAME_DATA,
});

/* ------------- Reducers ------------- */

export const startGame = state => {
  // return state.merge({searching: true, searchTerm, results});
};

export const increaseLevel = state => {
};

export const resetGame = state => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_GAME]: resetGame,
  [Types.START_GAME]: startGame,
  [Types.INCREASE_LEVEL]: increaseLevel,
});
