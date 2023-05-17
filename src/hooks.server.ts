import { authUser } from './$lib/server/auth';
import { connectDB } from './db/connect';
import { redirect, type Handle } from '@sveltejs/kit';

connectDB();

export const handle: Handle = async ({ event, resolve }) => {
	const user = authUser(event);
	if (user?.err === false) {
		event.locals.user = user;
		event.locals.id = user['id'];
		event.locals.username = user['username'];
		event.locals.role = user['role'];
	} else {
		event.locals.user = null;
		event.locals.id = null;
		event.locals.username = null;
		event.locals.role = null;
	}
	if (event.url.pathname.startsWith('/sec')) {
		if (!event.locals.user) {
			throw redirect(303, '/login');
		}
		if (event.url.pathname.startsWith('/sec/users')) {
			if (event.locals.role !== 'admin') {
				throw redirect(303, '/sec');
			}
		}
	}
	return resolve(event);
};
