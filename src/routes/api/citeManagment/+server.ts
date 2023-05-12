import { json } from '@sveltejs/kit';
import { Cite } from '../../../db/models/Cite';

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

export async function PATCH(requestEvent): Promise<Response> {
	const { request } = requestEvent;
	const { citeId, userId, value } = await request.json();
	const citeToVoteOn: any = await Cite.findById(citeId).exec();

	if (!citeToVoteOn) {
		return new Response(JSON.stringify({ message: `Cite not found!`, success: false }), {
			status: 400
		});
	}

	try {
		let skip = false;
		let diffValue = false;
		let oldValue = 0;
		citeToVoteOn['votes'].forEach((vote: any) => {
			if (vote['userId'] === userId) {
				if (vote['value'] === value) {
					skip = true;
					return;
				} else {
					diffValue = true;
					oldValue = vote['value'];
					return;
				}
			}
		});
		if (!skip) {
			if (diffValue) {
				citeToVoteOn['votes'][
					citeToVoteOn['votes'].map((object: any) => object.userId).indexOf(userId)
				] = { userId: userId, value: value };
			} else {
				citeToVoteOn['votes'].push({ userId: userId, value: value });
			}
			const result = await citeToVoteOn.save();
			return new Response(JSON.stringify({ message: 'Voted', success: true }), { status: 201 });
		} else {
			return new Response(JSON.stringify({ message: 'Already voted', success: true }), {
				status: 201
			});
		}
	} catch (error: any) {
		const errMessage = error.message ?? 'An error has occured while updating the user';
		return new Response(JSON.stringify({ message: errMessage, success: false }), { status: 400 });
	}
}
