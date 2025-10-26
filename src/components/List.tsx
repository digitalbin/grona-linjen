import { For, JSX } from "solid-js";

interface ListItem {
  title: JSX.Element;
  description?: string;
  url?: string;
}

interface Props {
  items: ListItem[];
  title: string;
}

export default function List({ title, items }: Props) {
  return (
    <>
      <h3 class="t-h3 pr-8">{title}</h3>
      <ul class="mb-8 flex flex-col gap-4 text-lg leading-relaxed last-of-type:mb-0 md:col-start-2 md:mb-0 md:text-xl">
        <For each={items}>
          {(item) => (
            <li class="border-l-2 pl-4">
              {item.url ? (
                <a
                  href={item.url}
                  class="t-a"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>
              ) : (
                <span>{item.title}</span>
              )}
              {item.description && <p class="t-p">{item.description}</p>}
            </li>
          )}
        </For>
      </ul>
    </>
  );
}
