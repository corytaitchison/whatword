<script lang="ts">
	// Auth and Firebase things
 	import { auth, provider, db } from './helper/firebase';
 	import { signInWithRedirect, signInWithPopup } from 'firebase/auth';
 	import { authState } from 'rxfire/auth';
	import type { User } from 'firebase/auth';
 	// Firestore things 
    import { doc, getDoc } from "firebase/firestore";
    // Navigation
	import { Router, Route, navigate } from "svelte-navigator";
	// Modal pop ups 
	import Modal from "svelte-simple-modal";
	// Components
	import ProfileButton from './components/ProfileButton.svelte';
	import Loader from './components/Loader.svelte';
	// Routes
	import Game from './routes/Game.svelte';
	import Home from './routes/Home.svelte';
	import Playlists from './routes/Playlists.svelte';

	// Manage authentication 
 	let user: User;
 	authState(auth).subscribe(u => user = u);
 	const login = () => {
 		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			// Mobile
			signInWithRedirect(auth, provider);
		} else { 
			// Desktop
			signInWithPopup(auth, provider);
		}
		close();
	};

    // Get allowed IDs
    let maxID: number | undefined = undefined;
    const queryConfig = async () => {
        const docSnap = await getDoc(doc(db, "admin", "config"));
        if (docSnap.exists()) {
            maxID = docSnap.data()?.listLength;
        } else {
        	console.error("Error fetching config data");
        }
    };
    queryConfig().then().catch(e => console.error(e));
</script>

<Modal styleWindow={{ 'background-color': 'var(--color-bg-main)' }}>
<main>
	<h1 class="disable-select">What<br>Word<span class="accent">?</span></h1>
	{#if maxID === undefined}
		<Loader />
	{:else}
	<Router>
		<Route path="play/:id" component="{Game}" {maxID} /> 
		<Route path="list" component="{Playlists}" />
		<Route path="list/:listID" component="{Playlists}" />
		<Route path="about"> 
			<div style="margin: 3em">			
				A clone of the game <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a>. 
				<br> 
				<a href="https://github.com/corytaitchison/whatword">Github</a>. <a href="mailto:contact@whatword.xyz">Contact</a>.
			</div>
            <button on:click={() => navigate("/")}>
                Home
            </button>
		</Route>
		<Route path="legal"> 
			<div style="margin: 3em">			
				These pages don't exist yet!
			</div>
            <button on:click={() => navigate("/")}>
                Back
            </button>
        </Route>
		<Route>
			<Home {maxID} /> 
		</Route> 
	</Router>
	<ProfileButton {auth} {login} {user} />
	{/if}
	<footer>
		<a href="/about">About</a>. <a href="/legal">Privacy</a>. <a href="/legal">Terms</a>.
	</footer>
</main>
</Modal>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 100vw;
		margin: 0 auto;
	}

	h1 {
		color: var(--color-primary);
		font-size: 3em;
		font-weight: 500;
		text-align:  left;
		margin-left: 0.5em;
		margin-bottom:  min(10vw, 80px);
		/*cursor: pointer;*/
	}

	footer {
		color: var(--color-primary-faded);
		position: fixed;
		bottom: 1em;
		width: 100%;
		left: 0;
		z-index: 10;
	}

	.accent {
		color: var(--color-accent-light);
	}

	@media (min-width: 640px) {
		main {
			max-width: 640px;
		}

		h1 {
			font-size: 4em;
		}
	}
</style>