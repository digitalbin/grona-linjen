import { query } from "@solidjs/router";

const events = {
  "Gröna Linjen Open IV": {
    url: "/open",
    description:
      "Fjärde upplagan av den omåttligt populära bowlingturneringen på New Bowl på Gullmarsplan – 21 november. Läs mer och anmäl ditt lag!",
  },
};

export const getEvents = query(async () => {
  "use server";
  return events;
}, "events");
