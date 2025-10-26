import { query } from "@solidjs/router";

const events = {
  "Gröna Linjen Open III": {
    url: "https://fb.me/e/3AdXuWKvH",
    description:
      "Tredje upplagan av den omåttligt populära bowlingturneringen på New Bowl på Gullmarsplan!",
  },
};

export const getEvents = query(async () => {
  "use server";
  return events;
}, "events");
