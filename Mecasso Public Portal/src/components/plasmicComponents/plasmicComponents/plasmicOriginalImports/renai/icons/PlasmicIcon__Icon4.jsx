// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function Icon4Icon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      version={"1.1"}
      xmlSpace={"preserve"}
      viewBox={"0 0 256 256"}
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

      <g
        stroke={"none"}
        strokeWidth={"0"}
        strokeDasharray={"none"}
        strokeLinecap={"butt"}
        strokeLinejoin={"miter"}
        strokeMiterlimit={"10"}
        fill={"none"}
        fillRule={"nonzero"}
        opacity={"1"}
      >
        <path
          d={
            "M90.665 166.648L209.232 48.082a7.595 7.595 0 000-10.741L176.079 4.188a7.595 7.595 0 00-10.742 0L46.771 122.754a7.595 7.595 0 000 10.741l33.153 33.153a7.595 7.595 0 0010.741 0z"
          }
          opacity={"1"}
        ></path>

        <path
          d={
            "M90.665 89.352l118.567 118.566a7.595 7.595 0 010 10.741l-33.153 33.153a7.595 7.595 0 01-10.742 0L46.771 133.246a7.595 7.595 0 010-10.741l33.153-33.153a7.595 7.595 0 0110.741 0z"
          }
          opacity={"1"}
        ></path>
      </g>
    </svg>
  );
}

export default Icon4Icon;
/* prettier-ignore-end */
