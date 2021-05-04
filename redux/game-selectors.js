import { createSelector } from "reselect";

const gameSelector = (state) => state.game;

export const selectPartyId = createSelector(
  [gameSelector],
  (game) => game.partyId
);

export const selectUserId = createSelector(
  [gameSelector],
  (game) => game.userId
);

export const selectUsers = createSelector([gameSelector], (game) => game.users);

export const selectIsAdmin = createSelector(
  [gameSelector],
  (game) => game.isAdmin
);

export const selectStarted = createSelector(
  [gameSelector],
  (game) => game.started
);

export const selectNumberOfPeopleAnswered = createSelector(
  [gameSelector],
  (game) => game.numberOfPeopleAnswered
);

export const selectShowLeaderboard = createSelector(
  [gameSelector],
  (game) => game.showLeaderboard
);

export const selectQuestionNumber = createSelector(
  [gameSelector],
  (game) => game.questionNumber
);

export const selectCreatingParty = createSelector(
  [gameSelector],
  (game) => game.creatingParty
);

export const selectEdit = createSelector(
  [gameSelector],
  (game) => game.edit
);