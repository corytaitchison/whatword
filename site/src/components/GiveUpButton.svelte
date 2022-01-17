<script lang="ts">
    import { fade } from 'svelte/transition';
    import { getContext } from 'svelte';
    import type { types } from '../../functions/src/types';
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faEye } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from 'fontawesome-svelte';

    import Hints from './Hints.svelte';
    import GiveUp from './GiveUp.svelte'

    export let word: string | undefined;

    // Modal for Word Hints
    const { open } = getContext('simple-modal');
    const showHints = () => open(GiveUp, {word : word});

    library.add(faEye);
</script>

<button transition:fade id="giveUpButton" on:click={showHints} >
    <FontAwesomeIcon icon={faEye} />
</button>

<style>
    #giveUpButton {
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
        right: 1rem;

        cursor: pointer;

        transition: all 0.5s;
    }

    #giveUpButton:hover {
        transform: scale(1.1);
    }

    @media (max-width: 350px) {
        #giveUpButton {
            width: 2rem;
            height: 2rem;
            font-size: 1.3em;
        }
    }
</style>