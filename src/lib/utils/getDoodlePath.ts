function getRandomNumber(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

interface Conf {
	width: number;
	height: number;
	complexity?: number;
}

export default function getDoodlePath({ width, height, complexity = 4 }: Conf) {
	const midPoints = Array(complexity)
		.fill(true)
		.map((_, i) => {
			const pw = width / 2;
			const y = getRandomNumber(0, height);
			if (i % 2) return [getRandomNumber(0, pw), y];
			return [getRandomNumber(pw, width), y];
		})
		.sort((a, b) => (a[1] > b[1] ? 1 : -1));

	return [['M', [getRandomNumber(0, width), 0]], ...midPoints.map((mp) => ['T', mp])];
}
