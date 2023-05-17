<script lang="ts">
	import { UserRole } from '../../../Data/Store';

	let currentUserRole: string = '';
	UserRole.subscribe((value) => {
		currentUserRole = value;
	});
</script>

<a href="/sec/cites/voted">Již obodované</a> <br />
<a href="/sec/cites/not_voted">Nebodované</a> <br />

{#if currentUserRole === 'admin'}
	<a href="/sec/cites/citeCounting">Výsledky</a> <br />
{/if}
