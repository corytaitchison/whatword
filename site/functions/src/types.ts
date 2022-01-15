export namespace types {
    export interface WordData {
        word: string;
    }

    export interface GuessData {
        word: string;
        id: number;
    }

    export enum Mark {
        Correct = "c",
        Position = "p",
        Incorrect = "i",
        Unclassified = "u",
    }
}
