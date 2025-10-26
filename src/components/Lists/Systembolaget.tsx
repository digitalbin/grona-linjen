import { createAsync } from "@solidjs/router";
import List from "../List";
import { getSBAvailability } from "@/api/sb";
import { Show } from "solid-js";

export function Systembolaget() {
  const sbAvailability = createAsync(() => getSBAvailability());
  return (
    <Show when={sbAvailability()}>
      {(items) => (
        <List
          title="Systembolaget"
          items={items().map((store) => ({ title: store }))}
        />
      )}
    </Show>
  );
}
