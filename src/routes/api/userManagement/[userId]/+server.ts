import { json } from '@sveltejs/kit';
import { User } from '../../../../db/models/User';

export async function GET(requestEvent): Promise<Response> {
	const { params } = requestEvent;
	const { userId } = params;
	try {
		const user = await User.findById(userId).select('-password').exec();
		if (!user) {
			throw new Error('User not found!');
		}
		return json(user);
	} catch (error: any) {
		const errMessage = error.message ?? 'An error has occured while loading the data';
		return new Response(JSON.stringify({ message: errMessage, success: false }), { status: 400 });
	}
}
