<script lang="ts"> 
    // Transitions
    import { fade } from 'svelte/transition';
    // Navigation routing
    import { useFocus, navigate } from 'svelte-navigator';
    // Firestore database
    import { db } from "./firebase";
    import { query, collection, getDocs, getDoc, doc } from "firebase/firestore";
    // Components
    import Loader from './Loader.svelte';

    // Props 
    export let listID: string | null = null;

    // Manage route focus
    const registerFocus = useFocus();

    // Get playlists information from firebase
    const getPlaylists = async () => {
        const snap = await getDocs(query(collection(db, "playlists")));
        let playlists = {};
        snap.forEach((doc) => {
            const dat = doc.data();
            playlists[dat.id] = {desc: dat.desc, name: dat.name, words: dat.words};
        });
        return playlists;
    };
    const getPlaylist = async () => {
        if (!listID) return null;
        const snap = await getDoc(doc(db, "playlists", listID));
        if (!snap.exists()) {
            console.error("No document!");
            return null; 
        }
        return snap.data();
    }

</script>

<div id="playlists" in:fade="{{duration: 300, delay:500}}"> 
    {#if !listID}
        {#await getPlaylists()}
            <Loader />
        {:then playlists}
            <h2>Playlists</h2>
            {#each Object.keys(playlists) as key}
            <div>
                <button on:click={() => navigate(`/list/${key}`)}>
                    {playlists[key]?.name ?? "Playlist"}   
                </button>
            </div>
            {/each}
            <div>
                <button disabled>
                    Coming Soon
                </button>
            </div>
            <div>
                <button use:registerFocus on:click={() => navigate("/")}>
                    Back
                </button>
            </div>
        {/await}
    {:else}
        {#await getPlaylist()}
            <Loader /> 
        {:then playlist}
            <h2>Playlist: {playlist.name}</h2>
            <div>
                <p>{playlist.desc}</p>
            </div>
            <div>
                <button use:registerFocus on:click={() => navigate("/list")}>
                    Back
                </button>
            </div>
            {#each [...playlist.words].reverse() as word, i}
            <div>
                <button on:click={() => navigate(`/play/${word?.id}`)}>
                    {word?.title ?? `Word ${i + 1}`}   
                </button>
            </div>
            {/each}
        {/await}
    {/if}

</div>

<style>
    #playlists {
        margin-top: 4em;
        margin-bottom: 4em;
        display: flex;
        flex-direction: column;
    }
    button {
        width: 14em;
        margin-top: 1em;
    }
</style>