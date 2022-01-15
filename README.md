# What Word?

Essentially a clone of [Wordle](https://www.powerlanguage.co.uk/wordle/) built using Svelte, Typescript, and Firebase.

-   Note that `site/src/helper/firebase.js` needs to be filled with keys from the Firebase API in order to run

## Set Up

```bash
npm install
```

Running

```bash
npm run dev
```

Building:

```bash
npm run build
```

Deploying

```bash
firebase deploy --only hosting
```

## Tutorial

-   [Fireship](https://fireship.io/lessons/svelte-v3-overview-firebase/)
-   [User Authentication Function](https://bigcodenerd.org/create-user-profile-firestore-authentication/)
-   [Firebase Functions](https://firebase.google.com/docs/functions/callable)

## To Do

-   [x] Keyboard / display showing used letters
-   [x] Make it so that we dont poll the server each time a word is submitted
-   [x] Make logins only required after completing a round
-   [ ] Facebook log in
-   [x] Playlist of past wordle words
-   [x] Share button
-   [x] Make IDs more visibile for sharing
-   [ ] Implement score tracking / high scores
