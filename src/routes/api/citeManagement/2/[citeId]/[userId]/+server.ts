import { json } from '@sveltejs/kit';
import { Cite } from '../../../../../../db/models/Cite';
import type { RequestEvent } from './$types';

export async function GET(requestEvent: RequestEvent) {
	const { params } = requestEvent;
	const { citeId, userId } = params;
	// Tady by to šlo přepsat, aby se využívalo locals.id, takže by nebylo volně vidět ID uživatele
	try {
		const cite = await Cite.findById(citeId).exec();
		if (!cite) throw new Error('Citát nenalezen!');
		const value =
			cite['votes'][cite['votes'].map((object: any) => object.userId).indexOf(userId)]?.['value'];
		return json({ val: value });
	} catch (error: any) {
		const errMessage = error.message ?? 'There has been a problem';
		console.error(errMessage);
		return new Response(JSON.stringify({ message: errMessage }), { status: 400 });
	}
}
