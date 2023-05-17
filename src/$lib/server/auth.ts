import type { RequestEvent } from '@sveltejs/kit';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { ACCESS_AUTH_TOKEN_SECRET } from '$env/static/private';
import type { AuthUserObject } from '../../types/types';

export function authUser(event: RequestEvent) {
	const { cookies } = event;
	const userToken = cookies.get('authToken');
	const user = {
		id: '',
		username: '',
		role: '',
		err: true
	};
	if (!userToken) {
		user.err = true;
		return user;
	}
	const authUserObject: AuthUserObject | string | jwt.JwtPayload = jwt.verify(
		userToken,
		ACCESS_AUTH_TOKEN_SECRET
	);
	if (!authUserObject) {
		user.err = true;
	} else {
		user.id = authUserObject['authUser']['_id'];
		user.username = authUserObject['authUser']['username'];
		user.role = authUserObject['authUser']['role'];
		user.err = false;
	}
	return user;
}
