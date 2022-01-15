import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { types } from "./types";
import wordList from "./wordList";
import wordListLong from "./wordListLong";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();
const db = admin.firestore();

// Create Profile
const createProfile = (
  userRecord: admin.auth.UserRecord,
  context: functions.EventContext
) => {
  const { email, uid, displayName, photoURL } = userRecord;

  return db
    .collection("Users")
    .doc(uid)
    .set({
      uid,
      email,
      displayName,
      photoURL,
      createdAt: admin.firestore.Timestamp.now(),
    })
    .catch(console.error);
};

// Test for Word in Allowed List
const wordIsAllowed = (
  data: types.WordData,
  context: functions.https.CallableContext
): boolean => {
  // if (!context.auth) {
  //   throw new functions.https.HttpsError(
  //     "failed-precondition",
  //     "The user must be authenticated"
  //   );
  // }
  return wordList.includes(data.word);
};

// Test for Word in Allowed List (Long Version)
const wordIsAllowedLong = (
  data: types.WordData,
  context: functions.https.CallableContext
): boolean => {
  // if (!context.auth) {
  //   throw new functions.https.HttpsError(
  //     "failed-precondition",
  //     "The user must be authenticated"
  //   );
  // }
  return wordListLong.includes(data.word);
};

module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
  wordIsAllowed: functions.https.onCall(wordIsAllowed),
  wordIsAllowedLong: functions.https.onCall(wordIsAllowedLong),
};
