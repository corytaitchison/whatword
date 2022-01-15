<script lang="ts">
    import { types } from '../../functions/src/types';

    export let guesses: Array<Array<{value: string, code: types.Mark}>>; 

    let alphabet = {
            a: types.Mark.Unclassified,
            b: types.Mark.Unclassified,
            c: types.Mark.Unclassified,
            d: types.Mark.Unclassified,
            e: types.Mark.Unclassified,
            f: types.Mark.Unclassified,
            g: types.Mark.Unclassified,
            h: types.Mark.Unclassified,
            i: types.Mark.Unclassified,
            j: types.Mark.Unclassified,
            k: types.Mark.Unclassified,
            l: types.Mark.Unclassified,
            m: types.Mark.Unclassified,
            n: types.Mark.Unclassified,
            o: types.Mark.Unclassified,
            p: types.Mark.Unclassified,
            q: types.Mark.Unclassified,
            r: types.Mark.Unclassified,
            s: types.Mark.Unclassified,
            t: types.Mark.Unclassified,
            u: types.Mark.Unclassified,
            v: types.Mark.Unclassified,
            w: types.Mark.Unclassified,
            x: types.Mark.Unclassified,
            y: types.Mark.Unclassified,
            z: types.Mark.Unclassified
        }

    $: {
        guesses.forEach(guess => {
            guess.forEach(letter => {
                if (letter.code === types.Mark.Correct || 
                    letter.code === types.Mark.Incorrect || 
                    (letter.code === types.Mark.Position && alphabet[letter.value] !== types.Mark.Correct)) {
                    alphabet[letter.value] = letter.code; 
                }
            })
        })
    }
</script>

<h3>Incorrect:</h3>
<p>
    {#each Object.keys(alphabet) as letter}
    {#if alphabet[letter] === types.Mark.Incorrect}
        <span class={`letter-${alphabet[letter]}`}>{letter} </span>
    {/if}
    {/each}
</p>

<h3>Wrong position:</h3>
<p>
    {#each Object.keys(alphabet) as letter}
    {#if alphabet[letter] === types.Mark.Position}
        <span class={`letter-${alphabet[letter]}`}>{letter} </span>
    {/if}
    {/each}
</p>

<h3>Untried:</h3>
<p>
    {#each Object.keys(alphabet) as letter}
    {#if alphabet[letter] === types.Mark.Unclassified}
        <span class={`letter-${alphabet[letter]}`}>{letter} </span>
    {/if}
    {/each}
</p>

<style>
    p {
        font-weight: 400;
        font-size: 1.2em;
        color: var(--color-primary);
        text-transform: uppercase;
    }
    .letter-i {
        color: var(--color-accent-red);
    }

    .letter-c {
        color: var(--color-accent-light);
    }

    .letter-p {
        color: var(--color-accent-mid);
    }
</style>