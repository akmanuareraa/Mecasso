// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function ShadowRoundNoBgsvg2Icon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 260 260"}
      height={"1em"}
      width={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path fill={"#E5E5E5"} d={"M0 0h260v260H0z"}></path>

      <g filter={"url(#wu_OOjw69a)"}>
        <circle
          cx={"130"}
          cy={"130"}
          r={"130"}
          fill={"url(#wu_OOjw69b)"}
        ></circle>
      </g>

      <defs>
        <linearGradient
          id={"wu_OOjw69b"}
          x1={"-5"}
          y1={"117"}
          x2={"155"}
          y2={"115"}
          gradientUnits={"userSpaceOnUse"}
        >
          <stop stopColor={"#DEDBF9"}></stop>

          <stop offset={"1"} stopColor={"#D2DEFD"}></stop>
        </linearGradient>

        <filter
          id={"wu_OOjw69a"}
          x={"-10"}
          y={"-10"}
          width={"280"}
          height={"280"}
          filterUnits={"userSpaceOnUse"}
          colorInterpolationFilters={"sRGB"}
        >
          <feFlood floodOpacity={"0"} result={"BackgroundImageFix"}></feFlood>

          <feBlend
            mode={"normal"}
            in={"SourceGraphic"}
            in2={"BackgroundImageFix"}
            result={"shape"}
          ></feBlend>

          <feColorMatrix
            in={"SourceAlpha"}
            type={"matrix"}
            values={"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}
            result={"hardAlpha"}
          ></feColorMatrix>

          <feOffset dx={"-10"} dy={"-10"}></feOffset>

          <feGaussianBlur stdDeviation={"10"}></feGaussianBlur>

          <feComposite
            in2={"hardAlpha"}
            operator={"arithmetic"}
            k2={"-1"}
            k3={"1"}
          ></feComposite>

          <feColorMatrix
            type={"matrix"}
            values={"0 0 0 0 0.8875 0 0 0 0 0.915625 0 0 0 0 1 0 0 0 1 0"}
          ></feColorMatrix>

          <feBlend
            mode={"normal"}
            in2={"shape"}
            result={"effect1_innerShadow_28_80"}
          ></feBlend>

          <feColorMatrix
            in={"SourceAlpha"}
            type={"matrix"}
            values={"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}
            result={"hardAlpha"}
          ></feColorMatrix>

          <feOffset dx={"10"} dy={"10"}></feOffset>

          <feGaussianBlur stdDeviation={"10"}></feGaussianBlur>

          <feComposite
            in2={"hardAlpha"}
            operator={"arithmetic"}
            k2={"-1"}
            k3={"1"}
          ></feComposite>

          <feColorMatrix
            type={"matrix"}
            values={
              "0 0 0 0 0.75026 0 0 0 0 0.791853 0 0 0 0 0.895833 0 0 0 1 0"
            }
          ></feColorMatrix>

          <feBlend
            mode={"normal"}
            in2={"effect1_innerShadow_28_80"}
            result={"effect2_innerShadow_28_80"}
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default ShadowRoundNoBgsvg2Icon;
/* prettier-ignore-end */
