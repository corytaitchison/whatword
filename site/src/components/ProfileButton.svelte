<script lang="ts">
    import type { Auth, User } from "firebase/auth";
    import { fade } from 'svelte/transition';
    // For modals
    import { getContext } from 'svelte';
    // FA Icons
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faUser } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from 'fontawesome-svelte';
    // Profile component
    import Profile from './Profile.svelte';

    export let auth: Auth;
    export let login: () => void;
    export let user: User;

    // Modal for Profile
    const { open, close } = getContext('simple-modal');
    const showProfile = () => open(Profile, { user, doLogin: () => { login(); close(); }, doSignOut: () => { auth.signOut(); close(); } });

    // Fonts
    library.add(faUser);
</script>

<button transition:fade id="profileButton" class={user ? 'user' : 'no-user'} on:click={showProfile} >
    {#if !user}
        <FontAwesomeIcon icon={faUser} />
    {:else}
        <img src={ user?.photoURL ?? '' } width="100" alt="user avatar">
    {/if}
</button>

<style>
    #profileButton {
        border-radius: 100rem;
        border: none;
        outline: none;
        background: none;
        padding: 0;
        margin: 0;

        width: 3.5rem;
        height: 3.5rem;

        position: fixed;
        right: 1rem;
        bottom: 1rem;

        cursor: pointer;

        transition: all 0.5s;
        
        color: var(--color-bg-main);
        font-size: 2em;
    }

    #profileButton:hover {
        transform: scale(1.1);
    }

    .no-user {
        background-color: var(--color-primary) !important;
    }

    img {
        border: 3px solid var(--color-primary);
        border-radius: 100rem;
        width: calc(3.5rem - 6px);
    }

    @media (max-width: 350px) {
        #profileButton {
            width: 2rem;
            height: 2rem;
            font-size: 1.3em !important;
        }
        img {
            width: calc(2rem - 6px);
            border-width: 3px;
        }
    }
</style>