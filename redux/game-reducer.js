import { REMOVE_USER, SET_PARTYID } from "./game-actions";
import { SET_USERID } from "./game-actions";
import { ADD_USER } from "./game-actions";
import { SET_USERS } from "./game-actions";
import { RESET_USERS } from "./game-actions";
import { SET_ISADMIN } from "./game-actions";
import { SET_GAME_STARTED } from "./game-actions";
import { SET_NUMBER_OF_PEOPLE_ANSWERED } from "./game-actions";
import { SET_SHOW_LEADERBOARD } from "./game-actions";
import { SET_QUESTION_NUMBER } from "./game-actions";
import { SET_CREATING_PARTY } from "./game-actions";

const INITIAL_STATE = {
  partyId: null,
  userId: 0,
  users: [],
  isAdmin: null,
  started: false,
  numberOfPeopleAnswered: 0,
  showLeaderboard: false,
  questionNumber: 0,
  creatingParty: false,
};

export const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PARTYID:
      return {
        ...state,
        partyId: action.payload,
      };
    case SET_USERID:
      return {
        ...state,
        userId: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case REMOVE_USER:
      const filteredUsers = state.users.filter(
        (user) => user.key !== action.payload.key
      );
      console.log(filteredUsers);
      return {
        ...state,
        users: filteredUsers,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case RESET_USERS:
      return {
        ...state,
        users: [],
      };
    case SET_ISADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };
    case SET_GAME_STARTED:
      return {
        ...state,
        started: action.payload,
      };
    case SET_NUMBER_OF_PEOPLE_ANSWERED:
      return {
        ...state,
        numberOfPeopleAnswered: action.payload,
      };
    case SET_SHOW_LEADERBOARD:
      return {
        ...state,
        showLeaderboard: action.payload,
      };
    case SET_QUESTION_NUMBER:
      return {
        ...state,
        questionNumber: action.payload,
      };
    case SET_CREATING_PARTY:
      return {
        ...state,
        creatingParty: action.payload,
      };
    default:
      return state;
  }
};
