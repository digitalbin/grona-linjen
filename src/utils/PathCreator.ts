// type I2DVec = [p: string, x: number, y?: number][];
type I2DVec = [x: number, y: number];
class PathCreator {
	width: number;
	height: number;
	margin: number;
	start: I2DVec;
	end: I2DVec;

	constructor({ width, height }) {
		this.width = width;
		this.height = height;
		this.margin = this.height / 5;
		// this.start = [
		// 	['M', this.width / 2, 0],
		// 	['V', margin]
		// ];
		// this.end = [
		// 	['T', this.width / 2, this.height - margin],
		// 	['V', this.height]
		// ];
		this.start = [this.width / 2, 0];
		this.end = [this.width / 2, this.height];
	}

	getRandomNumber = (min: number, max: number) => Math.random() * (max - min) + min;
	// getRandomX = () => this.getRandomNumber(this.margin, this.width - this.margin);
	// getRandomY = () => this.getRandomNumber(this.margin, this.height - this.margin);
	getRandomX = () => this.getRandomNumber(0, this.width);
	getRandomY = () => this.getRandomNumber(0, this.height);
	getRandom2DVec = () => [this.getRandomX(), this.getRandomY()];

	getBox = () => [
		this.margin,
		this.margin,
		this.width - this.margin * 2,
		this.height - this.margin * 2,
	]

	// getSawPath(midPointAmount: number) {
	// 	const midPoints = Array(midPointAmount)
	// 		.fill(true)
	// 		.map(this.getRandom2DVec)
	// 		.map((vec: I2DVec) => ['L', ...vec]);
	// 	return [
	//         ['M', ...this.start],
	//         ...midPoints,
	//         ['L', ...this.end]
	//     ];
	// }

	// getSquarePath(midPointAmount: number) {
	// 	const midPoints = Array(midPointAmount)
	// 		.fill(true)
	// 		.map((_: boolean, i: number) => i % 2 === 0 ? ['H', this.getRandomX()] : ['V', this.getRandomY()]);
	//     if (midPointAmount % 1 === 0) midPoints.push(['V', this.getRandomY()])
	// 	return [
	//         ['M', ...this.start],
	//         ...midPoints,
	//         ['H', this.end[0]]
	//     ];
	// }

	getRandom = () => {
		return [

		]
	}

	getSinePath() {
		
		const midPoints = Array(4)
				.fill(true)
				.map((_, i) => {
					const pw = this.width / 2;
					if (i%2) return [this.getRandomNumber(0, pw), this.getRandomY()]
					return [this.getRandomNumber(pw, this.width), this.getRandomY()]
				})
				.sort((a, b) => a[1] > b[1] ? 1 : -1 );
		
		return [
			['M', [this.getRandomNumber(0, this.width), 0]],
			...midPoints.map(mp => ['T', mp]),
		]
	}

	// getSinePath() {
	// 	const pw = this.width / 4;
	// 	const ph = this.height / 4;
	// 	return [
	// 		// ['M', pw, ph],
	// 		// ['Q', 2*pw, ph/2, 3*pw, ph],
	// 		// ['T', 3*pw, 3*ph],
	// 		// ['T', 1*pw, 3*ph],
	// 		// ['T', 1*pw, 2*ph],
	// 		// ['T', 2*pw, this.height]
	// 		['M', this.getRandom()],
	// 		['L', 3*pw, ph],
	// 		['L', 3*pw, 3*ph],
	// 		['L', 1*pw, 3*ph],
	// 		['L', 1*pw, 2*ph],
	// 		['L', 2*pw, this.height]
	// 	]
	// }

	// convertToQPath = (p, i) => {
	// 	if (i === 0) return ['M', this.getRandom2DVec()];
	// 	const dest = this.getRandom2DVec();
	// 	if (i === 1) return ['Q', this.width / 2, this.height / 2, ...dest];
	// 	return ['T', ...dest];
	// };

	// getSinePath(midPointAmount: number) {
	// 	const midPoints = Array(midPointAmount)
	// 		.fill(true)
	// 		.map(this.getRandom2DVec)
	// 	const total = [this.start, ...midPoints, this.end].map(this.convertToQPath);
	// 	return total;
	// }
}

export default PathCreator;
