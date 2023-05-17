import { json } from '@sveltejs/kit';
import { Cite } from '../../../../../db/models/Cite';
import type { RequestEvent } from '../$types';

export async function GET(requestEvent: RequestEvent) {
	const { params } = requestEvent;
	const { numberOfCites } = params;
	const numberOfCitesINT = Number(numberOfCites);
	try {
		const cites = await Cite.find().lean();
		if (!cites) {
			throw new Error('No cites found');
		}
		if (
			typeof numberOfCitesINT !== 'number' ||
			numberOfCitesINT < 1 ||
			numberOfCitesINT > cites.length
		)
			throw new Error('Bad input!');
		let val: number;
		const countedCites: Array<object> = [];
		cites.forEach((cite: any) => {
			val = 0;
			cite['votes'].forEach((vote: any) => {
				val += vote['value'];
			});
			countedCites.push({ cite: cite, countVal: val });
		});
		countedCites.sort((a: any, b: any) => {
			return b['countVal'] - a['countVal'];
		});
		return json(countedCites.slice(0, numberOfCites));
	} catch (error: any) {
		const errMessage = error?.message ?? 'There has been a problem';
		console.error(errMessage);
		return new Response(JSON.stringify({ message: errMessage }), { status: 400 });
	}
}
