import { json } from '@sveltejs/kit';
import { Cite } from '../../../../../../db/models/Cite';

export async function GET(requestEvent) {
	const { params } = requestEvent;
	const { citeId, userId } = params;
	try {
		const cite = await Cite.findById(citeId).exec();
		if (!cite) throw new Error('Citát nenalezen!');
		const value =
			cite['votes'][cite['votes'].map((object: any) => object.userId).indexOf(userId)]['value'];
		return json({ val: value });
	} catch (error: any) {
		const errMessage = error.message ?? 'There has been a problem';
		return new Response(JSON.stringify({ message: errMessage }), { status: 400 });
	}
}
