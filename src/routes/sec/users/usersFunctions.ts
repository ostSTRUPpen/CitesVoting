export async function getUsers(): Promise<object> {
	const response = await fetch('../../api/userManagement');
	const users = await response.json();
	return users;
}

export async function getUserById(userId: string): Promise<object> {
	const response = await fetch(`../../api/userManagement/${userId}`);
	const user = await response.json();
	return user;
}

export async function addUser(username: string, password: string, role: string): Promise<object> {
	const response = await fetch('../../api/userManagement', {
		method: 'POST',
		body: JSON.stringify({ username, password, role }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();
	return data;
}

export async function updateUser(
	id: string,
	username: string,
	password: string,
	role: string
): Promise<object> {
	const response = await fetch('../../api/userManagement', {
		method: 'PATCH',
		body: JSON.stringify({ id, username, password, role }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();
	return data;
}

export async function deleteUserById(id: string): Promise<object> {
	const response = await fetch('../../api/userManagement', {
		method: 'DELETE',
		body: JSON.stringify({ id }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();
	return data;
}
