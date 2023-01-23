<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { draw } from '../../transitions';

	export let id;

	let ready = false;

	const duration = 300;
	const flyAmt = 27;
	const customTransition = (node, { order, type }) => {
		if (type === 'line') {
			return draw(node, { duration, delay: order * duration });
		}
		const typeMap = {
			g: { x: -flyAmt, y: 0 },
			r: { x: 0, y: -flyAmt },
			ö: { x: -flyAmt, y: 0 },
			n: { x: flyAmt, y: 0 },
			a: { x: flyAmt, y: 0 },
			linjen: { x: -flyAmt, y: 0 }
		};
		return fly(node, { ...typeMap[type], duration, delay: order * duration });
	};

	onMount(() => {
		ready = true;
	});
</script>

<div {id}>
	<svg
		preserveAspectRatio="xMidYMid meet"
		viewBox="0 0 378 378"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		{#if ready}
			<path
				in:customTransition={{ type: 'line', order: 2 }}
				class="line"
				d="M87.2886 53.0441H193.818C204.863 53.0441 213.818 61.9988 213.818 73.0441"
				stroke="currentColor"
			/>
			<path
				in:customTransition={{ type: 'line', order: 4 }}
				class="line"
				d="M193.817 109.044H57.8174C46.772 109.044 37.8174 117.999 37.8174 129.044V144.938C37.8174 156.043 46.8214 165.044 57.928 165.044H88.1441"
				stroke="currentColor"
			/>
			<path
				in:customTransition={{ type: 'line', order: 6 }}
				class="line"
				d="M141.729 165.044H329.818C340.864 165.044 349.818 173.999 349.818 185.044V192.854C349.818 204.004 340.864 213.044 329.818 213.044H304.816"
				stroke="currentColor"
			/>
			<path
				in:customTransition={{ type: 'line', order: 8 }}
				class="line"
				d="M249.818 213.044H177.818C166.773 213.044 157.818 221.999 157.818 233.044C157.818 244.089 148.851 253.044 137.79 253.044H81.8179"
				stroke="currentColor"
			/>
			<path
				in:customTransition={{ type: 'line', order: 10 }}
				class="line"
				d="M53.8179 281.044V296.724C53.8179 307.947 62.8219 317.044 73.9285 317.044H145.818"
				stroke="currentColor"
			/>

			<path
				in:customTransition={{ type: 'g', order: 1 }}
				class="letter"
				d="M53.405 49.2645H75.693V57.1552H72.3837C70.557 67.5259 62.7957 74.5685 49.753 74.5685C34.4264 74.5685 25.8184 63.3512 25.8184 50.5685C25.8184 38.1125 34.8184 26.5685 49.753 26.5685C61.753 26.5685 70.0357 33.8739 70.8184 42.5472H59.5357C58.8837 38.9605 55.2317 35.6992 49.6877 35.6992C41.0784 35.6992 36.6437 42.9379 36.6437 50.6339C36.6437 58.7205 41.1437 65.6339 50.601 65.6339C56.9917 65.6339 60.7744 61.7205 61.4917 57.1552H53.405V49.2645Z"
			/>
			<path
				in:customTransition={{ type: 'r', order: 3 }}
				class="letter"
				d="M201.944 81.1288H221.117C231.227 81.1288 237.748 88.7595 237.748 97.6288C237.748 104.021 234.357 109.694 228.683 112.369L237.813 126.781H225.552L217.465 114.129H212.509V126.781H201.944V81.1288ZM227.052 97.6288C227.052 93.3901 224.183 89.7381 219.748 89.7381H212.509V105.521H219.748C224.183 105.521 227.052 101.869 227.052 97.6288"
			/>
			<g in:customTransition={{ type: 'ö', order: 5 }}>
				<path
					class="letter"
					d="M115.395 157.439C120.055 157.439 123.846 161.23 123.846 165.89C123.846 170.549 120.055 174.339 115.395 174.339C110.735 174.339 106.945 170.549 106.945 165.89C106.945 161.23 110.735 157.439 115.395 157.439ZM115.395 147.05C104.99 147.05 96.5552 155.485 96.5552 165.89C96.5552 176.294 104.99 184.729 115.395 184.729C125.801 184.729 134.235 176.294 134.235 165.89C134.235 155.485 125.801 147.05 115.395 147.05Z"
				/>
				<path class="letter" d="M130.188 144.759H100.604V137.033H130.188V144.759Z" />
			</g>
			<path
				in:customTransition={{ type: 'n', order: 7 }}
				class="letter"
				d="M285.781 216.931V187.192H296.281V232.844H285.259L268.823 203.496V232.844H258.259V187.192H269.281L285.781 216.931Z"
			/>
			<path
				in:customTransition={{ type: 'a', order: 9 }}
				class="letter"
				d="M64.8614 272.85L63.1001 267.306H46.8614L45.1 272.85H33.8174L50.1227 227.198H59.84L76.34 272.85H64.8614ZM55.0134 240.241L49.4054 259.023H60.492L55.0134 240.241Z"
			/>
			<g in:customTransition={{ type: 'linjen', order: 11 }}>
				<path class="letter" d="M177.431 328.191V337.322H153.887V291.67H164.452V328.191H177.431Z" />
				<path class="letter" d="M180.823 291.669H191.519V337.321H180.823V291.669Z" />
				<path
					class="letter"
					d="M223.174 321.409V291.67H233.674V337.322H222.653L206.218 307.974V337.322H195.651V291.67H206.674L223.174 321.409Z"
				/>
				<path
					class="letter"
					d="M268.936 321.604C268.936 332.431 262.674 338.43 252.24 338.43C241.218 338.43 235.609 331.06 235.609 321.539H246.174C246.174 326.039 248.196 329.366 252.24 329.366C256.284 329.366 258.436 326.43 258.436 321.604V291.67H268.936V321.604Z"
				/>
				<path
					class="letter"
					d="M283.18 300.148V310.517H300.462V318.8H283.18V328.844H300.462V337.321H272.614V291.669H300.462V300.148H283.18Z"
				/>
				<path
					class="letter"
					d="M331.035 321.409V291.67H341.535V337.322H330.513L314.079 307.974V337.322H303.513V291.67H314.535L331.035 321.409Z"
				/>
			</g>
			<text class="fill-black">Gröna Linjen Logo Animation</text>
		{/if}
	</svg>
</div>

<style lang="postcss">
	div {
		@apply bg-black span-full h-screen md:pt-20;
	}
	svg {
		@apply w-full h-full;
	}
	.letter {
		@apply fill-white;
		fill-rule: evenodd;
		clip-rule: evenodd;
	}
	.line {
		stroke-width: 8px;
		stroke: theme(colors.green);
	}
</style>
