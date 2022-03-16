// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function ThumbsUpsvgIcon(props) {
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
          "M14.17 1.613a1.5 1.5 0 00-1.057.442l-5.529 5.54A1.999 1.999 0 007 9.009V19a2 2 0 002 2h8.992a2 2 0 001.838-1.21l3.008-7.003a2 2 0 00.162-.789V10a2 2 0 00-2-2h-6.352l.995-4.564a1.503 1.503 0 00-1.473-1.823zM2 9a1 1 0 00-1 1v10a1 1 0 001 1h2a1 1 0 001-1V10a1 1 0 00-1-1H2z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default ThumbsUpsvgIcon;
/* prettier-ignore-end */
