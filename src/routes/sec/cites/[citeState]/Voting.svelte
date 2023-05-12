<script lang="ts">
	import { UserID } from '../../../../Data/Store';
	import { voteOnCite, getCiteValueByIdAndUserId } from './citeFunctions';

	const max: number = 10;
	const min: number = max - max;
	const multiplier: number = 255 / 10;

	let rangeValue: number;
	let canVote = false;
	let color: string = '#808000';

	export let citeId: string;
	let currentUserId: string = '';
	UserID.subscribe((value) => {
		currentUserId = value;
	});

	getCiteValueByIdAndUserId(citeId, currentUserId).then((o) => {
		rangeValue = o;
		canVote = true;
	});

	function calculateColor(val: number) {
		const red: number = Math.round(255 - multiplier * val);
		const green: number = Math.round(0 + multiplier * val);
		const blue: number = 0;

		return `#${red.toString(16).padEnd(2, '0')}${green.toString(16).padEnd(2, '0')}${blue
			.toString(16)
			.padEnd(2, '0')}`;
	}

	$: {
		color = calculateColor(rangeValue);
	}

	$: {
		if (typeof rangeValue === 'number' && canVote === true && rangeValue !== 5)
			voteOnCite(citeId, currentUserId, rangeValue).then(() => console.log('voted'));
	}
</script>

<input type="range" id="votingRange" {min} {max} step={1} bind:value={rangeValue} />
<label for="votingRange" id="votingRangeLabel" style="--text-color: {color}">{rangeValue}</label>

<style lang="scss">
	#votingRangeLabel {
		color: var(--text-color);
		font-size: 30px;
		font-weight: bold;
	}
</style>
