<script lang="ts">
	export let users: object;
	import UserTableItem from './UserTableItem.svelte';
</script>

<table>
	<thead>
		<tr>
			<th>Jméno</th>
			<th>Role</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.entries(users) as user}
			<UserTableItem {user} />
		{/each}
	</tbody>
</table>
