<script>
    import { doodle } from '../actions/index';
    export let id;
    export let flip;
</script>

<section {id}>
    <div>
        <slot name="text" />
    </div>
    <figure class:flip use:doodle>
        <slot name="image" />
    </figure>
</section>

<style>
	section {
		@apply bg-white w-full my-16 md:my-32 px-4;
        @apply grid grid-cols-1 md:grid-cols-2;
        @apply gap-16;
	}

    div {
        @apply col-span-1 relative z-10;
        @apply md:p-0;
    }

    figure {
        @apply relative z-10;
    }

    figure.flip {
        @apply md:-order-1;
    }

    :global(svg.doodle) {
        @apply text-green overflow-visible;
        /* z-index: -1; */
    }

</style>
