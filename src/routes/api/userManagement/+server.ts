import { json } from '@sveltejs/kit';
import { User } from '../../../db/models/User';
import bcrypt from 'bcrypt';

export async function GET(): Promise<Response> {
	try {
		const users = await User.find().select('-password').lean();
		if (!users) {
			throw new Error('No users found');
		}
		return json(users);
	} catch (error: any) {
		const errMessage = error.message ?? 'An error has occured while loading the data';
		return new Response(JSON.stringify({ message: errMessage, success: false }), { status: 400 });
	}
}

export async function POST(requestEvent): Promise<Response> {
	const { request } = requestEvent;
	const { username, password, role } = await request.json();
	const newUserObject = {
		username,
		password: await bcrypt.hash(password, 10),
		role
	};
	try {
		const foundUser = await User.findOne({ username })
			.collation({ locale: 'cs', strength: 2 })
			.lean()
			.exec();
		if (foundUser) {
			return new Response(
				JSON.stringify({ message: `Username (${username}) is already taken!`, success: false }),
				{
					status: 400
				}
			);
		}
		const newUser = await User.create(newUserObject);
		return new Response(
			JSON.stringify({ message: `User ${newUser.username} created successfully`, success: true }),
			{ status: 201 }
		);
	} catch (error: any) {
		const errMessage = error.message ?? 'An error has occured while creating the user';
		return new Response(JSON.stringify({ message: errMessage, success: false }), { status: 400 });
	}
}

export async function PATCH(requestEvent): Promise<Response> {
	const { request } = requestEvent;
	const { id, username, password, role } = await request.json();
	const userToUpdate: any = await User.findById(id).exec();

	if (!userToUpdate) {
		return new Response(JSON.stringify({ message: `User not found!`, success: false }), {
			status: 400
		});
	}

	try {
		const foundUser = await User.findOne({ username })
			.collation({ locale: 'cs', strength: 2 })
			.lean()
			.exec();
		if (foundUser && foundUser._id.toString() !== id) {
			return new Response(
				JSON.stringify({ message: `Username (${username}) is already taken!`, success: false }),
				{
					status: 400
				}
			);
		}
		userToUpdate.username = username;
		if (password.length !== 0) userToUpdate.password = await bcrypt.hash(password, 10);
		userToUpdate.role = role;
		const updatedUser = await userToUpdate.save();
		return new Response(
			JSON.stringify({
				message: `User ${updatedUser.username} updated successfully`,
				success: true
			}),
			{ status: 201 }
		);
	} catch (error: any) {
		const errMessage = error.message ?? 'An error has occured while updating the user';
		return new Response(JSON.stringify({ message: errMessage, success: false }), { status: 400 });
	}
}

export async function DELETE(requestEvent): Promise<Response> {
	const { request } = requestEvent;
	const { id } = await request.json();
	const userToDelete: any = await User.findById(id).exec();

	if (!userToDelete) {
		return new Response(JSON.stringify({ message: `User not found!`, success: false }), {
			status: 400
		});
	}

	try {
		const deletedUser = await userToDelete.deleteOne();
		return new Response(
			JSON.stringify({
				message: `User ${deletedUser.username} deleted successfully`,
				success: true
			}),
			{ status: 201 }
		);
	} catch (error: any) {
		const errMessage = error.message ?? 'An error has occured while deleting the user';
		return new Response(JSON.stringify({ message: errMessage, success: false }), { status: 400 });
	}
}
