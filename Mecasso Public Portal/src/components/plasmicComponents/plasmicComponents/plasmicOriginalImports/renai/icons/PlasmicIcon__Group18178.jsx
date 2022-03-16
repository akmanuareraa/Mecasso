// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function Group18178Icon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 307 48"}
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
          "M0 20C0 8.954 8.954 0 20 0h267c11.046 0 20 8.954 20 20v8c0 11.046-8.954 20-20 20H20C8.954 48 0 39.046 0 28v-8z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default Group18178Icon;
/* prettier-ignore-end */
