import { ExampleContainer } from "@components/posts/ExampleContainer";
import { useEffect, useRef } from "react";

export function CanvasZooming() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;

    // Input and output windows
    const startingInputWindow: ViewWindow = {
      xMin: -18,
      xMax: 18,
      yMin: -18,
      yMax: 18,
    };
    const inputWindow = Object.assign({}, startingInputWindow);
    const outputWindow: ViewWindow = {
      xMin: 0,
      xMax: SIZE,
      yMin: SIZE,
      yMax: 0,
    };

    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();

      // Input coordinates where mousewheel occurred
      const { x, y } = mapPoint(
        { x: e.offsetX, y: e.offsetY },
        outputWindow,
        inputWindow,
      );

      // What percent did we hit at?
      const hitPercentX =
        (x - inputWindow.xMin) / (inputWindow.xMax - inputWindow.xMin);
      const hitPercentY =
        (y - inputWindow.yMin) / (inputWindow.yMax - inputWindow.yMin);

      const deltaW = e.deltaY / 20;
      const deltaH = e.deltaY / 20;

      // Don't let the window get too small otherwise things start to "flip"
      if (inputWindow.xMax - inputWindow.xMin + deltaW < 0) return;
      if (inputWindow.yMax - inputWindow.yMin + deltaH < 0) return;

      inputWindow.xMin -= deltaW * hitPercentX;
      inputWindow.xMax += deltaW * (1 - hitPercentX);
      inputWindow.yMin -= deltaH * hitPercentY;
      inputWindow.yMax += deltaH * (1 - hitPercentY);

      draw();
    });

    // Reset on click
    canvas.addEventListener("click", (e) => {
      Object.assign(inputWindow, startingInputWindow);
      draw();
    });

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      const grdStart = mapPoint({ x: -16, y: 0 }, inputWindow, outputWindow);
      const grdEnd = mapPoint({ x: 16, y: 0 }, inputWindow, outputWindow);
      const grd = ctx.createLinearGradient(
        grdStart.x,
        grdStart.y,
        grdEnd.x,
        grdEnd.y,
      );
      grd.addColorStop(0, "red");
      grd.addColorStop(0.5, "pink");
      ctx.fillStyle = grd;
      ctx.lineWidth = 5;

      ctx.beginPath();
      let pt = mapPoint(heart(0), inputWindow, outputWindow);
      ctx.moveTo(pt.x, pt.y);
      for (let t = 0; t < 2 * Math.PI; t += 0.01) {
        pt = mapPoint(heart(t), inputWindow, outputWindow);
        ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
      ctx.fill();
    };

    draw();
  }, []);

  return (
    <ExampleContainer
      title={`"Zooming in" using window mapping`}
      instructions="Use your mouse wheel to scroll on the heart, and notice how it zooms while preserving focal point. Click on the canvas to reset the zoom."
    >
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          className="border border-background-dark rounded overflow-hidden"
        />
      </div>
    </ExampleContainer>
  );
}

const SIZE = 300;

const heart = (t: number): Point => {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y:
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t),
  };
};

type Point = { x: number; y: number };

type ViewWindow = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

/**
 * Maps one 2D space to another such that
 *  inputWindow maps into outputWindow
 */
const mapPoint = (
  point: Point,
  inputWindow: ViewWindow,
  outputWindow: ViewWindow,
) => {
  return {
    // map in the x-direction
    x: linearMap(
      point.x,
      inputWindow.xMin,
      inputWindow.xMax,
      outputWindow.xMin,
      outputWindow.xMax,
    ),
    // map in the y-direction
    y: linearMap(
      point.y,
      inputWindow.yMin,
      inputWindow.yMax,
      outputWindow.yMin,
      outputWindow.yMax,
    ),
  };
};

// The function we wrote before
const linearMap = (
  x: number,
  xi: number,
  xf: number,
  yi: number,
  yf: number,
) => {
  return yi + ((yf - yi) / (xf - xi)) * (x - xi);
};
