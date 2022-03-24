// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function DownArrowsvgIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 26 26"}
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
          "M13.5 0C6.602 0 1 5.602 1 12.5S6.602 25 13.5 25 26 19.398 26 12.5 20.398 0 13.5 0zm0 1.813c5.898 0 10.688 4.789 10.688 10.687S19.398 23.188 13.5 23.188c-5.898 0-10.688-4.79-10.688-10.688 0-5.898 4.79-10.688 10.688-10.688zM12 6v9.313l-4-4v2.78l5.5 5.5 5.5-5.5v-2.78l-4 4V6z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default DownArrowsvgIcon;
/* prettier-ignore-end */
