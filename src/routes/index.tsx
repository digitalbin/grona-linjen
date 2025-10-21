import { getSBAvailability } from "@/api/sb";
import AnimatedHeroLogo from "@/components/AnimatedHeroLogo";
import { RouteDefinition } from "@solidjs/router";

export const route = {
  preload: () => {
    // getSBAvailability();
  },
} satisfies RouteDefinition;

export default function Home() {
  // const sbAvailability = createAsync(() => getSBAvailability());

  return (
    <main>
      <AnimatedHeroLogo menuItem="start" />
    </main>
  );
}
