// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function DoughnutChartsvgIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 128 128"}
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
          "M64 6c-1.7 0-3 1.3-3 3v25c0 1.7 1.3 3 3 3 14.9 0 27 12.1 27 27 0 4.8-1.3 9.5-3.7 13.6-.4.7-.5 1.5-.3 2.3.2.8.7 1.4 1.4 1.8L110 94.2c.5.3 1 .4 1.5.4 1 0 2-.5 2.6-1.5 5.1-8.8 7.9-18.9 7.9-29.1 0-32-26-58-58-58zm-11.928 4.402a2.648 2.648 0 00-.672.098C27.1 16.2 9 38 9 64c0 5.4.8 10.6 2.2 15.5.6 1.8 2.7 2.7 4.4 1.7l17.3-9.9c1.1-.6 1.6-1.8 1.5-3-.3-1.4-.4-2.9-.4-4.3 0-12.7 7.9-23.6 19.1-28 1.2-.4 1.9-1.6 1.9-2.8V13.4c0-1.662-1.377-3.02-2.928-2.998zM67 12.1c27.3 1.6 49 24.2 49 51.9 0 8.2-1.9 16.2-5.6 23.5l-16.5-9.6c2-4.3 3.1-9.1 3.1-13.9 0-17.2-13.2-31.3-30-32.9v-19zM38.102 75.928a2.966 2.966 0 00-1.702.373L14.7 88.6c-.7.4-1.2 1-1.4 1.8-.2.8-.1 1.6.3 2.3C23.9 110.8 43.2 122 64 122c14.8 0 28.8-5.5 39.6-15.6 1.2-1.1 1.3-3 .1-4.2-1.1-1.3-3-1.3-4.2-.2-9.7 9-22.3 14-35.5 14-17.6 0-34-9-43.6-23.7l16.5-9.4C43.1 91.7 53.2 97 64 97c1.7 0 3-1.3 3-3s-1.3-3-3-3c-9.7 0-18.6-5.2-23.5-13.6-.5-.875-1.43-1.398-2.398-1.472zM81 86a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default DoughnutChartsvgIcon;
/* prettier-ignore-end */
