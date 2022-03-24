// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function JewelCharmsvgIcon(props) {
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
          "M6.598 3L9.53 8h4.905l3.023-5H6.598zm-1.74.96L2 8h5.246L4.857 3.96zm14.322.061L16.773 8H22l-2.82-3.979zM2 10l9 12 .014-.047L8.232 10H2zm8.305 0l1.66 8.082L13.74 10h-3.435zm5.466 0l-2.775 11.99L13 22l9-12h-6.229z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default JewelCharmsvgIcon;
/* prettier-ignore-end */
