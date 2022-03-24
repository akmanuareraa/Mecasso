// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function Polygon4Icon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 207 195"}
      height={"1em"}
      width={"1em"}
      style={{
        fill: "currentcolor",
        ...(style || {}),
      }}
      className={classNames("plasmic-default__svg", className)}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <g filter={"url(#pK7OCT2jha)"}>
        <path
          d={"M103.452 10l93.056 174.773H10.396L103.452 10z"}
          fill={"currentColor"}
          fillOpacity={".23"}
        ></path>
      </g>

      <defs>
        <filter
          id={"pK7OCT2jha"}
          x={".396"}
          y={"0"}
          width={"206.112"}
          height={"194.773"}
          filterUnits={"userSpaceOnUse"}
          colorInterpolationFilters={"sRGB"}
        >
          <feFlood floodOpacity={"0"} result={"BackgroundImageFix"}></feFlood>

          <feBlend
            in={"SourceGraphic"}
            in2={"BackgroundImageFix"}
            result={"shape"}
          ></feBlend>

          <feGaussianBlur
            stdDeviation={"5"}
            result={"effect1_foregroundBlur_27_282"}
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
}

export default Polygon4Icon;
/* prettier-ignore-end */
