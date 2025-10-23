function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface Size {
  width: number;
  height: number;
}

interface Conf extends Size {
  complexity?: number;
}

function getDoodlePath({ width, height, complexity = 4 }: Conf) {
  const midPoints = Array(complexity)
    .fill(true)
    .map((_, i) => {
      const pw = width / 2;
      const y = rand(0, height);
      if (i % 2) return [rand(0, pw), y];
      return [rand(pw, width), y];
    })
    .sort((a, b) => (a[1] > b[1] ? 1 : -1));

  return [["M", [rand(0, width), 0]], ...midPoints.map((mp) => ["T", mp])]
    .flat()
    .join(" ");
}

const createSvg = ({ width, height }: Size) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", width.toString());
  svg.setAttribute("height", height.toString());
  svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.left = "0";
  svg.style.overflow = "visible";
  svg.style.color = "var(--color-glb-green)";

  return svg;
};

const createPath = ({ width, height }: Size) => {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  path.style.stroke = "currentColor";
  path.style.strokeWidth = "16";
  path.style.strokeLinejoin = "round";
  path.style.strokeLinecap = "round";
  path.style.fill = "none";

  const d = getDoodlePath({ width, height });
  path.setAttribute("d", d);

  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `var(--dashoffset, ${length})`;

  path.style.transition = "stroke-dashoffset 0.3s ease-out";

  return path;
};

export default function doodle(node: HTMLElement) {
  node.style.position = "relative";

  let path: SVGPathElement | null = null;

  const ob = new ResizeObserver(([entry]) => {
    const target = entry.target;
    target.querySelectorAll("svg").forEach((el) => el.remove());
    const svg = createSvg(entry.contentRect);
    path = createPath(entry.contentRect);
    svg.appendChild(path);
    target.appendChild(svg);
  });

  const handleScroll = () => {
    const { top } = node.getBoundingClientRect();
    const offset = 56;
    const progress = (top - offset) / (window.innerHeight - offset);
    const percent = Math.min(1, Math.max(0, progress));
    path?.style.setProperty(
      "--dashoffset",
      `${path?.getTotalLength() * percent}`,
    );
  };

  ob.observe(node);
  window.addEventListener("scroll", handleScroll);
}
