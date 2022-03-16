// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function Group18182Icon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 261 261"}
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

      <g filter={"url(#-jdc6XZdoa)"}>
        <circle cx={"138"} cy={"96"} r={"30"} fill={"currentColor"}></circle>
      </g>

      <defs>
        <filter
          id={"-jdc6XZdoa"}
          x={".891"}
          y={".733"}
          width={"259.937"}
          height={"259.937"}
          filterUnits={"userSpaceOnUse"}
          colorInterpolationFilters={"sRGB"}
        >
          <feFlood floodOpacity={"0"} result={"BackgroundImageFix"}></feFlood>

          <feGaussianBlur
            in={"BackgroundImage"}
            stdDeviation={"6.784"}
          ></feGaussianBlur>

          <feComposite
            in2={"SourceAlpha"}
            operator={"in"}
            result={"effect1_backgroundBlur_31_247"}
          ></feComposite>

          <feColorMatrix
            in={"SourceAlpha"}
            values={"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}
            result={"hardAlpha"}
          ></feColorMatrix>

          <feOffset dx={"-7.141"} dy={"34.701"}></feOffset>

          <feGaussianBlur stdDeviation={"49.984"}></feGaussianBlur>

          <feColorMatrix
            values={
              "0 0 0 0 0.492847 0 0 0 0 0.482361 0 0 0 0 0.629167 0 0 0 0.2 0"
            }
          ></feColorMatrix>

          <feBlend
            in2={"effect1_backgroundBlur_31_247"}
            result={"effect2_dropShadow_31_247"}
          ></feBlend>

          <feBlend
            in={"SourceGraphic"}
            in2={"effect2_dropShadow_31_247"}
            result={"shape"}
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default Group18182Icon;
/* prettier-ignore-end */
