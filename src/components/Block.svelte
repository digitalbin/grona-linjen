<script>
    import { doodle } from '../actions/index';
</script>

<section>
    <div>    
        <slot />
    </div>
    <figure use:doodle />
</section>

<style>
	section {
		@apply my-52 bg-white;
        @apply grid grid-cols-2;
	}

    figure {
        /* @apply w-1/3 flex-1; */
    }

	/* svg {
		@apply absolute inset-0 text-green overflow-visible;
	} */
</style>
