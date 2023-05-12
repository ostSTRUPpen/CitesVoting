<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { updateUser } from '../usersFunctions';

	export let user: any;

	console.log(user);

	const USERNAME_REGEX = /[^a-zA-Z0-9]/;
	const PASSWORD_REGEX = /[a-zA-Z0-9\$-@]/;

	let errorText: string = '';

	let username: string = user['username'];
	let validUsername: boolean = false;

	$: {
		if (username.length === 0) {
			validUsername = false;
		} else if (username.length > 5) {
			validUsername = false;
		} else if (USERNAME_REGEX.test(username)) {
			validUsername = false;
		} else {
			validUsername = true;
		}
		console.log(validUsername);
	}
	$: usernameError = validUsername ? '' : 'error_input';

	let password: string = '';
	let validPassword: boolean = false;
	let passwordError: string = '';

	$: {
		if (password.length === 0) {
			validPassword = true;
		} else if (password.length < 5) {
			console.log('1');
			validPassword = false;
		} else if (password.length > 10) {
			console.log('2');
			validPassword = false;
		} else if (!PASSWORD_REGEX.test(password)) {
			console.log('3');
			validPassword = false;
		} else {
			console.log('4');
			validPassword = true;
		}
		console.log(validPassword);
	}
	$: passwordError = validPassword ? '' : 'error_input';

	const choices = [
		{ id: 1, text: 'user' },
		{ id: 2, text: 'admin' }
	];
	let role: any = choices.find((choice) => choice['text'] === user['role']);

	$: console.log(role);

	let canSubmit: boolean = false;

	$: {
		console.log('A' + [validUsername, validPassword].every(Boolean));
		canSubmit = [validUsername, validPassword].every(Boolean);
	}

	let disableInput: boolean = false;

	async function handleSubmit() {
		disableInput = true;
		let submitUsername = username,
			submitPassword = password,
			submitRole = role['text'];
		console.log(user['id']);
		const response: any = await updateUser(user['_id'], submitUsername, submitPassword, submitRole);
		if (response['success'] === true) {
			submitUsername = password = '';
			submitPassword = username = '';
			displayDialog('Uživatel upraven!', 'updated');
		} else {
			disableInput = false;
			displayDialog('Došlo k chybě!', 'failed');
			errorText = response['message'];
		}
	}

	let dialog: any; // Reference to the dialog tag
	onMount(() => {
		dialog = document.getElementById('confirmation-dialog');
	});

	let dialogText = '';
	let dialogType = 'failed';
	function displayDialog(text: string, dType: string = 'failed') {
		dialogText = text;
		dialogType = dType;
		dialog['showModal']();
	}
</script>

<dialog id="confirmation-dialog">
	<h1>{dialogText}</h1>
	{#if dialogType === 'updated'}
		<button on:click={() => goto('/sec/users')}>Ok</button>
	{:else if dialogType === 'failed'}
		<button on:click={() => dialog.close()}>Zkusit znovu</button>
	{:else if dialogType === 'leaving'}
		<button
			on:click={() => {
				password = '';
				username = '';
				goto('/sec/users');
			}}>Ok</button
		>
	{/if}
</dialog>
<button on:click={() => displayDialog('Odejít bez uložení?', 'leaving')}>Zrušit</button>
<form on:submit|preventDefault={handleSubmit}>
	{#if errorText}
		<p class="error">{errorText}</p>
	{/if}
	<label id="username_label" for="username"
		>Uživatelské jméno (max 5 znaků. Abeceda a čísla.):
	</label>
	<input
		id="username"
		type="text"
		class={`${usernameError}`}
		bind:value={username}
		maxlength="5"
		disabled={disableInput}
	/>
	<br />
	<label id="password_label" for="password"
		>Heslo (5 až 10 znaků. Abeceda, čísla, znaky: /$&@.):
	</label>
	<input
		id="password"
		type="password"
		class={`${passwordError}`}
		bind:value={password}
		minlength="5"
		maxlength="10"
		disabled={disableInput}
	/> <br />
	<label id="role_label" for="role">Heslo (5 až 10 znaků. Abeceda, čísla, znaky: /$&@.): </label>
	<select id="role" name="role" bind:value={role} disabled={disableInput}>
		{#each choices as choice}
			<option value={choice}>
				{choice.text}
			</option>
		{/each}
	</select> <br />

	<input type="reset" value="Vymazat" /> <br />
	<input type="submit" disabled={!canSubmit} value="Upravit uživatele" />
</form>

<style>
	.error_input {
		border-color: red;
	}
</style>
