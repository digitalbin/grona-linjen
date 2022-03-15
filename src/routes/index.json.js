// import 'dotenv/config'
import { Client } from '@notionhq/client';
// const auth = process.env.NOTION_SECRET_KEY;
// const GLB_PAGE_ID = process.env.GLB_PAGE_ID;
const auth = import.meta.env.VITE_NOTION_SECRET_KEY;
const GLB_PAGE_ID = import.meta.env.VITE_GLB_PAGE_ID;

console.log({ auth, GLB_PAGE_ID });

const notion = new Client({ auth });

function getChildren(block_id) {
	return notion.blocks.children.list({ block_id }).then(({ results }) => results);
}

export async function get() {
	const children = await getChildren(GLB_PAGE_ID);
    const blocks = await Promise.all(children.map(child => getChildren(child.id).then(children => ({ ...child, children }))))

	return {
		body: {
			blocks
		}
	};
}
