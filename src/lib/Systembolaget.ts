import type { StoresStockResponse } from '$lib/types';
import extractRegex from '$lib/utils/extractRegex';
import capitalize from '$lib/utils/capitalize';

export class SystembolagetAPI {
	private apiKey?: string;
	private products = [
		{
			name: 'Gullmars IPA',
			id: 24409788
		},
		{
			name: 'Medis Mimosa',
			id: 24693196
		}
	];

	#getAvailableStoresFromProduct = async (productId: number) => {
		if (!this.apiKey) throw new Error('API key not set');
		const res = await fetch(
			`https://api-extern.systembolaget.se/sb-api-ecommerce/v1/site/stores/${productId}`,
			{
				headers: {
					'content-type': 'application/json',
					'ocp-apim-subscription-key': this.apiKey
				}
			}
		).then((res) => res.json() as Promise<StoresStockResponse>);

		const stores = res.storeStocks.map(({ store }) => {
			const { alias, address, city } = store;
			return `${alias ? alias + ', ' : ''}${address}, ${capitalize(city)}`;
		});

		return stores;
	};

	#getApiKey = async () => {
		const systembolagetBody = await fetch('https://www.systembolaget.se').then((res) => res.text());
		const appPath = extractRegex(systembolagetBody, /(https:[^>]*_app.*?\.js)/);
		if (!appPath) throw new Error('Could not find app path');

		const appPathBody = await fetch(appPath).then((res) => res.text());
		const publicApiKey = extractRegex(appPathBody, /NEXT_PUBLIC_OCP_APIM_KEY:"(.*?)"/);
		if (!publicApiKey) throw new Error('Could not find public API key');

		this.apiKey = publicApiKey;
		return;
	};

	getAllAvailableStores = async () => {
		if (!this.apiKey) await this.#getApiKey();
		const stores = await Promise.all(
			this.products.map(({ id }) => this.#getAvailableStoresFromProduct(id))
		);
		return Array.from(new Set(stores.flat()));
	};
}
