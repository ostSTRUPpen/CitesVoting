<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Username, UserRole } from '../../Data/Store';

	let currentUsername: string = '';
	Username.subscribe((value) => {
		currentUsername = value;
	});

	let currentUserRole: string = '';
	UserRole.subscribe((value) => {
		currentUserRole = value;
	});

	onMount(() => {
		setTimeout(() => {
			if (currentUsername === '' && currentUserRole === '') {
				goto('/login');
			}
		}, 100);
	});
</script>

<header>
	{currentUsername}, {currentUserRole} <br />
	<a href="/sec">Domů</a>
	<a href="/sec/cites">Citáty</a>
	{#if currentUserRole === 'admin'}
		<a href="/sec/users">Uživatelé</a>
	{/if}
	<a data-sveltekit-preload-data="off" data-sveltekit-replacestate href="/logout">Odhlásit se</a>
</header>
<slot />
<footer />
