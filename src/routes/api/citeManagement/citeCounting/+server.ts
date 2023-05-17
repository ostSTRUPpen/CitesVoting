import { json } from '@sveltejs/kit';
import { Cite } from '../../../../db/models/Cite';

export async function GET() {
	try {
		const cites = await Cite.find().lean();
		if (!cites) {
			throw new Error('No cites found');
		}
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
		return json(countedCites);
	} catch (error: any) {
		const errMessage = error?.message ?? 'There has been a problem';
		return new Response(JSON.stringify({ message: errMessage }), { status: 400 });
	}
}
