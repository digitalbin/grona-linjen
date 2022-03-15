<script>
	import kall_bira from '../../assets/kall_bira.jpg?w=608&h=405&webp&metadata';
	import tapp from '../../assets/tapp.jpg?w=608&h=608&webp&metadata';
	import coaster from '../../assets/coaster.jpg?w=608&h=405&webp&metadata';

	const map = {
		kall_bira,
		tapp,
		coaster,
	}

	export let data;

	const generic = {
		file: {},
		caption: [{}]
	};

	const {
		file: { url },
		caption: [{ plain_text }]
	} = data || generic;

	const file = Object.keys(map).find(k => url.includes(k));
	const { src, width, height } = map?.[file] || {};
</script>

<img
	{...$$restProps}
	alt={plain_text}
	{width}
	{height}
	src={src || url}
/>
