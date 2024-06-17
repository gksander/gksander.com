import { ExampleContainer } from "@components/posts/ExampleContainer";
import { forwardRef, useEffect, useId, useRef } from "react";

export function BadZooming() {
  const inputRef = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const outputRef = useRef<HTMLDivElement>(null);
  const outputId = useId();

  useEffect(() => {
    if (typeof window === "undefined" || !window.JXG) return;

    const input = inputRef.current;
    const output = outputRef.current;

    if (!input || !output) return;
    input.id = inputId;
    output.id = outputId;

    // Bad zooming
    const board1 = window.JXG.JSXGraph.initBoard(inputId, {
      boundingBox: [0, SIZE, SIZE, 0],
      showCopyright: false,
      showInfobox: false,
      showNavigation: false,
      zoom: {
        min: 1,
        max: 10,
        wheel: false,
      },
      pan: { enabled: false },
    });

    input.addEventListener("wheel", (e) => {
      if (!(e instanceof WheelEvent)) return;
      e.preventDefault();

      e.deltaY < 0 ? board1.zoomIn(0, SIZE) : board1.zoomOut(0, SIZE);
    });
    input.addEventListener("click", () => {
      board1.zoom100();
    });

    const im = board1.create(
      "image",
      ["/img/cowboy-emoji.png", [0, 0], [SIZE, SIZE]],
      {
        isDraggable: false,
        active: false,
        highlight: false,
        opacity: 0.5,
      },
    ) as JXG.GeometryElement;
    // @ts-ignore
    im.isDraggable = false;

    const board2 = window.JXG.JSXGraph.initBoard(outputId, {
      boundingBox: [0, SIZE, SIZE, 0],
      showCopyright: false,
      showInfobox: false,
      showNavigation: false,
      zoom: {
        min: 1,
        max: 10,
        wheel: true,
        needShift: false,
      },
    });

    let sc2 = 1,
      tx2 = 0,
      ty2 = 0;

    const SC2 = () => sc2;
    const tScale2 = board2.create("transform", [SC2, SC2], { type: "scale" });
    const tTrans2 = board2.create("transform", [() => tx2, () => ty2], {
      type: "translate",
    });
    const im2 = board2.create(
      "image",
      ["/img/cowboy-emoji.png", [0, 0], [SIZE, SIZE]],
      {
        isDraggable: false,
        active: false,
        highlight: false,
        opacity: 0.5,
      },
    ) as JXG.GeometryElement;
    // @ts-ignore
    im2.isDraggable = false;
    im2.transformations = [tScale2, tTrans2];

    output.addEventListener("click", () => {
      board2.zoom100();
    });

    return () => {
      window.JXG.JSXGraph.freeBoard(board1);
      window.JXG.JSXGraph.freeBoard(board2);
    };
  }, []);

  return (
    <ExampleContainer
      title="Zooming with and without focal point preservation"
      instructions={`Use your mousewheel to zoom in and out. Click to reset zoom. Notice how zooming with focal point preservation feels more natural and less jarring.`}
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Container ref={outputRef} title={`With focal preservation`} />
        <Container ref={inputRef} title={`Without focal preservation`} />
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
