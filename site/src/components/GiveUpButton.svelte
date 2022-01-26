<script lang="ts">
    import { fly } from 'svelte/transition';
    import { getContext } from 'svelte';
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faFlag } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from 'fontawesome-svelte';

    import GiveUp from './GiveUp.svelte'

    export let onGiveUp: () => void;

    // Modal for Word Hints
    const { open } = getContext('simple-modal');
    const onClick = () => open(GiveUp, {onGiveUp});

    library.add(faFlag);
</script>

<button transition:fly="{{y:90}}" id="giveUpButton" on:click={onClick} >
    <FontAwesomeIcon icon={faFlag} />
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
        margin-bottom: 1rem;

        width: 3.5rem;
        height: 3.5rem;

/*        position: fixed;
        bottom: 9rem;
        right: 1rem;*/

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
            /*bottom: 6rem;*/
            margin-bottom: 0.5rem;
        }
    }
</style>