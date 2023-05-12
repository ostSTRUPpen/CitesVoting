import { json } from '@sveltejs/kit';
import { Cite } from '../../../../../../db/models/Cite';

export async function GET(requestEvent) {
	const { params } = requestEvent;
	const { citeState, userId } = params;
	try {
		let cites;
		if (citeState === 'not_voted') {
			cites = await Cite.find({ 'votes.userId': { $ne: userId } }).exec();
		} else if (citeState === 'voted') {
			cites = await Cite.find({ 'votes.userId': userId }).exec();
		} else {
			throw new Error('Please input valid citeState');
		}
		if (cites.length === 0) {
			cites = await Cite.find().exec();
			console.log('no cites');
		}
		return json(cites);
	} catch (error: any) {
		const errMessage = error.message ?? 'There has been a problem';
		return new Response(JSON.stringify({ message: errMessage }), { status: 400 });
	}
}
