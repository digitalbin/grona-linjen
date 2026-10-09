import { query } from "@solidjs/router";

const GLB_PRODUCTS = [
  {
    name: "Gullmars IPA",
    id: 24409788,
  },
  {
    name: "Medis Mimosa",
    id: 24693196,
  },
  {
    name: "Bira Bira Bira",
    id: 38801687,
  },
];

const BASE_URL = "https://www.systembolaget.se";

function extractRegex(body: string, regex: RegExp) {
  return body.match(regex)?.[1];
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const API_KEY_REGEX = /NEXT_PUBLIC_API_KEY_APIM:"([^"]+)"/;

async function getSbApiKey() {
  const sbBody = await fetch(BASE_URL).then((res) => res.text());
  const chunkPaths = Array.from(
    new Set(
      Array.from(
        sbBody.matchAll(/src="(\/_next\/static\/[^"]+\.js)"/g),
        (m) => m[1],
      ),
    ),
  );
  if (chunkPaths.length === 0) throw new Error("Could not find any chunks");

  // Fetch all chunks concurrently and resolve with the first one containing the key.
  const publicApiKey = await Promise.any(
    chunkPaths.map(async (path) => {
      const body = await fetch(`${BASE_URL}${path}`).then((res) => res.text());
      const key = extractRegex(body, API_KEY_REGEX);
      if (!key) throw new Error(`No API key in ${path}`);
      return key;
    }),
  ).catch(() => undefined);
  if (!publicApiKey) throw new Error("Could not find public API key");

  return publicApiKey;
}

interface SBResponse {
  storeStocks: {
    store: { alias?: string; address: string; city: string };
  }[];
}

async function getAvailableStoredFromProductId(
  apiKey: string,
  productId: number,
) {
  const res = await fetch(
    `https://api-extern.systembolaget.se/sb-api-ecommerce/v1/site/stores/${productId}`,
    {
      headers: {
        "content-type": "application/json",
        "ocp-apim-subscription-key": apiKey,
      },
    },
  ).then((res) => res.json() as Promise<SBResponse>);

  const stores = res.storeStocks.map(({ store }) => {
    const { alias, address, city } = store;
    return `${alias ? alias + ", " : ""}${address}, ${capitalize(city)}`;
  });

  return stores;
}

// Returned in dev instead of scraping Systembolaget on every reload.
const DEV_STORES = [
  "PK-Huset, Norrlandsgatan 3, Stockholm",
  "Ringen, Götgatan 132, Stockholm",
  "Medborgarplatsen, Folkungagatan 56, Stockholm",
  "Folkungagatan 101, Stockholm",
  "Gullmarsplan 4, Johanneshov",
  "Globen, Arenavägen 57, Johanneshov",
  "Rosenlundsgatan 7, Stockholm",
  "Hammarby Sjöstad, Lugnets Allé 28, Stockholm",
  "Långholmsgatan 21, Stockholm",
];

export const getSBAvailability = query(async () => {
  "use server";
  if (import.meta.env.DEV) return DEV_STORES;

  try {
    const apiKey = await getSbApiKey();
    const stores = await Promise.all(
      GLB_PRODUCTS.map(({ id }) => getAvailableStoredFromProductId(apiKey, id)),
    );
    const uniqueStores = Array.from(new Set(stores.flat()));
    return uniqueStores;
  } catch (error) {
    console.error(error);
    return [];
  }
}, "sb");
