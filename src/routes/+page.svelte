<script lang="ts">
	import { goto } from '$app/navigation';
	export let data;

	function handleNav(e: any) {
		console.log(e.target.value);
		goto(e.target.value, { noScroll: false });
	}

	let navChoice = '/';
</script>

<h1>Welcome to Registration With Mongo</h1>

{#if data?.URLList?.length}
	<p>Registered Users</p>
	<form>
		<select bind:value={navChoice} name="urlList" on:change={handleNav}>
			<option value="/">User List</option>
			{#each data.URLList as URL}
				<option value={URL}>{URL}</option>
			{/each}
		</select>
	</form>
{/if}
