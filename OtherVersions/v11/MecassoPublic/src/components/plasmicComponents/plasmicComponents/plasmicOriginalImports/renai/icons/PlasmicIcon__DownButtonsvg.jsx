// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function DownButtonsvgIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 30 30"}
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
          "M27 15c0-6.627-5.373-12-12-12S3 8.373 3 15s5.373 12 12 12 12-5.373 12-12zm-12.707 4.707l-6-6a.997.997 0 010-1.414.999.999 0 011.414 0L15 17.586l5.293-5.293a.999.999 0 111.414 1.414l-6 6a.999.999 0 01-1.414 0z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default DownButtonsvgIcon;
/* prettier-ignore-end */
