// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function BuySendTxnFailsvgIcon(props) {
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
          "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.7 13.3l-1.4 1.4-3.3-3.3-3.3 3.3-1.4-1.4 3.3-3.3-3.3-3.3 1.4-1.4 3.3 3.3 3.3-3.3 1.4 1.4-3.3 3.3 3.3 3.3z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default BuySendTxnFailsvgIcon;
/* prettier-ignore-end */
