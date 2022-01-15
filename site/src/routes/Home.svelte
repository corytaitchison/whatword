<script lang="ts">
    import { fade } from 'svelte/transition';
    import { useFocus, navigate } from "svelte-navigator";

    export let maxID: number;

    // Manage route focus
    const registerFocus = useFocus();

    // Calculate Random Number 
    const getRandomNumber = (maxNum: number) => {
        return Math.floor(Math.random() * maxNum) - 1;
    }

    // Manage Buttons
    const idRedirect = () => {
        const id = prompt("Enter ID:");
        if (id === null) return;
        if (Number(id) < maxID && Number(id) >= 0) {
            navigate(`/play/${id}`);
        } else {
            alert("Invalid ID");
        }
    }
    const randomRedirect = () => {
        navigate(`/play/${getRandomNumber(maxID)}`);
    }
    const playlistRedirect = () => {
        navigate('/list');
    }
</script>

<div id="home" in:fade="{{duration: 300, delay:500}}"> 
    <div>
        <button use:registerFocus on:click={randomRedirect}>
            Random Word
        </button>
    </div>
    <div>
        <button on:click={idRedirect}>
            Enter ID
        </button>
    </div>
    <div> 
        <button on:click={playlistRedirect}>
            Playlists
        </button>
    </div>
    <div>
        <button disabled>
            Coming Soon
        </button>
    </div>
</div>

<style>
    #home {
        margin-top: 4em;
        display: flex;
        flex-direction: column;
    }
    button {
        width: 14em;
        margin-top: 1em;
    }
</style>
