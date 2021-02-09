export const SET_PARTYID = "SET_PARTYID";
export const SET_USERID = "SET_USERID";
export const ADD_USER = "ADD_USER";
export const SET_USERS = "SET_USERS";
export const RESET_USERS = "RESET_USERS";
export const SET_ISADMIN = "SET_ISADMIN";
export const SET_GAME_STARTED = "SET_GAME_STARTED";
export const SET_NUMBER_OF_PEOPLE_ANSWERED = "SET_NUMBER_OF_PEOPLE_ANSWERED";

export const setPartyIdRedux = (id) => ({
  type: SET_PARTYID,
  payload: id,
});

export const setUserId = (id) => ({
  type: SET_USERID,
  payload: id,
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const resetUsers = () => ({
  type: RESET_USERS,
});

export const setIsAdmin = (admin) => ({
  type: SET_ISADMIN,
  payload: admin,
});

export const setGameStarted = (started) => ({
  type: SET_GAME_STARTED,
  payload: started,
});

export const setNumberOfPeopleAnswered = (value) => ({
  type: SET_NUMBER_OF_PEOPLE_ANSWERED,
  payload: value,
});
