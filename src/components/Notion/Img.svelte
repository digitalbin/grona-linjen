<script>
	export let data;

	const generic = {
		file: {},
		caption: [{}]
	};

	const {
		file: { url },
		caption: [{ plain_text }]
	} = data || generic;
</script>

<img {...$$restProps} src={url} alt={plain_text} />
