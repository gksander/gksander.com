import { SimpleImageContainer } from "@components/posts/SimpleImageContainer";

export function WindowMappingIntroDiagram() {
  return (
    <SimpleImageContainer>
      <svg
        width="556"
        viewBox="0 0 556 265"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-full"
      >
        <rect
          x="17.5"
          y="50.5"
          width="199"
          height="199"
          stroke="currentColor"
        />
        <rect
          x="337.5"
          y="50.5"
          width="199"
          height="199"
          stroke="currentColor"
        />
        <rect
          x="89"
          y="130"
          width="78"
          height="76"
          rx="3"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text
          fill="currentColor"
          style={{ whiteSpace: "pre" }}
          fontSize="14"
          letterSpacing="0em"
        >
          <tspan x="22" y="38.5909">
            Input space
          </tspan>
        </text>
        <text
          fill="currentColor"
          style={{ whiteSpace: "pre" }}
          fontSize="14"
          letterSpacing="0em"
        >
          <tspan x="337" y="35.5909">
            output space
          </tspan>
        </text>
        <text
          fill="currentColor"
          style={{ whiteSpace: "pre" }}
          fontSize="14"
          letterSpacing="0em"
        >
          <tspan x="78" y="118.591">
            Input &#x201c;window&#x201d;
          </tspan>
        </text>
        <text
          fill="currentColor"
          style={{ whiteSpace: "pre" }}
          fontSize="14"
          letterSpacing="0em"
        >
          <tspan x="357" y="76.5909">
            Output &#x201c;window&#x201d;
          </tspan>
        </text>
        <rect
          x="358"
          y="86"
          width="158"
          height="143"
          rx="3"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M351 93L334.454 87.8794L338.292 104.769L351 93ZM175.332 134.463L338.168 97.4546L337.503 94.5292L174.668 131.537L175.332 134.463Z"
          fill="currentColor"
        />
        <path
          d="M351 224L337.249 213.469L335.004 230.644L351 224ZM174.806 202.487L337.419 223.738L337.808 220.763L175.194 199.513L174.806 202.487Z"
          fill="currentColor"
        />
      </svg>
    </SimpleImageContainer>
  );
}
