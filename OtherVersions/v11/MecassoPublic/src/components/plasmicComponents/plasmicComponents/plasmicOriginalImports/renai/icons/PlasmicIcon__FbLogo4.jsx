// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function FbLogo4Icon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 91 91"}
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
          "M66.206 34H52.889v-7.556c0-3.898.317-6.354 5.905-6.354h7.056V8.077a98.47 98.47 0 00-10.343-.521c-10.25 0-17.73 6.26-17.73 17.751V34H26.445v15.111l11.334-.004v34.004h15.11V49.1l11.584-.004L66.206 34z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default FbLogo4Icon;
/* prettier-ignore-end */
