// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function FbLogo3Icon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 34 34"}
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
          "M24.827 12.75h-4.994V9.917c0-1.462.12-2.383 2.215-2.383h2.646V3.029a36.928 36.928 0 00-3.879-.196c-3.843 0-6.648 2.348-6.648 6.657v3.26h-4.25v5.667l4.25-.002v12.752h5.666V18.412l4.344-.001.65-5.661z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default FbLogo3Icon;
/* prettier-ignore-end */
