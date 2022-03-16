// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function TransactionsvgIcon(props) {
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
          "M19 3l1 7 2.246-1.873A9.938 9.938 0 0125 15c0 5.535-4.465 10-10 10S5 20.535 5 15a1 1 0 10-2 0c0 6.615 5.385 12 12 12s12-5.385 12-12c0-3.148-1.228-6.01-3.217-8.152L26 5l-7-2zm-5.273.068l-.098.014-.734.516-.026.896.703.557.352.01.1-.014.732-.516.025-.896-.7-.557-.354-.01zM9.803 4.23l-.332.12-.086.048-.498.747.3.843.856.266.332-.117.088-.051.496-.746-.3-.844-.856-.266zM7.148 6.81l-.894.052-.27.229-.062.076-.203.873.578.686.894-.055.27-.227.062-.076.204-.873-.579-.685zM14 9v1.62c-1.385.307-2.254 1.243-2.254 2.556 0 1.305.766 2.117 2.326 2.443l1.116.238c1.05.226 1.476.54 1.476 1.086 0 .647-.659 1.098-1.59 1.098-1.009 0-1.71-.445-1.793-1.139h-1.73c.054 1.321.978 2.224 2.449 2.5V21h2v-1.602c1.532-.29 2.45-1.25 2.45-2.68 0-1.327-.74-2.07-2.462-2.433l-1.033-.219c-1.003-.213-1.41-.517-1.41-1.045 0-.653.592-1.068 1.488-1.068.866 0 1.495.451 1.578 1.127h1.686c-.044-1.243-.947-2.163-2.297-2.465V9h-2zm-9.285 1.232l-.819.368-.17.308-.033.094.121.889.784.433.818-.367.17-.309.033-.093-.121-.889-.783-.434z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default TransactionsvgIcon;
/* prettier-ignore-end */
