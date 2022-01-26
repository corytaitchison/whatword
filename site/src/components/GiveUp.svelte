<script lang="ts">
    import { getContext } from 'svelte';
    
    export let onGiveUp: () => void;

    const { close } = getContext('simple-modal');
    const onCancel = close;
    const onAccept = () => {
        onGiveUp();
        close();
    }

</script>

<div id="answer-modal">
    <h1 > Give up?</h1>
    <button on:click={onCancel} id="no"> 
        No 
    </button>
    <button on:click={onAccept}> 
        Yes 
    </button>
</div>

<style>
    #answer-modal {
        width: 100%;
        text-align: center;
    }

    h1 {
        color: var(--color-accent-red);
    }

    #no:hover {
        background-color: var(--color-accent-red);
        border-color: var(--color-accent-red);
    }

    button {
        width: 4em;
        margin: 1em;
    }
</style>