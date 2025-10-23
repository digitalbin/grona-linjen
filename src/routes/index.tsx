import { getSBAvailability } from "@/api/sb";
import AnimatedHeroLogo from "@/components/AnimatedHeroLogo";
import TextImageBlock from "@/components/TextImageBlock";
import { RouteDefinition } from "@solidjs/router";

export const route = {
  preload: () => {
    // getSBAvailability();
  },
} satisfies RouteDefinition;

export default function Home() {
  // const sbAvailability = createAsync(() => getSBAvailability());

  return (
    <main class="text-glb-black bg-glb-white grid gap-24 md:gap-48">
      <AnimatedHeroLogo data-menu-item="start" />
      <TextImageBlock
        data-menu-item="shitty"
        title="På väg - sedan 2015"
        imageLeft
        image={{ alt: "Kall bira", src: "/images/kall_bira.jpg" }}
      >
        Vissa saker går som på räls. Vår bryggprocess tillexempel, är inte en av
        dem. Vi krånglar till det på alla möjliga olika sätt för att få till den
        perfekta ölen. Och vi kan liksom inte koppla av förrän vi har hittat
        receptet. Kanske kommer vi rentav aldrig att hitta det. Men vi tror att
        vi har kommit en liten bit på vägen.
      </TextImageBlock>
      <TextImageBlock
        data-menu-item="bitty"
        title="I ett garage"
        image={{ alt: "Medis Hazy Pale öltapp", src: "/images/tapp.jpg" }}
      >
        ...längs med gröna linjens Hagsätragren möttes de första humlesorterna i
        det som skulle bli Gullmars IPA. Året var 2015 när vännerna Rasmus
        Bergmark, Mattias Bratt och Rasmus Langer förenades i sin törst efter
        att finna den perfekta ölen. <br />
        <br /> Resan sedan dess har varit både krokig och bumpig. Men även om vi
        själva tycker att vi fortfarande är på väg så har Gröna Linjens senaste
        experiment gått att dricka på michelinkrogar, nattklubbar som Trädgården
        eller på det lokala lunchhaket i Stockholm och längs med gröna linjen.
        Sedan den 1 november 2019 finns vår ljusa dimmiga smakexplosion Gullmars
        IPA på Systembolagets beställningssortiment och givetvis alltid på
        Systembolaget vid Gullmarsplan.
      </TextImageBlock>
      <TextImageBlock
        data-menu-item="litty"
        title="Rälsen kan vara krokig och hal"
        imageLeft
        image={{ alt: "Underlägg Gröna Linjen", src: "/images/coaster.jpg" }}
      >
        ...men ibland går experimenten som tåget. Som när vi kom på receptet
        till Medis Mimosa till exempel. Vid Nöjesguidens ölmässa 2020 röstade de
        hundratals besökarna fram vår fruktiga apelsin-IPA, Medis Mimosa, till
        mässans bästa öl. Medan ni prövar vårt senaste recept på krogen, på stan
        eller hemmavid fortsätter vi vår väg. Även om det inte alltid går som på
        räls.
        <br />
        <br /> Följ oss på instagram eller scrolla ner för att se vart du kan
        prova vårt senaste experiment.
      </TextImageBlock>
      {/* <div>hej</div>
      <div>hej</div>
      <div>hej</div>
      <div>hej</div> */}
    </main>
  );
}
