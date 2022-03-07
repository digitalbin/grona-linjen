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

	getSinePath(complexity = 4) {
		
		const midPoints = Array(complexity)
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

}

export default PathCreator;
