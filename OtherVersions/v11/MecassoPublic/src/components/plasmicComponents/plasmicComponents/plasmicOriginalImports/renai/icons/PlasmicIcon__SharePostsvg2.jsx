// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function SharePostsvg2Icon(props) {
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
          "M20 0c-2.21 0-4 1.79-4 4 0 .277.04.55.094.813L7 9.375A3.965 3.965 0 004 8c-2.21 0-4 1.79-4 4s1.79 4 4 4a3.965 3.965 0 003-1.375l9.094 4.563A3.984 3.984 0 0016 20c0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4a3.965 3.965 0 00-3 1.375l-9.094-4.563c.055-.26.094-.535.094-.812s-.04-.55-.094-.813L17 6.625A3.965 3.965 0 0020 8c2.21 0 4-1.79 4-4s-1.79-4-4-4z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default SharePostsvg2Icon;
/* prettier-ignore-end */
