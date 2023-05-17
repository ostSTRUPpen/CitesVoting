<script lang="ts">
	export let cite: any;
	export let printing: boolean = false;

	let text: string = cite[1]['cite']['text'];
	let citeType: string;
	let countedValue = cite[1]['countVal'] - 5;

	switch (cite[1]['cite']['citeType']) {
		case 'ucitel': {
			citeType = 'učitel';
			break;
		}
		case 'zak': {
			citeType = 'student';
			break;
		}
		case 'mix': {
			citeType = 'společné';
			break;
		}
		default: {
			citeType = 'nevím';
			break;
		}
	}
</script>

<li>
	{#if (printing = false)}
		<p>
			{@html text}
		</p>
		<p>Druh citátu: {citeType}</p>
		<p>Celková hodnota hlasů: {countedValue}</p>
		<hr />
	{:else}
		<p class="printing--cite_item">
			{@html text}
		</p>
		<hr />
	{/if}
</li>

<style lang="scss">
	li {
		list-style-type: none;
	}
	hr {
		position: inherit;
		margin-left: 25%;
		margin-right: 25%;
	}
	@media print {
		li {
			/* Brání rozpojení li na dvě stránky*/
			break-inside: avoid;
		}
	}
	@page {
		margin: 2cm;
	}
</style>
