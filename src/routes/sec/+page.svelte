<script lang="ts">
	import type { PageData } from './$types';
	import { Username, UserID, UserRole } from '../../Data/Store';

	export let data: PageData;

	$: {
		Username.update((n) => (n = data.username));
		UserID.update((n) => (n = data.userId));
		UserRole.update((n) => (n = data.userRole));
	}
</script>

{#if data.username}
	<h1>Ahoj {data.username}</h1>
{/if}

<a href="/sec/cites">Citáty</a> <br />
{#if data.userRole === 'admin'}
	<a href="/sec/users">Uživatelé</a> <br />
{/if}
