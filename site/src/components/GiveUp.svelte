<script lang="ts">
    import type { User } from "firebase/auth";
    import { fade } from 'svelte/transition';

    export let doLogin: () => void;
    export let doSignOut: () => void;
    export let user: User; 
    export let word: string | undefined;
</script>

<div id="answer-modal">
<h1 > The Answer Is:</h1>
<div class="guess-wrapper">{word}</div>
</div>

<style>
    #answer-modal {
        width: 100%;
        text-align: center;
    }

    p {
        color:  var(--color-primary);
        margin: 1em;
    }


    .guess-wrapper {
        color: var(--color-accent-light);
        text-align: center;
        text-transform: uppercase;
        font-size: calc(3em + 2vw);
        font-weight: 800;
    }

    @media (max-width: 350px) {
        .guess-wrapper {
            font-size: 2em;
        }
    }
</style>