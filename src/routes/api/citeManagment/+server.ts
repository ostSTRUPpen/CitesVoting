import { json } from '@sveltejs/kit';
import cites from '../../../Data/citeData.json';
import { Cite } from '../../../db/models/Cite';
import { User } from '../../../db/models/User';

/*export function GET() {
	const onlyCites = cites['cites'];
	return json(onlyCites);
}*/

export async function GET() {
	try {
		const cites = await Cite.find().lean();
		if (!cites) {
			throw new Error('No job found');
		}
		return json(cites);
	} catch (error: any) {
		const errMessage = error.message ?? 'There has been a problem';
		return new Response(JSON.stringify({ message: errMessage }), { status: 400 });
	}
}
