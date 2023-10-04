<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	export let menuItem: string;
	let statusmessage: string | null;

	const handleRedo = () => (statusmessage = null);

	const handleSubmit = async (e: SubmitEvent) => {
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		const url = 'https://formspree.io/f/xdobzyye';
		const response = await fetch(url, {
			method: 'POST',
			body: formData,
			headers: { Accept: 'application/json' }
		});

		if (!response.ok) statusmessage = 'Något gick helvete! Albe ska få fan för det här!';
		else statusmessage = 'Tackar!';
	};
</script>

<section data-menu-item={menuItem} class="gutter">
	<div>
		<h2>Kontakt</h2>
		<p>
			På väg sedan 2015 och kanske med ett stopp på vägen hos dig. Kontakta oss för att beställa vår
			öl eller för att få reda på mer om vårt senaste försök att hitta den perfekta ölen.
		</p>
		<a
			class="text-lg md:text-xl mt-4"
			href="https://www.instagram.com/gronalinjenbryggeri/"
			target="_blank"
			rel="noreferrer"
		>
			@grönalinjenbryggeri
		</a>
	</div>
	{#if statusmessage}
		<p class="statusMessage">{statusmessage}</p>
		<Button full on:click={handleRedo}>Nytt meddelande</Button>
	{:else}
		<form on:submit|preventDefault={handleSubmit}>
			<label>
				<span>E-post</span>
				<input type="text" name="email" />
			</label>
			<label>
				<span>Tel</span>
				<input type="text" name="phone" />
			</label>
			<label>
				<span>Meddelande</span>
				<textarea name="message" rows="5" />
			</label>

			<Button>Skicka</Button>
		</form>
	{/if}
</section>

<style lang="postcss">
	section {
		@apply mx-auto max-w-4xl;
	}
	div {
		@apply mb-8 md:mb-16;
	}
	form {
		@apply flex flex-col max-w-lg mx-auto;
	}
	input,
	textarea {
		@apply border-2 shadow rounded-sm rounded-tr-none px-4 py-2;
		@apply font-medium;
		@apply focus:shadow-lg focus:shadow-green outline-none;
		@apply appearance-none;
	}
	label {
		@apply flex flex-col mb-8;
	}
	span {
		@apply border-2 border-b-0 px-4 py-1 w-max shadow rounded-t-sm font-bold bg-green;
	}
	label:focus-within span {
		@apply shadow-green;
	}
	p.statusMessage {
		@apply font-bold text-center mb-8 text-4xl;
	}
</style>
