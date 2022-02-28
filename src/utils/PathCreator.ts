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
		this.margin = this.height / 4;
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
	getRandomX = () => this.getRandomNumber(this.margin, this.width - this.margin);
	getRandomY = () => this.getRandomNumber(this.margin, this.height - this.margin);
	// getRandomX = () => this.getRandomNumber(0, this.width);
	// getRandomY = () => this.getRandomNumber(0, this.height);
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

	getRandom

	convertToQPath = (p, i, org) => {
		if (i === 0) return ['M', ...this.start];
		if (i === org.length - 1) return ['T', this.width / 2, this.height];

		const prev = org[i - 1];
		
		const dest = this.getRandom2DVec();
		const cp = [this.getRandomNumber(prev[0], dest[0]), this.getRandomNumber(prev[1], dest[1])];
		
		if (i === 1) return ['Q', this.width / 2, this.height / 2, ...dest];
		return ['T', ...dest];
	};

	getSinePath(midPointAmount: number) {
		// const midPoints = Array(midPointAmount)
		const midPoints = Array(2)
			.fill(true)
			.map(this.getRandom2DVec)
		const total = [this.start, ...midPoints, this.end].map(this.convertToQPath);
		console.log(total);
		
		return total;
		// return [
		// 	...this.start,
		// 	// ['Q', ...this.getRandom2DVec(), ...this.getRandom2DVec()],
		// 	...midPoints,
		// 	// ...this.end
		// ];
	}
}

export default PathCreator;
