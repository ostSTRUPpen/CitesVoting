import { Cite } from '../../../../../db/models/Cite';
export async function load() {
	const count = await Cite.count().then((count) => {
		return count;
	});
	return { count };
}
