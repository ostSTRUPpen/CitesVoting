<script lang="ts">
	import { onMount } from 'svelte';
	import { getUsers, addUser } from './usersFunctions';
	import UserTable from './UserTable.svelte';

	let promise = getUsers().then();

	/*onMount(async () => {
		users = await getUsers();
	});*/

	//const x = addUser('luAu', 'xyz', 'user');

	//console.log(cites);

	/**
	 * Export rangeValue... v nějakém usefull formátu a podobě...
	 * Načtení dat z textu DONE
	 * Uložení a načtení dat do a z formátu JSON DONE
	 * 		Citát (Již s upravenou strukturou)	DONE
	 * 		Číslo	DONE
	 * 		Druh citátu (all/teacher/...)	DONE
	 * 		A dictionary hlasování ve formátu { ID_uživatele; Číslo hodnocení}
	 * 	Přidat načtení hodnocení z citátu a upravit, tak aby se jako text používala jen citát část (potřeba uživytelks profil)
	 * 	Uživatelské profily (Jměno, Heslo - nic víc)
	 * 	Při načítání nových citátů je nutná kontrola, zda již není tento citát v databázi
	 * 		Grafická uprava citátů hned po načtení z textu, porovnání s JSON databází
	 * 		Při načítání zadám druh citátů
	 *	UI
	 */

	/**
	{#if role = 'admin'}
		<AddUser />
	{/if}
	*/
</script>

<div>
	<a href="users/add">Přidat uživatele</a>
	{#await promise}
		<p>načítání</p>
	{:then users}
		<UserTable {users} />
	{:catch error}
		<p class="error">{error.message}</p>
	{/await}
</div>
