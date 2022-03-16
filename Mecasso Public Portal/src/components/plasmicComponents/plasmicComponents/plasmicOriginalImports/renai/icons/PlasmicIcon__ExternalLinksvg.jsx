// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function ExternalLinksvgIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 50 50"}
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
          "M37 4.004c-2.305 0-4.61.878-6.365 2.633l-5 5c-2.492 2.492-3.204 6.09-2.156 9.226l3.591-3.592a4.95 4.95 0 011.393-2.806l5-5A4.993 4.993 0 0137 8.002c1.28 0 2.561.488 3.535 1.463a5.006 5.006 0 010 7.07l-5 5a4.954 4.954 0 01-2.806 1.393l-3.594 3.593a8.974 8.974 0 009.229-2.158l5-5c3.51-3.509 3.508-9.217 0-12.726A8.975 8.975 0 0037 4.004zM30.96 16.98a2 2 0 00-1.374.606l-12 12a2 2 0 102.828 2.828l12-12a2 2 0 00-1.453-3.434zm-12.51 6.043a8.957 8.957 0 00-6.813 2.612l-5 5c-3.51 3.509-3.51 9.22 0 12.728A8.974 8.974 0 0013 45.994a8.972 8.972 0 006.363-2.633l5-5c2.492-2.492 3.206-6.09 2.158-9.226l-3.593 3.594a4.95 4.95 0 01-1.393 2.806l-5 5a5.004 5.004 0 01-7.07 0 5.006 5.006 0 010-7.07l5-5a4.96 4.96 0 012.806-1.395l3.592-3.591a9.072 9.072 0 00-2.414-.456z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default ExternalLinksvgIcon;
/* prettier-ignore-end */
