// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function LikeFilledsvgIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 50 50"}
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
          "M25 44.297l-.637-.527c-1-.829-2.343-1.743-3.894-2.801C14.309 36.766 5 30.414 5 20.285 5 14.062 10.098 9 16.363 9c3.352 0 6.489 1.457 8.637 3.957A11.371 11.371 0 0133.637 9C39.902 9 45 14.063 45 20.285c0 10.13-9.309 16.48-15.469 20.684-1.554 1.058-2.894 1.972-3.894 2.8z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default LikeFilledsvgIcon;
/* prettier-ignore-end */
