<script lang="ts">
    import { types } from '../../functions/src/types';
    import GuessDisplay from '../components/GuessDisplay.svelte';
    import { checkGuess, getWord } from '../helper/gameFunctions';
    import { fade } from 'svelte/transition';
    import { getFunctions, httpsCallable } from "firebase/functions";
    import { useFocus, navigate } from "svelte-navigator";

    import HintButton from '../components/HintButton.svelte';
    import GiveUpButton from '../components/GiveUpButton.svelte';

    let guesses: Array<Array<{value: string, code: types.Mark}>> = [];
    let lastGuess: string | undefined;
    let currentGuess: string;
    let isValid: boolean = false;
    let word: string | undefined;

    // Props
    export let id = "0";
    export let maxID: number;

    // Go home if an incorrect ID
    if (Number(id) >= maxID) navigate("/");

    // Manage Form Input
    let canType = true;
    $: if (currentGuess?.length === 5) {
        isValid = true;
    } else {
        isValid = false;
    }
    const onKeyPress = (e: any) => {
        if (e.charCode === 13 && isValid) submitGuess();
    };

    // Submit Guess
    const functions = getFunctions();
    const wordIsAllowed = httpsCallable(functions, 'wordIsAllowedLong');
    const submitGuess = async () => {
        if (!isValid) return;
        // Stop Input
        isValid = false;
        canType = false;
        // Convert guess to lowercase 
        const sanGuess = currentGuess.toLowerCase();
        // Check if is a real word
        const checkResult = await wordIsAllowed({word: sanGuess}); 
        if (!checkResult.data) {
            alert("Invalid word");
            canType = true;
            return; 
        }
        // Get the true word from the database
        if (word === undefined) {
            word = await getWord(id);
        }
        // Check each letter against given word
        const result = await checkGuess(sanGuess, word);
        lastGuess = sanGuess;
        currentGuess = "";
        guesses = [...guesses, result];
        // Allow typing
        canType = true;
    };

    // Check if finished
    $: won = guesses[guesses?.length - 1]?.map(letter => letter.code === types.Mark.Correct).every(Boolean);

    // Manage route focus
    const registerFocus = useFocus();

    // Share results
    const shareResult = () => {
        let text = `What Word? #${id} took me ${guesses.length} ${guesses.length === 1 ? "guess" : "guesses"}.\n\n`;
        for (const guess of guesses) {
            text += "\t\t";
            for (const letter of guess) {
                if (letter.code === types.Mark.Correct) {
                    text += "🟩";
                } else if (letter.code === types.Mark.Incorrect) {
                    text += "🟥";
                } else {
                    text += "🟪";
                }
            }
            text += "\n";
        }
        text += `\nPlay at: https://whatword.xyz/play/${id}`
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    }
</script>

<div id="Game" in:fade="{{duration: 300, delay:500}}" out:fade>
    <div class="guess-wrapper">
        {#each guesses as guess}
            <GuessDisplay guess={guess}/>
        {/each}
    </div>
    <HintButton {guesses} />
    
    {#if guesses.length >= 1} 
        <GiveUpButton {word} />
    {/if}

    {#if won}
        <div 
            in:fade="{{duration: 300, delay:500}}"
            out:fade
            id="congrats-box"> 
            <h3>Congratulations!</h3>
            <p>You completed word #{id} in {guesses.length} {guesses.length === 1 ? "try" : "tries"}.</p>
            <button on:click={() => shareResult()}>
                Share 
            </button>
            <button on:click={() => navigate("/")}>
                Home
            </button>
        </div>
    {:else}
        <input 
            id="guess-input" 
            use:registerFocus
            in:fade="{{duration: 500, delay:500}}" out:fade
            bind:value={currentGuess} 
            on:keypress={onKeyPress}
            disabled={!canType}
            placeholder={lastGuess ?? "Guess..."} />
        {#if isValid} 
            <button 
                on:click={submitGuess}
                transition:fade="{{duration: 500}}" 
                >Submit</button>
        {:else}
            <div id="help-text" in:fade="{{duration: 500, delay:700}}">
                <!-- <h3>Some info:</h3> -->
                Your aim is to guess a <b>5 letter word</b>. For each guess, the colour of the letter tells you if it's <span class="correct">correct</span>, <span class="position">in the wrong position</span>, or <span class="incorrect">incorrect</span>.
                <br> 
                Good luck!
            </div>
        {/if}   
    {/if}     
</div>

<style>
    button {
        margin: 1em;
    }

    #Game {
        /*background-color: var(--color-bg-alt);*/
        padding: 1rem;
        margin:  10vw 1rem;
        border-radius: 1rem;
    }

    .guess-wrapper {
        text-transform: uppercase;
        font-size: calc(3em + 2vw);
        font-weight: 800;

        /* Centre the grid */
        margin-left: calc(50% - 2.5em); 
        width: 5em;
        display: grid;
        grid-template-columns: repeat(5, 1em);
    }

    #guess-input {
        background:  none;
        border:  2px solid var(--color-bg-main);
        border-bottom:  2px solid var(--color-accent-light);
        outline:  none;

        text-align: center;
        font-size:  1.5em;
        font-weight:  300;
        color: var(--color-primary);

        width: calc(100% - 2em);
        margin: 1em;

        transition: all 0.5s;
    }

    #guess-input:focus {
        border: 2px solid var(--color-accent-light);
    }

    #guess-input:disabled {
        color: black;
        background-color: var(--color-accent-light);
    }

    #congrats-box {
        margin-top: 3em;
        font-size: larger;
    }

    #help-text {
        margin: 1rem 2rem 1rem 2rem;
        font-size: 1.2em;
        max-width: calc(100% - 4rem);
    }

    .correct {
        color: var(--color-accent-light);
    }

    .position {
        color: var(--color-accent-mid);
    }

    .incorrect {
        color: var(--color-accent-red);
    }


    @media (max-width: 350px) {
        .guess-wrapper {
            font-size: 2em;
        }

        #help-text {
            margin: 1rem 0.5rem 1rem 0.5rem;
            max-width: calc(100% - 1rem);
        }
    }
</style>