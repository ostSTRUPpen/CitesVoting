<script lang="ts">
	import { enhance } from '$app/forms';
	import { error } from '@sveltejs/kit';
	import { Username, UserID, UserRole } from '../../Data/Store';

	export let form;
	export let data;

	$: clearUser = data?.clearUser;
	$: {
		if (clearUser) {
			Username.update((n) => (n = ''));
			UserID.update((n) => (n = ''));
			UserRole.update((n) => (n = ''));
		}
	}
</script>

<form use:enhance method="POST" action="?/login">
	<label id="username_label" for="username"
		>Uživatelské jméno (max 5 znaků. Abeceda a čísla.):
	</label>
	<input
		id="username"
		name="username"
		type="text"
		maxlength="5"
		value={form?.username ?? ''}
		required
	/>
	<br />
	<label id="password_label" for="password"
		>Heslo (5 až 10 znaků. Abeceda, čísla, znaky: /$&@.):
	</label>
	<input id="password" name="password" type="password" minlength="5" maxlength="10" required />
	<br />

	{#if form?.error}
		<p>{form?.message}</p>
	{/if}

	<input type="submit" value="Přihlásit se" />
</form>
