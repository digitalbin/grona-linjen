import { SystembolagetAPI } from '$lib/Systembolaget';
export const prerender = true;

export const load = async () => {
	const systembolagetApi = new SystembolagetAPI();
	try {
		const stores = await systembolagetApi.getAllAvailableStores();
		return { stores };
	} catch (err) {
		return { error: 'Error in Systembolaget API' };
	}
};
