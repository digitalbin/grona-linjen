import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const auth = import.meta.env.VITE_NOTION_SECRET_KEY;
const DB_ID = import.meta.env.VITE_GLB_DB_ID;

const notion = new Client({ auth });

async function getDb(id: string) {
	const { results } = await notion.databases.query({
		database_id: id,
		sorts: [{ property: 'order', direction: 'ascending' }]
	});
	return results;
}

async function getChildren(page: PageObjectResponse) {
	const { results } = await notion.blocks.children.list({ block_id: page.id });
	return { ...page.properties, children: results };
}

/** @type {import('./$types').PageLoad} */
export async function load() {
	const pages = (await getDb(DB_ID)) as PageObjectResponse[];
	const blocks = await Promise.all(pages.map(getChildren));

	return {
		blocks
	};
}
