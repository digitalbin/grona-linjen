<script>
    import { doodle } from '../actions/index';
</script>

<section use:doodle>
    <div>    
        <slot />
    </div>
    <!-- <figure use:doodle /> -->
</section>

<style>
	section {
		@apply my-52 bg-white w-full;
        /* @apply grid grid-cols-3; */
	}

    div {
        @apply relative z-10;
        /* @apply col-span-2; */
    }

    figure {
        /* @apply w-full; */
        /* @apply w-1/3 flex-1; */
    }

	/* svg {
		@apply absolute inset-0 text-green overflow-visible;
	} */
</style>
