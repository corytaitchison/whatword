<script lang="ts">
    import { fade } from 'svelte/transition';
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faPlus } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from 'fontawesome-svelte';

    let open: Boolean = false;

    const expand = (_open: Boolean) => {
        open = _open; 
    };

    const isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));
    const onHover = (_open: Boolean) => !isMobile && expand(_open);

    library.add(faPlus);
</script>

<div id="expandDiv" on:mouseenter={() => onHover(true)}>

{#if open} 
    <div id="buttonList">
        <slot></slot>
    </div>
{/if}

<button 
    transition:fade id="expandButton" 
    class={open ? "open" : "closed"} 
    on:click={() => expand(!open)}>
    <FontAwesomeIcon icon={faPlus} />
</button>

</div>

<style>
    #expandDiv {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        z-index: 20;
    }

    #buttonList {
        display: flex;
        flex-direction: column;
    }

    #expandButton {
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

        /*position: fixed;
        bottom: 1rem;
        right: 1rem;*/

        cursor: pointer;

        transition: all 0.5s;

        z-index: 20;
    }

    #expandButton:not(.open):hover {
        transform: scale(1.1);
    }

    .open {
        transform: rotate(45deg);
        background-color: var(--color-accent-mid) !important;
    }

    .open:hover {
        transform: scale(1.1) rotate(45deg) !important;
    }

    @media (max-width: 350px) {
        #expandButton {
            width: 2rem;
            height: 2rem;
            font-size: 1.3em;
        }
    }
</style>