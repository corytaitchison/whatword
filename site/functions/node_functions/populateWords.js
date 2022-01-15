// https://stackoverflow.com/questions/60555467/firebase-one-time-functions
// https://googleapis.dev/nodejs/firestore/latest/
// https://cloud.google.com/sdk/docs/quickstart

const wordList = require("./wordList").wordList;

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

for (let i = 0; i < wordList.length; i++) {
    db.collection("words")
        .doc(`${i}`)
        .set({
            id: i,
            word: wordList[i],
            views: 0,
            ratings: [],
            history: [],
        })
        .then(() => {})
        .catch((e) => console.log(e));
}
