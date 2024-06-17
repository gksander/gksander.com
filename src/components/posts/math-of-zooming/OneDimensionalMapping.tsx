import { ExampleContainer } from "@components/posts/ExampleContainer";
import { m } from "@utils/math";
import { useIsDarkMode } from "@utils/useIsDarkMode";
import { nanoid } from "nanoid";
import { useEffect, useId, useRef } from "react";

export function OneDimensionalMapping() {
  const homeRef = useRef<HTMLDivElement>(null);
  const homeId = useId();
  const isDark = useIsDarkMode();

  /**
   * TODO: How to not highlight segments on hover
   */
  useEffect(() => {
    const home = homeRef.current;

    if (typeof window === "undefined" || !window.JXG || !home) return;

    const pointColor = isDark ? "#fff" : "#000";
    const altColor = isDark ? "rgb(200,200,200)" : "rgb(100,100,100)";

    home.id = homeId;
    const board = window.JXG.JSXGraph.initBoard(homeId, {
      boundingBox: [0, H, W, 0],
      showCopyright: false,
      showInfobox: false,
      showNavigation: false,
      pan: { enabled: false },
    });

    const ax1 = board.create(
      "axis",
      [
        [0, H1],
        [W, H1],
      ],
      {
        ticks: { visible: false },
        withLabel: true,
        name: "x",
        color: altColor,
        highlight: false,
        label: {
          color: altColor,
          highlight: false,
          useKatex: true,
          fontSize: 20,
          offset: [-5, 20],
        },
      },
    );
    const xi = board.create("glider", [3, H1, ax1], {
      name: "x_i",
      size: 4,
      color: pointColor,
      label: {
        highlight: false,
        fontSize: 20,
        offset: [-5, 20],
        useKatex: true,
        color: pointColor,
      },
    }) as JXG.Glider;
    const xf = board.create("glider", [7, H1, ax1], {
      name: "x_f",
      color: pointColor,
      size: 4,
      label: {
        highlight: false,
        fontSize: 20,
        offset: [-5, 20],
        useKatex: true,
        color: pointColor,
      },
    }) as JXG.Glider;
    board.create("segment", [xi, xf], { strokeWidth: 4, highlight: false });

    const ax2 = board.create(
      "axis",
      [
        [0, H2],
        [W, H2],
      ],
      {
        ticks: { visible: false },
        withLabel: true,
        name: "y",
        color: altColor,
        highlight: false,
        label: {
          highlight: false,
          color: altColor,
          useKatex: true,
          fontSize: 20,
          offset: [-5, 20],
        },
      },
    );
    const yi = board.create("glider", [4, H2, ax2], {
      name: "y_i",
      size: 4,
      color: pointColor,
      label: {
        highlight: false,
        fontSize: 20,
        offset: [-5, -20],
        useKatex: true,
        color: pointColor,
      },
    }) as JXG.Glider;
    const yf = board.create("glider", [6, H2, ax2], {
      name: "y_f",
      size: 4,
      color: pointColor,
      label: {
        highlight: false,
        fontSize: 20,
        offset: [-5, -20],
        useKatex: true,
        color: pointColor,
      },
    }) as JXG.Glider;
    board.create("segment", [yi, yf], {
      strokeWidth: 4,
      color: "red",
      highlight: false,
    });

    // Tracing lines
    for (let i = 0; i <= W; i++) {
      board.create(
        "arrow",
        [
          [i, H1],
          [
            () => {
              const m = (yf.X() - yi.X()) / (xf.X() - xi.X());
              return yi.X() + m * (i - xi.X());
            },
            H2,
          ],
        ],
        {
          strokeWidth: 1,
          dash: 2,
          color: altColor,
          opacity: 0.6,
          highlight: false,
        },
      );
    }

    // Mapping l
    board.create("arrow", [xi, [() => yi.X(), H2]], {
      strokeWidth: 2,
      dash: 2,
      color: altColor,
      highlight: false,
    });
    board.create("arrow", [xf, [() => yf.X(), H2]], {
      strokeWidth: 2,
      dash: 2,
      color: altColor,
      highlight: false,
    });

    return () => {
      window.JXG.JSXGraph.freeBoard(board);
    };
  }, [isDark]);

  return (
    <ExampleContainer
      title="Mapping between two number lines"
      instructions={`Drag the ${m("x_i")}, ${m("x_f")}, ${m("y_i")}, and ${m(
        "y_f",
      )} points to view a linear mapping between the ${m("x")} and ${m(
        "y",
      )} spaces that maps ${m("[x_i,\\: x_f]")} to ${m("[y_i,\\: y_f]")}.`}
    >
      <div ref={homeRef} className="w-full aspect-[10/4]" />
    </ExampleContainer>
  );
}

const W = 10;
const H = 4;

const H1 = 3;
const H2 = 1.1;
