import type { Actions, RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { User } from '../../db/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ACCESS_AUTH_TOKEN_SECRET } from '$env/static/private';
import { APP_DEVELOPMENT_STATE } from '$env/static/private';

export async function load({ cookies }) {
	const authToken = cookies.get('authToken');
	if (!authToken) {
		return { clearUser: true };
	} else {
		return { clearUser: false };
	}
}

export const actions: Actions = {
	login: async ({ cookies, request }: RequestEvent) => {
		const loginFormData = await request.formData();
		const username = loginFormData.get('username')?.toString() ?? '';
		const password = loginFormData.get('password')?.toString() ?? '';
		const loginResponse = {
			username,
			error: false,
			message: ''
		};
		try {
			const userTryingToLogin = await User.findOne({ username })
				.collation({ locale: 'cs', strength: 2 })
				.lean()
				.exec();
			if (!userTryingToLogin) {
				loginResponse.error = true;
				loginResponse.message = 'Špatně zadané uživatelské jméno, či heslo!';
			} else {
				const authAttempt = await bcrypt.compare(password, userTryingToLogin?.password);

				if (!authAttempt) {
					loginResponse.error = true;
					loginResponse.message = 'Špatně zadané uživatelské jméno, či heslo!';
				} else {
					const { password, ...userTryingToLoginMinusPassword } = userTryingToLogin;
					const authToken = jwt.sign(
						{
							authUser: userTryingToLoginMinusPassword
						},
						ACCESS_AUTH_TOKEN_SECRET,
						{ expiresIn: '24h' }
					);
					cookies.set('authToken', authToken, {
						httpOnly: true,
						maxAge: 60 * 60 * 24,
						sameSite: 'strict',
						secure: APP_DEVELOPMENT_STATE === 'production',
						path: '/'
					});
					throw redirect(302, '/sec');
				}
			}
		} finally {
			//pass
		}
		return loginResponse;
	}
};
