import { For, onMount } from "solid-js";
import Button from "@/components/Button";
import ImageSlot, { ImageSlotProps } from "@/components/ImageSlot";
import TextImageBlock from "@/components/TextImageBlock";
import doodle from "@/utils/doodle";
import dons from "/images/glb_open/dons.jpeg";
import kenji from "/images/glb_open/kenji.jpeg";
import jallerilleloke from "/images/glb_open/jallerilleloke.jpeg";
import galna_garis from "/images/glb_open/galna_garis.jpeg";
import swish from "/images/glb_open/swish-qr.png";

/**
 * Bilder till sidan. Lägg bilderna i `public/images/comp/` och fyll i `src`
 * (t.ex. "/images/comp/open-intro.webp") så byts platshållaren ut automatiskt.
 */
const images = {
  intro: {
    alt: "Bowling på New Bowl Center Gullmarsplan",
    src: kenji,
  },
  tournament: {
    alt: "Lagen gör upp på banorna under Gröna Linjen Open",
    src: galna_garis,
  },
  gallery: [
    { alt: "Gröna Linjen Open 2025 – lagen samlade", src: jallerilleloke },
    { alt: "Gröna Linjen Open 2025 – prisutdelningen", src: dons },
  ],
} satisfies {
  intro: ImageSlotProps;
  tournament: ImageSlotProps;
  gallery: ImageSlotProps[];
};

const facts = [
  { label: "När", value: "21 November" },
  { label: "Var", value: "New Bowl Center Gullmarsplan" },
  { label: "Speltid", value: "2 timmar – sedan koras vinnaren" },
  { label: "Lag", value: "Totalt 32 lag, 3–5 deltagare per lag" },
  { label: "Pris", value: "550 kr per lag" },
];

const included = [
  "Deltagande i turneringen",
  "20 % rabatt på mat för alla i laget",
  "50 % rabatt på bowling efter 18.00 samma dag (21/11)",
  "Utlottning av gratis bowlingtider",
  "BROKIGHET OCH GEMENSKAP",
];

const previousTeams: { name: string; note?: string }[] = [
  { name: "Sockenplan Revisited", note: "laget att slå! Segrare 2024 & 2025" },
  { name: "Pungpinan Gangsters", note: "skräll-2:a 2024" },
  { name: "Skogskyrkogårdens Änglar" },
  { name: "Gubbängen" },
  { name: "Tallkrogens Bira Hunters" },
  { name: "Skanstull Lager Lane Lancer" },
  { name: "Gullmars Gutters" },
  { name: "Utan Smink i Skärmarbrink" },
  { name: "Högdalen" },
  { name: "Sandsborg Diablos" },
  { name: "Globen Gubbkeps Bajarna" },
  { name: "Brännkyrka Bowling" },
  { name: "Hammarby Höjdare" },
  { name: "Gullmars Galna Gärius" },
  { name: "Farsta Strand Bajen Land" },
  { name: "Bästa Svängen Hökarängen" },
  { name: "La Vita Loca" },
  { name: "Skarpnäck Gunners" },
  { name: "Gullmars Stiliga Vrak" },
  { name: "Medisfamiljen" },
  { name: "Katarin Strikers" },
  { name: "Hökarängen Hooters" },
  { name: "Stureby Sandbagers" },
  { name: "Alvik All Week" },
  { name: "Svedmyra Swingers" },
  { name: "Gullmars_Taket" },
  { name: "Nej till blåa" },
];

const articleUrl =
  "https://www.mitti.se/nyheter/grona-linjenstationer-gor-upp-i-bowling-pa-gullmars-6.3.328379.c0bf0e4b11";

