// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function ThumbsDownsvgIcon(props) {
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
          "M2 2a1 1 0 00-1 1v10a1 1 0 001 1h2a1 1 0 001-1V3a1 1 0 00-1-1H2zm7 0a2 2 0 00-2 2v9.992c0 .53.21 1.037.584 1.412l5.53 5.541a1.501 1.501 0 002.529-1.38L14.648 15H21a2 2 0 002-2v-1.998a2 2 0 00-.162-.79l-3.008-7A2 2 0 0017.992 2H9z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default ThumbsDownsvgIcon;
/* prettier-ignore-end */
