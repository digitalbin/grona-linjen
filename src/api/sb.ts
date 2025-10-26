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

async function getSbApiKey() {
  const sbBody = await fetch(BASE_URL).then((res) => res.text());
  const appPath = extractRegex(sbBody, /src="([^"]*_next[^"]*_app[^"]*)"/);
  if (!appPath) throw new Error("Could not find app path");

  const appPathBody = await fetch(`${BASE_URL}${appPath}`).then((res) =>
    res.text(),
  );
  const publicApiKey = extractRegex(
    appPathBody,
    /NEXT_PUBLIC_API_KEY_APIM:"(.*?)"/,
  );
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

export const getSBAvailability = query(async () => {
  "use server";
  return [
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
