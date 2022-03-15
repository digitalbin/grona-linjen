import { Client } from '@notionhq/client';
const auth = 'secret_MipxesjkhPjgEWGnRM5vKqnqcIz7YeMErgdG3K6suDF';
const GLB_PAGE_ID = '9377d74d39c746f9912c6a1e544aed6f';
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
