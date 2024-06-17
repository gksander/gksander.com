import { ExampleContainer } from "@components/posts/ExampleContainer";
import { m } from "@utils/math";
import { useIsDarkMode } from "@utils/useIsDarkMode";
import { nanoid } from "nanoid";
import { forwardRef, useEffect, useId, useRef } from "react";

export function TwoDimensionalMapping() {
  const inputRef = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const outputRef = useRef<HTMLDivElement>(null);
  const outputId = useId();
  const isDark = useIsDarkMode();

  useEffect(() => {
    const input = inputRef.current;
    const output = outputRef.current;

    if (typeof window === "undefined" || !window.JXG || !input || !output)
      return;

    input.id = inputId;
    output.id = outputId;

    const pointColor = isDark ? "#fff" : "#000";
    const altColor = isDark ? "rgb(200,200,200)" : "rgb(100,100,100)";

    const board1 = window.JXG.JSXGraph.initBoard(inputId, {
      boundingBox: [0, SIZE, SIZE, 0],
      showCopyright: false,
      showInfobox: false,
      showNavigation: false,
      pan: { enabled: false },
    });
    const board2 = window.JXG.JSXGraph.initBoard(outputId, {
      boundingBox: [0, SIZE, SIZE, 0],
      showCopyright: false,
      showInfobox: false,
      showNavigation: false,
    });

    // Input window
    const im = board1.create(
      "image",
      ["/img/cowboy-emoji.png", [0, 0], [SIZE, SIZE]],
      {
        isDraggable: false,
        active: false,
        highlight: false,
        opacity: 0.3,
      },
    ) as JXG.GeometryElement;
    // @ts-ignore
    im.isDraggable = false;
    const A1 = board1.create("point", [2.3, 9], {
      name: "A",
      size: 4,
      color: pointColor,
      label: {
        color: pointColor,
        fontSize: 16,
        useKatex: true,
        offset: [-2, 15],
        highlight: false,
      },
    }) as JXG.Point;
    const B1 = board1.create("point", [5.5, 5], {
      name: "B",
      size: 4,
      color: pointColor,
      label: {
        color: pointColor,
        useKatex: true,
        fontSize: 16,
        offset: [-5, -20],
        highlight: false,
      },
    }) as JXG.Point;
    board1.create(
      "polygon",
      [A1, [() => B1.X(), () => A1.Y()], B1, [() => A1.X(), () => B1.Y()]],
      {
        color: "gray",
        fillOpacity: 0.3,
        highlight: false,
        vertices: { visible: false },
        borders: { highlight: false, color: "black" },
      },
    );
    const H1 = board1.create("line", [[() => A1.X(), () => B1.Y()], B1], {
      highlight: false,
      strokeWidth: 1,
      color: altColor,
    });
    board1.create("ticks", [H1, 1], {
      ticksDistance: 2,
      minorTicks: 1,
      highlight: false,
      color: altColor,
    });
    board1.create("segment", [[() => A1.X(), () => B1.Y()], B1], {
      strokeWidth: 6,
      color: "blue",
      highlight: false,
    });
    const V1 = board1.create("line", [A1, [() => A1.X(), () => B1.Y()]], {
      highlight: false,
      strokeWidth: 1,
      color: altColor,
    });
    board1.create("ticks", [V1, 1], {
      ticksDistance: 2,
      minorTicks: 1,
      highlight: false,
      color: altColor,
    });
    board1.create("segment", [A1, [() => A1.X(), () => B1.Y()]], {
      strokeWidth: 6,
      color: "blue",
      highlight: false,
    });

    // Output window
    const A2 = board2.create("point", [2, 8], {
      name: "A'",
      size: 4,
      color: pointColor,
      label: {
        color: pointColor,
        fontSize: 16,
        useKatex: true,
        offset: [-2, 15],
        highlight: false,
      },
    }) as JXG.Point;
    const B2 = board2.create("point", [8, 2], {
      name: "B'",
      size: 4,
      color: pointColor,
      label: {
        color: pointColor,
        useKatex: true,
        fontSize: 16,
        offset: [-5, -20],
        highlight: false,
      },
    }) as JXG.Point;
    board2.create(
      "polygon",
      [A2, [() => B2.X(), () => A2.Y()], B2, [() => A2.X(), () => B2.Y()]],
      {
        color: "gray",
        highlight: false,
        vertices: { visible: false },
        borders: { highlight: false, color: "black" },
      },
    );
    const H2 = board2.create("line", [[() => A2.X(), () => B2.Y()], B2], {
      highlight: false,
      strokeWidth: 1,
      color: altColor,
    });
    board2.create("ticks", [H2, 1], {
      ticksDistance: () => (2 * (B2.X() - A2.X())) / (B1.X() - A1.X()),
      minorTicks: 1,
      highlight: false,
      color: altColor,
    });
    board2.create("segment", [[() => A2.X(), () => B2.Y()], B2], {
      strokeWidth: 6,
      color: "red",
      highlight: false,
    });
    const V2 = board2.create("line", [A2, [() => A2.X(), () => B2.Y()]], {
      highlight: false,
      strokeWidth: 1,
      color: altColor,
    });
    board2.create("ticks", [V2, 1], {
      ticksDistance: () => (2 * (B2.Y() - A2.Y())) / (B1.Y() - A1.Y()),
      minorTicks: 1,
      highlight: false,
      color: altColor,
    });
    board2.create("segment", [A2, [() => A2.X(), () => B2.Y()]], {
      strokeWidth: 6,
      color: "red",
      highlight: false,
    });

    // Second image
    const W = () => ((B2.X() - A2.X()) / (B1.X() - A1.X())) * SIZE;
    const H = () => ((B2.Y() - A2.Y()) / (B1.Y() - A1.Y())) * SIZE;

    const tTrans = board2.create(
      "transform",
      [
        () => A2.X() - (A1.X() / SIZE) * W(),
        () => B2.Y() - (B1.Y() / SIZE) * H(),
      ],
      {
        type: "translate",
      },
    );
    const tScale = board2.create(
      "transform",
      [
        () => (B2.X() - A2.X()) / (B1.X() - A1.X()),
        () => (B2.Y() - A2.Y()) / (B1.Y() - A1.Y()),
      ],
      { type: "scale" },
    );

    const im2 = board2.create(
      "image",
      ["/img/cowboy-emoji.png", [0, 0], [SIZE, SIZE]],
      {
        highlight: false,
        // cssClass: "-scale-x-100",
        opacity: 0.3,
      },
    );
    im2.transformations = [tScale, tTrans];
    // @ts-ignore
    im2.isDraggable = false;
    // im2.cssClass = "-scale-x-100";

    board1.addChild(board2);
    return () => {
      window.JXG.JSXGraph.freeBoard(board1);
      window.JXG.JSXGraph.freeBoard(board2);
    };
  }, [isDark]);

  return (
    <ExampleContainer
      title="Mapping between two 2D windows"
      instructions={`Drag the points ${m("A")} and ${m(
        "B",
      )} to adjust the input window, and points ${m("A'")} and ${m(
        "B'",
      )} to adjust the output window. Notice how the horizontal slice of the input window is mapped to the horizontal slice of the output window, and the vertical slice of the input window is mapped to the vertical slice of the output window.`}
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Container ref={inputRef} title="Input space" />
        <Container ref={outputRef} title="Output space" />
      </div>
    </ExampleContainer>
  );
}

const Container = forwardRef<HTMLDivElement, { title: string }>(
  ({ title }, ref) => (
    <div>
      <p className="mb-1 font-medium text-gray-700 dark:text-gray-300">
        {title}
      </p>
      <div
        ref={ref}
        className="aspect-square rounded overflow-hidden bg-gray-100 dark:bg-gray-600"
      />
    </div>
  ),
);

const SIZE = 10;
const PAD = 0.25;
