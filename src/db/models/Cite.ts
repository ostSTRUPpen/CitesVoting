import mongoose from 'mongoose';

const citeSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	votes: {
		type: Map,
		of: Number,
		default: {
			begin: 5
		}
	}
});

export const Cite = mongoose.model('Cite', citeSchema);
