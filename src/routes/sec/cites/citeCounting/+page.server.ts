import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.role !== 'admin') {
		throw redirect(303, '/sec/cites');
	}
};
