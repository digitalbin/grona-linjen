import { createSignal, Show } from "solid-js";
import Button from "@/components/Button";
import Gutter from "@/components/Gutter";
import { Input, TextArea } from "@/components/Input";

export default function ContactForm() {
  const [statusmessage, setStatusMessage] = createSignal<string | null>(null);
  const handleRedo = () => setStatusMessage(null);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const url = "https://formspree.io/f/xdobzyye";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (!response.ok)
      setStatusMessage("Något gick helvete! Albe ska få fan för det här!");
    else setStatusMessage("Tackar!");
  };
  return (
    <Gutter>
      <section data-menu-item="Kontakt" class="mx-auto max-w-4xl">
        <div class="mb-8 md:mb-16">
          <h2 class="t-h2">Kontakt</h2>
          <p class="t-p">
            På väg sedan 2015 och kanske med ett stopp på vägen hos dig.
            Kontakta oss för att beställa vår öl eller för att få reda på mer om
            vårt senaste försök att hitta den perfekta ölen.
          </p>
          <a
            class="t-a mt-4 text-lg md:text-xl"
            href="https://www.instagram.com/gronalinjenbryggeri/"
            target="_blank"
            rel="noreferrer"
          >
            @grönalinjenbryggeri
          </a>
        </div>

        <Show when={!statusmessage()}>
          <form onSubmit={handleSubmit} class="mx-auto flex max-w-lg flex-col">
            <Input label="E-post" type="text" name="email" />
            <Input label="Tel" type="text" name="tel" />
            <TextArea label="Meddelande" name="message" />

            <Button type="submit">Skicka</Button>
          </form>
        </Show>

        <Show when={statusmessage()}>
          {(message) => (
            <>
              <p class="mb-8 text-center text-4xl font-bold">{message()}</p>
              <Button class="w-full" onClick={handleRedo}>
                Nytt meddelande
              </Button>
            </>
          )}
        </Show>
      </section>
    </Gutter>
  );
}
