import { Client } from '@notionhq/client';

const auth = import.meta.env.VITE_NOTION_SECRET_KEY;
const DB_ID = import.meta.env.VITE_GLB_DB_ID;

const notion = new Client({ auth });

async function getDb(id) {
	const { results } = await notion.databases.query({
		database_id: id,
		sorts: [ { property: 'order', direction: 'ascending' } ]
	});
	return results;
}

async function getChildren(page) {
	const { results } = await notion.blocks.children.list({ block_id: page.id });
	return { ...page.properties, children: results };
}

export async function load() {
	const pages = await getDb(DB_ID);
	const blocks = await Promise.all(pages.map(getChildren))

	return {
		blocks
	};
}
