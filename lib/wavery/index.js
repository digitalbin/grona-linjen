import { computeControlPoints } from "./bezier-spline";
// import { Point, WaveryOption } from "./types";
import seedrandom from "seedrandom";
// import chroma from "chroma-js";

const svgns = "http://www.w3.org/2000/svg";

const defaultOptions = {
  width: 800,
  height: 600,
  segmentCount: 20,
  layerCount: 10,
  variance: 0.75,
  strokeWidth: 0,
  strokeColor: "none",
  seed: Date.now().toString(),
  gradientColors: [
    {
      colorValue: "yellow",
      position: 0
    },
    {
      colorValue: "red",
      position: 0.5
    },
    {
      colorValue: "navy",
      position: 1
    }
  ]
};

function generatePoints(
  width, //: number,
  height, //: number,
  segmentCount, //: number,
  layerCount, //: number,
  variance, //: number,
  seed, //: string
) {
  const randFunc = seedrandom(seed);
  const cellWidth = width / segmentCount;
  const cellHeight = height / layerCount;
  const moveLimitX = cellWidth * variance * 0.5;
  const moveLimitY = cellHeight * variance;

  const points = [];
  for (let y = cellHeight; y < height; y += cellHeight) {
    const pointsPerLayer = [];
    pointsPerLayer.push({ x: 0, y: Math.floor(y) });
    for (let x = cellWidth; x < width; x += cellWidth) {
      const varietalY = y - moveLimitY / 2 + randFunc() * moveLimitY;
      const varietalX = x - moveLimitX / 2 + randFunc() * moveLimitX;
      pointsPerLayer.push({
        x: Math.floor(varietalX),
        y: Math.floor(varietalY)
      });
    }
    pointsPerLayer.push({ x: width, y: Math.floor(y) });
    points.push(pointsPerLayer);
  }
  return points;
}

function generateClosedPath(
  curvePoints, //: Point[],
  leftCornerPoint, //: Point,
  rightCornerPoint, //: Point,
  filleColor, //: string,
  strokeColor, //: string,
  strokeWidth, //: number
) {
  const xPoints = curvePoints.map((p): number => p.x);
  const yPoints = curvePoints.map((p): number => p.y);
  const xControlPoints = computeControlPoints(xPoints);
  const yControlPoints = computeControlPoints(yPoints);

  let path =
    `M ${leftCornerPoint.x},${leftCornerPoint.y} ` +
    `C ${leftCornerPoint.x},${leftCornerPoint.y} ` +
    `${xPoints[0]},${yPoints[0]} ` +
    `${xPoints[0]},${yPoints[0]} `;

  for (let i = 0; i < xPoints.length - 1; i++) {
    path +=
      `C ${xControlPoints.p1[i]},${yControlPoints.p1[i]} ` +
      `${xControlPoints.p2[i]},${yControlPoints.p2[i]} ` +
      `${xPoints[i + 1]},${yPoints[i + 1]} `;
  }

  path +=
    `C ${xPoints[xPoints.length - 1]},${yPoints[xPoints.length - 1]} ` +
    `${rightCornerPoint.x},${rightCornerPoint.y} ` +
    `${rightCornerPoint.x},${rightCornerPoint.y} Z`;

  const svgPath = document.createElementNS(svgns, "path");
  svgPath.setAttributeNS(null, "fill", filleColor);
  svgPath.setAttributeNS(null, "stroke", strokeColor);
  svgPath.setAttributeNS(null, "stroke-width", strokeWidth.toString());
  svgPath.setAttributeNS(null, "d", path);

  return svgPath;
}

export class Wavery {
  options;
  points;
  constructor(options) {
    this.options = { ...defaultOptions, ...options };
    this.points = generatePoints(
      this.options.width,
      this.options.height,
      this.options.segmentCount,
      this.options.layerCount,
      this.options.variance,
      this.options.seed
    );
  }

  generateSvg() {
    const svg = document.createElementNS(svgns, "svg");
    svg.setAttribute("width", this.options.width.toString());
    svg.setAttribute("height", this.options.height.toString());
    svg.setAttribute("xmlns", svgns);

    // const colorScale = chroma
    //   .scale(this.options.gradientColors.map(c => c.colorValue))
    //   .domain(this.options.gradientColors.map(c => c.position * this.points.length));

    // Fill the background first
    const rect = document.createElementNS(svgns, "rect");
    rect.setAttributeNS(null, "x", "0");
    rect.setAttributeNS(null, "y", "0");
    rect.setAttributeNS(null, "height", this.options.height.toString());
    rect.setAttributeNS(null, "width", this.options.width.toString());
    rect.setAttributeNS(null, "fill", colorScale(0).hex());
    rect.setAttributeNS(null, "stroke", this.options.strokeColor);
    rect.setAttributeNS(null, "stroke-width", this.options.strokeWidth.toString());
    svg.appendChild(rect);

    // Append each layer of wave
    for (let i = 0; i < this.points.length; i++) {
      svg.appendChild(
        generateClosedPath(
          this.points[i],
          { x: 0, y: this.options.height },
          { x: this.options.width, y: this.options.height },
          colorScale(i + 1).hex(),
          this.options.strokeColor,
          this.options.strokeWidth
        )
      );
    }
    return svg;
  }
}

export default Wavery;