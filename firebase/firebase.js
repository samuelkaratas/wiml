import * as firebase from "firebase";

import {
  addUser,
  setUsers,
  setGameStarted,
  setNumberOfPeopleAnswered,
  setUserId,
} from "../redux/game-actions";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD5ENR5XKI01zLSuoAFvEw8A_9jKLG0Xh4",
  authDomain: "wiml-5626d.firebaseapp.com",
  databaseURL: "https://wiml-5626d-default-rtdb.firebaseio.com",
  projectId: "wiml-5626d",
  storageBucket: "wiml-5626d.appspot.com",
  messagingSenderId: "936378370479",
  appId: "1:936378370479:web:795c02de652eeaced9875a",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const createParty = (partyId, userInfo) => {
  firebase
    .database()
    .ref("parties/" + partyId)
    .set({
      id: partyId,
      users: userInfo,
      started: false,
      numberOfPeopleAnswered: 0,
      showLeaderboard: false
    });
};

export const joinParty = (partyId, userInfo) => {
  return function (dispatch) {
    const key = firebase
      .database()
      .ref("parties/" + partyId + "/users")
      .push(userInfo)
      .getKey();

    dispatch(setUserId(key));
  };
};

export const setupJoinedListener = (partyId) => {
  return function (dispatch) {
    const ref = firebase.database().ref("parties/" + partyId + "/users");

    ref.on(
      "child_added",
      (data) => {
        console.log("child is added!!");
        console.log(data.val().name);

        var item = data.val();
        item.key = data.key;

        setupStartedListener(partyId)(dispatch);
        dispatch(addUser(item));
      },
      function (error) {
        console.log(error);
      }
    );
  };
};

export const detachJoinedListener = (partyId) => {
  firebase
    .database()
    .ref("parties/" + partyId + "/users")
    .off();
};

const setupStartedListener = (partyId) => {
  return function (dispatch) {
    firebase
      .database()
      .ref("parties/" + partyId + "/started")
      .on(
        "value",
        (snapshot) => {
          if (snapshot.val()) {
            console.log("Game has started");
            dispatch(setGameStarted(true));
          }
        },
        function (error) {
          console.log(error);
        }
      );
  };
};

export const updateStarted = (partyId, started) => {
  firebase
    .database()
    .ref("parties/" + partyId)
    .update({ started: started });
};

export const detachStartedListener = (partyId) => {
  firebase
    .database()
    .ref("parties/" + partyId + "/started")
    .off();
};

export const updateNumberOfPeopleAnswered = async (partyId, selectedUserId) => {
  const ref = firebase
    .database()
    .ref("parties/" + partyId + "/numberOfPeopleAnswered");

  const ref2 = firebase
    .database()
    .ref("parties/" + partyId + "/users/" + selectedUserId + "/score");

  await ref2.transaction(function (current_value) {
    return (current_value || 0) + 1;
  });

  await ref.transaction(function (current_value) {
    return (current_value || 0) + 1;
  });
};

export const setupAnsweredListener = (partyId) => {
  return function (dispatch) {
    firebase
      .database()
      .ref("parties/" + partyId + "/numberOfPeopleAnswered")
      .on(
        "value",
        (snapshot) => {
          //console.log(snapshot.val())
          dispatch(setNumberOfPeopleAnswered(snapshot.val()));
        },
        function (error) {
          console.log(error);
        }
      );
  };
};

export const detachAnsweredListener = (partyId) => {
  firebase
    .database()
    .ref("parties/" + partyId + "/numberOfPeopleAnswered")
    .off();
};

export const updateUsers = (partyId) => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref("parties/" + partyId + "/users");

      ref.once(
        "value",
        (snapshot) => {
          var returnArray = [];

          snapshot.forEach(function (snap) {
            var item = snap.val();
            item.key = snap.key;

            returnArray.push(item);
          });

          //dispatch(setUsers(returnArray));
          resolve(returnArray);
        },
        function (error) {
          console.log(error);
          reject(false);
        }
      );
    });
  };
};

export const resetNumberOfAnswered = (partyId) => {
  firebase
    .database()
    .ref("parties/" + partyId)
    .update({
      numberOfPeopleAnswered: 0,
    });
};

export const resetScore = (partyId, userId) => {
  firebase
    .database()
    .ref("parties/" + partyId + '/users/' + userId)
    .update({
      score: 0,
    });
};

//showLeaderboard
export const setupAnsweredListener = (partyId) => {
  return function (dispatch) {
    firebase
      .database()
      .ref("parties/" + partyId + "/numberOfPeopleAnswered")
      .on(
        "value",
        (snapshot) => {
          //console.log(snapshot.val())
          dispatch(setNumberOfPeopleAnswered(snapshot.val()));
        },
        function (error) {
          console.log(error);
        }
      );
  };
};