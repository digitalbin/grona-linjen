import { Client } from '@notionhq/client';
const auth = 'secret_MipxesjkhPjgEWGnRM5vKqnqcIz7YeMErgdG3K6suDF';
const GLB_PAGE_ID = '9377d74d39c746f9912c6a1e544aed6f';
const notion = new Client({ auth });

function getPageChildren(pageId) {
    return notion.blocks.children.list({ block_id: pageId });
}

function getDatabase(dbId) {
    return notion.databases.query({ database_id: dbId });
}

const mapper = {
    child_page: getPageChildren,
    child_database: getDatabase,
}

export async function get({ params }) {	

    const { results } = await getPageChildren(GLB_PAGE_ID);
    const blocks = await Promise.all(results.map(({ type, id }) => {
        return mapper[type](id);
    }))

    return {
        body: {
            blocks,
        },
    }
}
