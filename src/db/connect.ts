import mongoose from 'mongoose';
import { MONGO_URL } from '$env/static/private';

export async function connectDB(): Promise<void> {
	try {
		await mongoose.connect(MONGO_URL);
		console.log('Connected');
	} catch (err) {
		console.log(err);
	}
}
