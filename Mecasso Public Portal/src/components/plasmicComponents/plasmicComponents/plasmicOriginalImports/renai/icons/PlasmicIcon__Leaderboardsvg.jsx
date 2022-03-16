// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function LeaderboardsvgIcon(props) {
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
          "M7.807 3a.8.8 0 00-.567 1.365l.99.99L3.707 9.88a1 1 0 001.414 1.414L9.645 6.77l.99.99A.8.8 0 0012 7.193V3.801A.801.801 0 0011.2 3H7.806zM19.5 3A1.5 1.5 0 0018 4.5v15a1.5 1.5 0 003 0v-15A1.5 1.5 0 0019.5 3zm-5 8a1.5 1.5 0 00-1.5 1.5v7a1.5 1.5 0 003 0v-7a1.5 1.5 0 00-1.5-1.5zm-5 4A1.5 1.5 0 008 16.5v3a1.5 1.5 0 003 0v-3A1.5 1.5 0 009.5 15zm-5 2A1.5 1.5 0 003 18.5v1a1.5 1.5 0 003 0v-1A1.5 1.5 0 004.5 17z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default LeaderboardsvgIcon;
/* prettier-ignore-end */
