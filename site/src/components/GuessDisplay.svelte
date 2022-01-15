<script lang="ts">
    import type { types } from '../functions/src/types';
    import { fade } from 'svelte/transition';

    export let guess: Array<{value: string, code: types.Mark}>;
</script>

{#each guess as {value, code}}
    <span 
        class={`letter-${code}`} 
        transition:fade="{{duration: 800}}" >
        {value}
    </span>
{/each}

<style>
    .letter-p {
        color: var(--color-accent-mid);
    }

    .letter-c {
        color:  var(--color-accent-light);
    }

    .letter-i {
        color:  var(--color-accent-red);
    }
</style>