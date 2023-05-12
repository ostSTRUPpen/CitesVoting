<script lang="ts">
	import Voting from './Voting.svelte';
	export let cite: any;

	let text: string = cite[1]['text'];
	let citeType: string;

	switch (cite[1]['citeType']) {
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
	<p>
		{@html text}
	</p>
	<p>Druh citátu: {citeType}</p>
	<Voting citeId={cite[1]['_id']} />
	<hr />
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
</style>
