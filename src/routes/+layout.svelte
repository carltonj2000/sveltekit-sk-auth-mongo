<script lang="ts">
	import '../reset.css';
	import { page } from '$app/stores';
</script>

<nav>
	<a class:active={$page.url.pathname === '/'} href="/">Home</a>
	<a class:active={$page.url.pathname === '/signup'} href="/signup">Sign Up</a>
</nav>

<slot />

<style>
	nav {
		background: lightcyan;
		padding: 1rem;
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
	a {
		text-decoration: none;
		background: cyan;
		padding: 0.5rem 1rem;
		border-radius: 0.4rem;
	}
	.active {
		border: 1px solid green;
	}
</style>
