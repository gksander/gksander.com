import { SimpleImageContainer } from "@components/posts/SimpleImageContainer";

export function CanvasWindowDiagram() {
  return (
    <SimpleImageContainer>
      <svg
        width="544"
        className="w-full"
        viewBox="0 0 544 243"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_13_93)">
          <path
            d="M37.8471 179.25L101.5 69L165.153 179.25H37.8471Z"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="5"
          />
          <rect
            x="8.5"
            y="28.5"
            width="199"
            height="199"
            stroke="currentColor"
          />
          <rect
            x="328.5"
            y="28.5"
            width="199"
            height="199"
            stroke="currentColor"
          />
          <rect
            x="63"
            y="49"
            width="78"
            height="78"
            rx="3"
            stroke="currentColor"
            strokeWidth="2"
          />
          <text fill="currentColor" fontSize="14" letterSpacing="0em">
            <tspan x="8" y="19.5909">
              300x300 image
            </tspan>
          </text>
          <text fill="currentColor" fontSize="14" letterSpacing="0em">
            <tspan x="328" y="19.5909">
              300x300 &#60;canvas /&#62;
            </tspan>
          </text>
          <text fill="currentColor" fontSize="14" letterSpacing="0em">
            <tspan x="62" y="44.5909">
              Input &#x201c;window&#x201d;
            </tspan>
          </text>
          <text fill="currentColor" fontSize="14" letterSpacing="0em">
            <tspan x="339" y="51.5909">
              Output &#x201c;window&#x201d;
            </tspan>
          </text>
          <path
            d="M332 104L317.811 94.0662L316.303 111.321L332 104ZM148.869 89.4943L318.421 104.318L318.682 101.33L149.131 86.5057L148.869 89.4943Z"
            fill="currentColor"
          />
          <rect
            x="333.5"
            y="32.5"
            width="190"
            height="191"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="3"
          />
          <mask
            id="mask0_13_93"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="259"
            y="67"
            width="341"
            height="295"
          >
            <path
              d="M263.623 358.875L429.25 72L594.877 358.875H263.623Z"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="5"
            />
          </mask>
          <g mask="url(#mask0_13_93)">
            <rect
              x="332"
              y="31"
              width="193"
              height="194"
              rx="4"
              fill="currentColor"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_13_93">
            <rect width="544" height="243" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SimpleImageContainer>
  );
}
