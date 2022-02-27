type I2DVec = [p: string, x: number, y?: number];

const margin = 8;
class PathCreator {
	width: number;
	height: number;
	start: I2DVec[];
	end: I2DVec[];

	constructor({ width, height }) {
		this.width = width;
		this.height = height;
		this.start = [
			['M', this.width / 2, 0],
			['V', margin]
		];
		this.end = [
			['T', this.width / 2, this.height - margin],
			['V', this.height]
		];
	}

	getRandomNumber = (min: number, max: number) => Math.random() * (max - min) + min;
	getRandomX = () => this.getRandomNumber(0, this.width);
	getRandomY = () => this.getRandomNumber(0, this.height);
	getRandom2DVec = () => [this.getRandomX(), this.getRandomY()];

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

	getSinePath(midPointAmount: number) {
		const midPoints = Array(midPointAmount)
			.fill(true)
			.map(() => ['T', ...this.getRandom2DVec()]);
		return [
			...this.start,
			['Q', ...this.getRandom2DVec(), ...this.getRandom2DVec()],
			...midPoints,
			...this.end
		];
	}
}

export default PathCreator;
