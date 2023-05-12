import mongoose from 'mongoose';

const citeSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	citeType: {
		type: String,
		required: true
	},
	votes: {
		type: Array,
		default: [
			{
				userId: 'start',
				value: 5
			}
		]
	}
});

export const Cite = mongoose.model('Cite', citeSchema);
