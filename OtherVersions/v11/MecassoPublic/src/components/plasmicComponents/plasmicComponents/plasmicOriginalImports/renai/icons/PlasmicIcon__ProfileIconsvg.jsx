// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function ProfileIconsvgIcon(props) {
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
          "M15 3C8.373 3 3 8.373 3 15s5.373 12 12 12 12-5.373 12-12S21.627 3 15 3zM8 22.141c1.167-3.5 4.667-2.134 5.25-4.03v-1.264c-.262-.141-1.013-1.109-1.092-1.865-.207-.018-.531-.223-.627-1.034-.051-.435.153-.68.276-.757 0 0-.308-.702-.308-1.399C11.5 9.72 12.526 8 15 8c1.336 0 1.75.947 1.75.947 1.194 0 1.75 1.309 1.75 2.844 0 .765-.308 1.399-.308 1.399.124.077.328.322.277.757-.096.811-.42 1.016-.627 1.034-.079.756-.829 1.724-1.092 1.865v1.264c.583 1.897 4.083.531 5.25 4.031 0 0-2.618 2.859-7 2.859-4.407 0-7-2.859-7-2.859z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default ProfileIconsvgIcon;
/* prettier-ignore-end */
