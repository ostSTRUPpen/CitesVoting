<script lang="ts">
	import CiteCountListItem from '../CiteCountListItem.svelte';
	import { getCutCountedCitesForPrinting } from '../citeCountingFunctions';

	let print = false;

	const printing = true;

	export let data;

	let amountOfCites: number = 1;

	let promise: any;

	function handlePrinting() {
		promise = getCutCountedCitesForPrinting(amountOfCites).then();
		print = true;
	}
</script>

<a href="/sec">Domů</a> <br />
{#if print === false}
	<div class="printing--settings">
		<form on:submit|preventDefault={handlePrinting}>
			<label for="amount">Počet citátů</label>
			<input id="amount" type="number" min="1" max={data?.count} bind:value={amountOfCites} />
			<input type="submit" value="Připravit pro tisk" />
		</form>
	</div>
{:else}
	<div class="printing--output">
		{#await promise}
			<p>načítání</p>
		{:then countedCites}
			{#if !countedCites['message']}
				<button on:click={() => (print = false)}>Upravit tisk</button>
				<ul>
					{#each Object.entries(countedCites) as cite}
						<CiteCountListItem {printing} {cite} />
					{/each}
				</ul>
			{:else}
				<p>
					{countedCites['message']}
				</p>
			{/if}
		{:catch error}
			<p class="error">{error.message}</p>
		{/await}
	</div>
{/if}
