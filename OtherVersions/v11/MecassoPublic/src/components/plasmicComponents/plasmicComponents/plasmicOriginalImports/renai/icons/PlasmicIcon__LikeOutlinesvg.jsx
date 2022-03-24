// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function LikeOutlinesvgIcon(props) {
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
          "M16.375 9C10.117 9 5 14.055 5 20.281c0 12.77 14.488 19.457 19.375 23.5l.625.532.625-.532C30.512 39.738 45 33.051 45 20.281 45 14.055 39.883 9 33.625 9c-3.477 0-6.54 1.613-8.625 4.063C22.914 10.613 19.852 9 16.375 9zm0 2a9.323 9.323 0 017.781 4.156l.844 1.25.844-1.25A9.323 9.323 0 0133.625 11C38.809 11 43 15.145 43 20.281c0 10.899-12.262 17.008-18 21.5-5.738-4.492-18-10.601-18-21.5C7 15.145 11.188 11 16.375 11z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default LikeOutlinesvgIcon;
/* prettier-ignore-end */
