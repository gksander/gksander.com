import { OptimizedImage } from "@components/OptimizedImage";
import { LOGOS as _LOGOS } from "@components/homepage/Logos";
import type { OptimizedImageDetails } from "src/utils/getOptimizedImageSrc";

type Props = {
  title: string;
  description?: string;
  headshot: OptimizedImageDetails;
};

export function Hero({ title, description, headshot }: Props) {
  return (
    <section className="bg-gradient-to-br from-accent to-accent-light rounded-xl overflow-hidden text-white flex flex-col sm:flex-row justify-end items-end">
      <div className="p-6 flex flex-1 flex-col gap-y-6 self-start sm:self-end">
        <div className="flex flex-col gap-y-1">
          <div className="text-2xl font-medium text-background">I'm Grant.</div>
          <h1 className="text-4xl sm:text-5xl font-bold font-fancy bg-white font-brick">
            {title}
          </h1>
        </div>
        {description && <p className="text-sm">{description}</p>}
      </div>
      <div className="flex-shrink-0">
        <div
          className="relative flex justify-end items-end text-background"
          style={{ width: `${TOTAL_WIDTH}px`, height: `${TOTAL_WIDTH}px` }}
        >
          <div className="absolute inset-0">
            {LOGOS.map((Logo, index) => {
              const { left, top } = getCoords(index, LOGOS.length);

              let maskImage: string | undefined = undefined;

              // if (index === 0) {
              //   const { left: nextLeft, top: nextTop } = getCoords(1);
              //   const angle =
              //     Math.PI / 2 + Math.atan2(top - nextTop, nextLeft - left);
              //   maskImage = `linear-gradient(${angle}rad, rgba(0,0,0,1), rgba(0,0,0,0) 50%)`;
              // } else if (index === LOGOS.length - 1) {
              //   const { left: prevLeft, top: prevTop } = getCoords(index - 1);
              //   const angle =
              //     Math.PI / 2 + Math.atan2(prevTop - top, left - prevLeft);
              //   maskImage = `linear-gradient(${angle}rad, rgba(0,0,0,1), rgba(0,0,0,0) 50%)`;
              // }

              return (
                <Logo
                  key={index}
                  style={{
                    left,
                    top,
                    maskImage,
                  }}
                />
              );
            })}
          </div>

          <OptimizedImage
            image={headshot}
            alt="Grant's ugly face"
            style={{ width: `${HEADSHOT_WIDTH}px` }}
          />
        </div>
      </div>
    </section>
  );
}

// Control these
const TOTAL_WIDTH = 350;
export const HEADSHOT_WIDTH = 260;
const TRACK_RADIUS = 240;
const START_ANGLE = 3.4; // rad
const END_ANGLE = 1.2; // rad
const TURN = 0.75;

// These are computed
const LOGO_TRACK_X = TOTAL_WIDTH - TRACK_RADIUS * Math.cos(END_ANGLE);
const LOGO_TRACK_Y = TOTAL_WIDTH + TRACK_RADIUS * Math.sin(START_ANGLE);

const { HTMLLogo, CSSLogo, TSLogo, ReactLogo, TWLogo, NodeLogo, PythonLogo } =
  _LOGOS;

const LOGOS = [
  HTMLLogo,
  CSSLogo,
  TSLogo,
  ReactLogo,
  TWLogo,
  NodeLogo,
  PythonLogo,
  // TODO: couple more logos here
  PythonLogo,
  PythonLogo,
].toReversed();

function getCoords(i: number, N: number = LOGOS.length) {
  const t = i / (N - 1);
  const angle = (1 - t) * (START_ANGLE + TURN) + t * END_ANGLE;

  const left = `calc(${LOGO_TRACK_X}px + ${TRACK_RADIUS}px * cos(${angle}rad - var(--scroll, 0) * ${TURN}rad))`;
  const top = `calc(${LOGO_TRACK_Y}px - ${TRACK_RADIUS}px * sin(${angle}rad - var(--scroll, 0) * ${TURN}rad))`;

  return { left, top, opacity: 0.1 };
}
