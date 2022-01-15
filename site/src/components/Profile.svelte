<script lang="ts">
    import type { User } from "firebase/auth";
    import { fade } from 'svelte/transition';

    export let doLogin: () => void;
    export let doSignOut: () => void;
    export let user: User; 
</script>

<div id="profile">
{#if !user}
    <h3>Profile</h3>
    <p>
        Sign in to save your games and brag about your winnings to your friends!
        <br> 
        <i>Coming soon.</i>
    </p>
    <button transition:fade id="google-button" on:click={ doLogin }>
        Sign in with Google
    </button>
{:else}
    <h3>{ user.displayName }</h3>
    <p>
        Hi! Player history and sharing functionality is being added. Please check back again soon.
    </p>
    <button on:click={ doSignOut } id="google-button">Sign Out</button>
{/if}
</div>

<style>
    #profile {
        width: 100%;
        text-align: center;
    }

    p {
        color:  var(--color-primary);
        margin: 1em;
    }

    #google-button {
        margin-top: 1.5em;
    }
</style>