export default function Open() {
  onMount(() => {
    document.title = "Gröna Linjen Open IV – Gröna Linjen Bryggeri";
  });

  return (
    <main class="text-glb-black bg-glb-white grid gap-24 md:gap-48">
      <section
        data-menu-item="Start"
        class="bg-glb-black text-glb-white grid min-h-[60vh] content-center"
      >
        <div class="gutter grid gap-6 py-24 md:gap-8 md:py-32">
          <p class="text-glb-green text-lg font-black tracking-widest uppercase md:text-xl">
            21 November · New Bowl Center Gullmarsplan
          </p>
          <h1 class="t-h1 mb-0 text-5xl md:text-7xl">Gröna Linjen Open IV</h1>
          <p class="t-p max-w-3xl">
            Vi upprepar succén – en bowlingturnering för alla, med öl från Gröna
            Linjen Bryggeri. Representera din station och anmäl ditt lag!
          </p>
        </div>
      </section>
      <TextImageBlock
        data-menu-item="Om turneringen"
        title="Varmt välkomna till den fjärde upplagan!"
        image={images.intro}
      >
        Vi upprepar succén – en bowlingturnering för alla, med öl från Gröna
        Linjen Bryggeri, på New Bowl Center Gullmarsplan.
        <br />
        <br />
        Representera din station och anmäl ditt lag! Totalt 32 lag – förra året
        blev det fullt snabbt, så vänta inte för länge.
        <br />
        <br />
        Det är inget krav, men vi uppmanar er som anmäler er att döpa laget till
        ett stationsnamn följt av valfritt tillägg.
      </TextImageBlock>
      <section class="gutter grid w-full grid-cols-1 gap-16 md:grid-cols-2">
        <div class="relative z-10 col-span-1 md:order-1">
          <h2 class="t-h2">Turneringen</h2>
          <p class="t-p mb-8">
            Speltid: <strong>2 timmar</strong>, efter det koras vinnaren! Fina
            priser utlovas. Lagstorlek 3–5 deltagare per lag (obs! mindre
            speltid per spelare vid fler än tre).
          </p>
          <dl class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-lg md:text-xl">
            <For each={facts}>
              {(fact) => (
                <>
                  <dt class="border-l-2 pl-4 font-bold">{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </>
              )}
            </For>
          </dl>
        </div>
        <figure ref={doodle} class="flex items-start justify-center">
          <ImageSlot {...images.tournament} />
        </figure>
      </section>
      <section
        data-menu-item="Anmälan"
        class="gutter grid w-full grid-cols-1 gap-16 md:grid-cols-2"
      >
        <div class="relative z-10">
          <h2 class="t-h2">Anmälan &amp; betalning</h2>
          <div class="flex flex-col md:flex-row md:items-center md:gap-8">
            <img
              src={swish}
              alt="Swish betalning"
              class="hidden h-40 md:block"
            />
            <div>
              <p class="text-sm font-bold tracking-widest uppercase">Swish</p>
              <p class="text-3xl font-bold md:text-4xl">123 287 74 39</p>
              <p class="mb-8 font-bold">550 kr per lag · märk med lagnamn</p>
              <Button
                class="md:hidden"
                href="https://app.swish.nu/1/p/sw/?sw=1232877439&amt=550&cur=SEK&msg=Skriv%20lagnamn%20h%C3%A4r&edit=msg&src=qr"
              >
                Öppna swish direkt
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h3 class="t-h3">I priset ingår</h3>
          <ul class="flex flex-col gap-4 text-lg leading-relaxed md:text-xl">
            <For each={included}>
              {(item) => <li class="border-l-2 pl-4">{item}</li>}
            </For>
          </ul>
        </div>
      </section>
      <section class="gutter grid gap-10">
        <div class="relative z-10">
          <h2 class="t-h2">Från förra året</h2>
          <p class="t-p">
            <a
              href={articleUrl}
              class="t-a"
              target="_blank"
              rel="noopener noreferrer"
            >
              Läs gärna Mitt i:s fina reportage från förra året
            </a>{" "}
            för att peppa igång!
          </p>
        </div>
        <div class="grid grid-cols-1 gap-16 md:grid-cols-2">
          <For each={images.gallery}>{(image) => <ImageSlot {...image} />}</For>
        </div>
      </section>
      <section data-menu-item="Startfält" class="gutter grid gap-10">
        <div class="relative z-10">
          <h2 class="t-h2">Tidigare startfält</h2>
          <p class="t-p">Lagen som har gjort upp om titeln de senaste åren.</p>
        </div>
        <ul class="columns-1 gap-8 text-lg leading-relaxed sm:columns-2 md:text-xl lg:columns-3">
          <For each={previousTeams}>
            {(team) => (
              <li class="mb-4 break-inside-avoid border-l-2 pl-4">
                <strong>{team.name}</strong>
                {team.note && (
                  <span class="text-glb-gray-500 block text-base md:text-lg">
                    {team.note}
                  </span>
                )}
              </li>
            )}
          </For>
        </ul>
      </section>
      <section class="gutter grid max-w-4xl gap-8 text-center">
        <h2 class="t-h2 mb-0">
          Hoppas vi ses där, gamla som nya bekantskaper!
        </h2>
        <div class="flex flex-wrap items-center justify-center gap-6">
          <a href="/" class="t-a text-lg md:text-xl">
            Tillbaka till startsidan
          </a>
        </div>
      </section>
      <div /> {/* bottom spacer */}
    </main>
  );
}
