import Gutter from "../Gutter";
import Background from "./Background";
import Viewer from "./Viewer";

export default function BeerViewer() {
  return (
    <section class="grid gap-12" data-menu-item="Våra öl">
      <Gutter>
        <h2 class="mb-4 text-4xl font-bold md:text-5xl md:leading-14">
          Här är den absolut senare coolaste ballaste biran från oss
        </h2>
        <p class="text-xl leading-7">
          ojo här händer det fan i mig grejer alltså
        </p>
      </Gutter>
      <div class="relative aspect-square overflow-hidden md:aspect-video">
        <Background />
        <Viewer />
      </div>
    </section>
  );
}
