// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function SharePostsvgIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 26 26"}
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
          "M21 0a5 5 0 00-5 5c0 .086.027.164.031.25L8.188 9.188C7.32 8.457 6.223 8 5 8a5 5 0 100 10c1.223 0 2.32-.457 3.188-1.188l7.843 3.938c-.004.086-.031.164-.031.25a5 5 0 105-5c-1.223 0-2.32.457-3.188 1.188L9.97 13.25c.004-.086.031-.164.031-.25s-.027-.164-.031-.25l7.844-3.938C18.68 9.543 19.776 10 21 10a5 5 0 100-10z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default SharePostsvgIcon;
/* prettier-ignore-end */
