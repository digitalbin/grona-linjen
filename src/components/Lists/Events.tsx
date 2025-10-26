import { getEvents } from "@/api/events";
import List from "../List";
import { Show } from "solid-js";
import { createAsync } from "@solidjs/router";

export function Events() {
  const events = createAsync(() => getEvents());
  return (
    <Show when={events()}>
      {(items) => (
        <List
          title="Evenemang"
          items={Object.entries(items()).map(
            ([title, { url, description }]) => ({
              title: <strong>{title}</strong>,
              url,
              description,
            }),
          )}
        />
      )}
    </Show>
  );
}
