<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;

	let thisForm: HTMLFormElement;
</script>

<div class="content">
	<h1>Sign Up</h1>

	<form bind:this={thisForm} method="POST" action="?/signup" use:enhance>
		<div class="form-item">
			<label for="firstName">First Name<sup><small>*</small></sup></label>
			<input value={form?.firstName ?? ''} id="firstName" type="text" name="firstName" required />
		</div>
		<div class="form-item">
			<label for="lastName">Last Name<sup><small>*</small></sup></label>
			<input value={form?.lastName ?? ''} id="lastName" type="text" name="lastName" required />
		</div>
		<div class="form-item">
			<label for="email">Email<sup><small>*</small></sup></label>
			<input
				class:feildError={form?.emailUsed}
				value={form?.email ?? ''}
				id="email"
				type="email"
				name="email"
				required
			/>
		</div>
		<div class="form-item">
			<label for="password">Password<sup><small>*</small></sup></label>
			<input
				class:feildError={form?.weakPassword}
				id="password"
				type="password"
				name="password"
				required
			/>
		</div>
		<div class="form-item">
			<label for="userUrl">User URL<sup><small>*</small></sup></label>
			<input
				class:feildError={form?.urlTaken}
				value={form?.userUrl ?? ''}
				id="userUrl"
				type="text"
				name="userUrl"
				required
			/>
		</div>
		<div class="form-item">
			{#if form?.error}
				<small>{form?.message}</small>
			{/if}
		</div>
		<div class="form-item">
			<button type="submit">Sign Up</button>
		</div>
	</form>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}
	.form-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 0.5rem;
	}
	button {
		width: 100%;
		margin-top: 0.5rem;
	}
	button:hover {
		cursor: pointer;
	}
	sup {
		color: red;
		margin-left: 0.2rem;
	}
</style>
