// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function RightArrowsvgIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 24 24"}
      fill={"currentColor"}
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

      <path
        d={
          "M14 4.93l-1.5 1.5L17.07 11H3v2h14.07l-4.57 4.57 1.5 1.5L21.07 12 14 4.93z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default RightArrowsvgIcon;
/* prettier-ignore-end */
