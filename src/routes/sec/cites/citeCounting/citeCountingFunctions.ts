export async function getCountedCites(): Promise<object> {
	const response = await fetch('../../../../api/citeManagement/citeCounting');
	const countedCites = await response.json();
	return countedCites;
}

export async function getCutCountedCitesForPrinting(amount: number) {
	const response = await fetch(`../../../../api/citeManagement/citeCounting/${amount}`);
	const countedCites = await response.json();
	return countedCites;
}
