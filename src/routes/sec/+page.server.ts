import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	return {
		userRole: locals.role,
		userId: locals.id,
		username: locals.username
	};
};
