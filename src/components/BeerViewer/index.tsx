import Gutter from "@/components/Gutter";
import { lazy } from "solid-js";

const Background = lazy(() => import("./Background"));
const Viewer = lazy(() => import("./Viewer"));

export default function BeerViewer() {
  return (
    <section class="grid gap-12" data-menu-item="Våra öl">
      <Gutter>
        <h2 class="t-h2">Högdalen Inte Hazy IPA</h2>
        <p class="t-p">
          Prova senaste tillskottet, <strong>Högdalen Inte Hazy IPA</strong>, en
          klassiker redan innan den lanserades.
        </p>
      </Gutter>
      <div class="relative aspect-square overflow-hidden md:aspect-video">
        <Background />
        <Viewer />
      </div>
    </section>
  );
}
