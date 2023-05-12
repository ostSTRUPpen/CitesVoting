export async function getCites(): Promise<object> {
	const response = await fetch('../../../../api/citeManagment');
	const cites = await response.json();
	return cites;
}

export async function getCitesByCiteTypeAndUserId(
	citeType: string,
	userId: string
): Promise<number> {
	const response = await fetch(`../../../../api/citeManagment/1/${citeType}/${userId}`);
	const cite = await response.json();
	return cite;
}

export async function getCiteValueByIdAndUserId(citeId: string, userId: string): Promise<number> {
	const response = await fetch(`../../../../api/citeManagment/2/${citeId}/${userId}`);
	const number = await response.json();
	let returnNum = number['val'];
	if (returnNum < 0 || returnNum > 10 || typeof returnNum !== 'number') {
		returnNum = 5;
	}
	return returnNum;
}

export async function voteOnCite(citeId: string, userId: string, value: number): Promise<object> {
	const response = await fetch('../../../../api/citeManagment', {
		method: 'PATCH',
		body: JSON.stringify({ citeId, userId, value }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();
	return data;
}
