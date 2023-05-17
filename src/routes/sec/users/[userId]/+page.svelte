<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { deleteUserById, getUserById } from '../usersFunctions';
	import UpdateUser from './UpdateUser.svelte';
	import { goto } from '$app/navigation';
	const id = $page.params.userId;

	const promise = getUserById(id).then();

	let errorText: string;

	let dialogText = 'Přejete si smazat uživatele?';
	let dialogType = 'asking';

	let dialog: any;
	onMount(() => {
		dialog = document.getElementById('deletion-dialog');
	});

	function confirmDeleting() {
		displayDialog('Přejete si smazat uživatele?', 'asking');
	}

	async function deleteUser() {
		dialog.close();
		const response: any = await deleteUserById(id);
		if (response['success'] === true) {
			displayDialog('Uživatel smazán!', 'deleted');
		} else {
			displayDialog('Došlo k chybě!', 'error');
			errorText = response['message'];
		}
	}
	function displayDialog(text: string, asking: string = 'asking') {
		dialogText = text;
		dialogType = asking;
		dialog['showModal']();
	}
</script>

<dialog id="deletion-dialog">
	<h1>
		{dialogText}
	</h1>
	{#if dialogType === 'asking'}
		<button on:click={deleteUser}>Ano</button>
		<button on:click={() => dialog.close()}>Ne</button>
	{:else if dialogType === 'deleted'}
		<button
			on:click={() => {
				goto('/sec/users');
			}}>Ok</button
		>
	{:else}
		<button on:click={() => dialog.close()}>Ok</button>
	{/if}
</dialog>

<div>
	{#await promise}
		<p>načítání</p>
	{:then userToUpdate}
		<button on:click={confirmDeleting}>Smazat uživatele</button>
		<UpdateUser user={userToUpdate} />
	{:catch error}
		<p class="error">{error.message}</p>
	{/await}
</div>
