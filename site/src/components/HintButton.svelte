<script lang="ts">
    import { fade } from 'svelte/transition';
    import { getContext } from 'svelte';
    import type { types } from '../functions/src/types';
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faFont } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from 'fontawesome-svelte';

    import Hints from './Hints.svelte';

    export let guesses: Array<Array<{value: string, code: types.Mark}>>;

    // Modal for Word Hints
    const { open } = getContext('simple-modal');
    const showHints = () => open(Hints, { guesses }, { styleWindow: { 'background-color': 'var(--color-bg-main)'}});

    library.add(faFont);
</script>

<button transition:fade id="hintButton" on:click={showHints} >
    <FontAwesomeIcon icon={faFont} />
</button>

<style>
    #hintButton {
        color: var(--color-bg-main);
        font-size: 2em;

        border-radius: 100rem;
        border: none;
        outline: none;
        background-color: var(--color-primary);
        padding: 0;
        margin: 0;

        width: 3.5rem;
        height: 3.5rem;

        position: fixed;
        bottom: 1rem;
        left: 1rem;

        cursor: pointer;

        transition: all 0.5s;
    }

    #hintButton:hover {
        transform: scale(1.1);
    }

    @media (max-width: 350px) {
        #hintButton {
            width: 2rem;
            height: 2rem;
            font-size: 1.3em;
        }
    }
</style>