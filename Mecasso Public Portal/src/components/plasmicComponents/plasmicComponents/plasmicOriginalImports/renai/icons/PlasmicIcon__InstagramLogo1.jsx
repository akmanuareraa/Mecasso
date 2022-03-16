// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function InstagramLogo1Icon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 37 37"}
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
          "M11.84 2.22c-5.306 0-9.62 4.314-9.62 9.62v13.32c0 5.306 4.314 9.62 9.62 9.62h13.32c5.306 0 9.62-4.314 9.62-9.62V11.84c0-5.306-4.314-9.62-9.62-9.62H11.84zm15.54 5.92c.814 0 1.48.666 1.48 1.48s-.666 1.48-1.48 1.48-1.48-.666-1.48-1.48.666-1.48 1.48-1.48zm-8.88 2.22a8.145 8.145 0 018.14 8.14 8.145 8.145 0 01-8.14 8.14 8.145 8.145 0 01-8.14-8.14 8.145 8.145 0 018.14-8.14zm0 1.48c-3.67 0-6.66 2.99-6.66 6.66s2.99 6.66 6.66 6.66 6.66-2.99 6.66-6.66-2.99-6.66-6.66-6.66z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default InstagramLogo1Icon;
/* prettier-ignore-end */
