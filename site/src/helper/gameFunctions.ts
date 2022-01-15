import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { types } from "../../functions/src/types";

export const countLetters = (word: string): Record<string, number> => {
    let result: Record<string, number> = {};
    word.split("").forEach((letter) => {
        result[letter] = 1 + (result[letter] ?? 0);
    });
    return result;
};

export const getWord = async (id: string): Promise<string> => {
    const docSnap = await getDoc(doc(db, "words", id));
    if (!docSnap.exists()) {
        console.error("No such document!");
        return null;
    }
    const word: string = docSnap.data()?.word;
    return word;
};

export const checkGuess = async (
    guess: string,
    word: string
): Promise<Array<{ value: string; code: types.Mark }> | null> => {
    let letters = countLetters(word);
    let result: Array<{ value: string; code: types.Mark }> = [];
    // First check if any letters are in the correct position
    for (let i = 0; i < word.length; i++) {
        if (guess[i] === word[i]) {
            result[i] = { value: guess[i], code: types.Mark.Correct };
            letters[guess[i]]--;
        }
    }
    // Then loop through again and check the remaining letters
    // to see if they exist in the word and if they
    // haven't been accounted for already
    for (let i = 0; i < word.length; i++) {
        if (result[i]) continue;
        if (letters[guess[i]] > 0) {
            result[i] = { value: guess[i], code: types.Mark.Position };
            letters[guess[i]]--;
        } else {
            result[i] = { value: guess[i], code: types.Mark.Incorrect };
        }
    }
    return result;
};
