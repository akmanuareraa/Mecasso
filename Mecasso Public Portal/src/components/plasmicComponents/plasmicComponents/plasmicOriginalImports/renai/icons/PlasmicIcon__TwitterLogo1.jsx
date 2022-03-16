// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function TwitterLogo1Icon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 37 37"}
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
          "M34.533 8.556a13.13 13.13 0 01-3.779 1.036 6.59 6.59 0 002.893-3.64 13.192 13.192 0 01-4.179 1.597 6.58 6.58 0 00-11.38 4.5c0 .516.06 1.02.17 1.5-5.467-.275-10.314-2.894-13.56-6.875a6.563 6.563 0 00-.89 3.309 6.574 6.574 0 002.926 5.474 6.566 6.566 0 01-2.98-.822v.082a6.58 6.58 0 005.278 6.45 6.58 6.58 0 01-2.971.114 6.587 6.587 0 006.145 4.57 13.195 13.195 0 01-8.17 2.817c-.53 0-1.055-.031-1.57-.093A18.626 18.626 0 0012.55 31.53c12.102 0 18.717-10.024 18.717-18.718 0-.285-.006-.569-.018-.851a13.388 13.388 0 003.284-3.405z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default TwitterLogo1Icon;
/* prettier-ignore-end */
