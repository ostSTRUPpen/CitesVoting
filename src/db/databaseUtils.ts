/*import type { Collection } from 'mongodb';

export const returnURLsList = async (collection: Collection) => {
	const url_list = await collection.find().toArray();

	const serializedURLs = url_list.map((item) =>
		JSON.parse(JSON.stringify(item, (key, value) => (key === '_id' ? value.toString() : value)))
	);

	console.log(serializedURLs);
	return serializedURLs;
};
*/
