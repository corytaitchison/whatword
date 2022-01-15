<script lang="ts">
    import { fade } from 'svelte/transition';
</script>

<div id="loader" transition:fade>Loading...</div>

<style>
    #loader {
        position: fixed;
        top: 45vh;
        left:  0;
        width:  100vw;
        margin: 0;
        padding: 0;

        font-size: 2em;
        font-weight: 300;
        color: var(--color-primary-faded);
    }
</style>