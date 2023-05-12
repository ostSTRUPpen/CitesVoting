<script lang="ts">
	const max: number = 10;
	const min: number = max - max;
	const mid: number = max / 2;
	const multiplier: number = 255 / 10;

	let rangeValue: number = mid;
	let color: string = '#808000';

	export let citeId: number;

	console.log(citeId);

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
