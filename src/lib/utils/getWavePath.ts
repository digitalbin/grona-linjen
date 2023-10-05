/* eslint-disable @typescript-eslint/no-explicit-any */
const smoothing = 0.2;

type Point = [number, number];

const line = (pointA: number[], pointB: number[]) => {
	const lengthX = pointB[0] - pointA[0];
	const lengthY = pointB[1] - pointA[1];
	return {
		length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
		angle: Math.atan2(lengthY, lengthX)
	};
};

const controlPoint =
	(lineCalc: any, smooth: any) => (current: any, previous: any, next: any, reverse: any) => {
		const p = previous || current;
		const n = next || current;

		const l = lineCalc(p, n);

		const angle = l.angle + (reverse ? Math.PI : 0);
		const length = l.length * smooth;

		const x = current[0] + Math.cos(angle) * length;
		const y = current[1] + Math.sin(angle) * length;

		return [x, y];
	};

const bezierCommand = (controlPointCalc: any) => (point: Point, i: number, a: Point[]) => {
	const [cpsX, cpsY] = controlPointCalc(a[i - 1], a[i - 2], point);
	const [cpeX, cpeY] = controlPointCalc(point, a[i - 1], a[i + 1], true);
	return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
};

const controlPointCalc = controlPoint(line, smoothing);
const bezierCommandCalc = bezierCommand(controlPointCalc);

const getWavePath = (points: [number, number][]) => {
	const d = points.reduce(
		(acc, point, i, a) =>
			i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${bezierCommandCalc(point, i, a)}`,
		''
	);
	return d;
};

export default getWavePath;
