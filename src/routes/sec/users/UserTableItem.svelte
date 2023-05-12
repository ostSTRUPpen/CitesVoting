<script lang="ts">
	export let user;
	const username = user[1]['username'];
	const role = user[1]['role'];
	const id = user[1]['_id'];

	/**
	{#if role = 'admin'}
		<td><ControlUser /></td>
	{/if}
	*/
</script>

<tr>
	<td>{username}</td>
	<td>{role}</td>
	<td><a href={`users/${id}`}>Upravit uživatele</a></td>
</tr>
