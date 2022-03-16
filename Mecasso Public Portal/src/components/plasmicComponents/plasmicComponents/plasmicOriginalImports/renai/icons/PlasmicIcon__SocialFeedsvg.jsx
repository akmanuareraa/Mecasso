// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function SocialFeedsvgIcon(props) {
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
          "M15.023 3.93a1 1 0 00-.341.05l-12 4.036a1 1 0 000 1.896l12 4.035a1 1 0 00.636 0l12-4.035a1 1 0 000-1.896l-12-4.036a1 1 0 00-.295-.05zm12.022 8.029a1 1 0 00-.363.057L15 15.946l-11.682-3.93a1 1 0 00-.636 1.896l12 4.035a1 1 0 00.636 0l12-4.035a1 1 0 00-.273-1.953zm0 4a1 1 0 00-.363.057L15 19.946l-11.682-3.93a1 1 0 10-.636 1.896l12 4.035a1 1 0 00.636 0l12-4.035a1 1 0 00-.273-1.953zm0 4a1 1 0 00-.363.057L15 23.946l-11.682-3.93a1 1 0 10-.636 1.896l12 4.035a1 1 0 00.636 0l12-4.035a1 1 0 00-.273-1.953z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default SocialFeedsvgIcon;
/* prettier-ignore-end */
