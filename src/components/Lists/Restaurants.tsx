import List from "../List";
import { Show } from "solid-js";
import { createAsync } from "@solidjs/router";
import { getRestaurants } from "@/api/restaurants";

export function Restaurants() {
  const events = createAsync(() => getRestaurants());
  return (
    <Show when={events()}>
      {(items) => (
        <List
          title="Krogar"
          items={Object.entries(items()).map(([title, url]) => ({
            title,
            url,
          }))}
        />
      )}
    </Show>
  );
}
