export async function getCites(): Promise<object> {
	const response = await fetch('http://127.0.0.1:5173/api/citeManagment');
	const cites = await response.json();
	return cites;
}

//export async function voteOnCItes(citeId: number, username: string): Promise<boolean> {
//	return true;
//}
