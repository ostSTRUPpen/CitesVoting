<script lang="ts">
	import CiteListItem from './CiteListItem.svelte';
	import { getCitesByCiteTypeAndUserId } from './citeFunctions';
	import { page } from '$app/stores';
	import { UserID } from '../../../../Data/Store';

	let currentUserId: string = '';
	UserID.subscribe((value) => {
		currentUserId = value;
	});

	const citeState = $page.params.citeState;

	let promise: any = getCitesByCiteTypeAndUserId(citeState, currentUserId).then();

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
</script>

<ul>
	{#await promise}
		<p>načítání</p>
	{:then cites}
		{#if !cites['message']}
			{#each Object.entries(cites) as cite}
				<CiteListItem {cite} />
			{/each}
		{:else}
			<p>
				{cites['message']}
			</p>
		{/if}
	{:catch error}
		<p class="error">{error.message}</p>
	{/await}
</ul>
