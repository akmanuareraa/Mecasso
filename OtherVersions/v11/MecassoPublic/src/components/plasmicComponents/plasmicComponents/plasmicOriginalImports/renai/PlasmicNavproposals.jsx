// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: q7hWdoDc5Fm3y1TqrPvEG7
// Component: s9MDnPLue4Q
import * as React from "react";
import * as p from "@plasmicapp/react-web";
import {
  hasVariant,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts
} from "@plasmicapp/react-web";
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_renai.module.css"; // plasmic-import: q7hWdoDc5Fm3y1TqrPvEG7/projectcss
import sty from "./PlasmicNavproposals.module.css"; // plasmic-import: s9MDnPLue4Q/css
import DocumentsvgIcon from "./icons/PlasmicIcon__Documentsvg"; // plasmic-import: YBA9fDzn_/icon

export const PlasmicNavproposals__VariantProps = new Array(
  "lbtoggle",
  "feedtoggle",
  "portfoliotoggle",
  "txntoggle",
  "proposaltoggle"
);

export const PlasmicNavproposals__ArgProps = new Array();

function PlasmicNavproposals__RenderFunc(props) {
  const { variants, args, overrides, forNode } = props;
  return true ? (
    <p.Stack
      as={"button"}
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      hasGap={true}
      className={classNames(
        projectcss.all,
        projectcss.button,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_mixins,
        projectcss.plasmic_tokens,
        sty.root
      )}
    >
      <p.Stack
        as={"div"}
        hasGap={true}
        className={classNames(projectcss.all, sty.freeBox__iIKhx)}
      >
        <DocumentsvgIcon
          data-plasmic-name={"svg"}
          data-plasmic-override={overrides.svg}
          className={classNames(projectcss.all, sty.svg, {
            [sty.svgfeedtoggle]: hasVariant(
              variants,
              "feedtoggle",
              "feedtoggle"
            ),

            [sty.svglbtoggle]: hasVariant(variants, "lbtoggle", "lbtoggle"),
            [sty.svgportfoliotoggle]: hasVariant(
              variants,
              "portfoliotoggle",
              "portfoliotoggle"
            ),

            [sty.svgproposaltoggle]: hasVariant(
              variants,
              "proposaltoggle",
              "proposaltoggle"
            ),

            [sty.svgtxntoggle]: hasVariant(variants, "txntoggle", "txntoggle")
          })}
          role={"img"}
        />

        <div
          data-plasmic-name={"text"}
          data-plasmic-override={overrides.text}
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text,
            {
              [sty.textfeedtoggle]: hasVariant(
                variants,
                "feedtoggle",
                "feedtoggle"
              ),

              [sty.textlbtoggle]: hasVariant(variants, "lbtoggle", "lbtoggle"),
              [sty.textportfoliotoggle]: hasVariant(
                variants,
                "portfoliotoggle",
                "portfoliotoggle"
              ),

              [sty.textproposaltoggle]: hasVariant(
                variants,
                "proposaltoggle",
                "proposaltoggle"
              ),

              [sty.texttxntoggle]: hasVariant(
                variants,
                "txntoggle",
                "txntoggle"
              )
            }
          )}
        >
          {"Proposals"}
        </div>
      </p.Stack>

      <div
        className={classNames(projectcss.all, sty.freeBox___2X5TU, {
          [sty.freeBoxfeedtoggle___2X5TU90Ocr]: hasVariant(
            variants,
            "feedtoggle",
            "feedtoggle"
          ),

          [sty.freeBoxlbtoggle___2X5TUeBf5N]: hasVariant(
            variants,
            "lbtoggle",
            "lbtoggle"
          ),

          [sty.freeBoxportfoliotoggle___2X5TUap9Hf]: hasVariant(
            variants,
            "portfoliotoggle",
            "portfoliotoggle"
          ),

          [sty.freeBoxproposaltoggle___2X5TU6E85]: hasVariant(
            variants,
            "proposaltoggle",
            "proposaltoggle"
          ),

          [sty.freeBoxtxntoggle___2X5TUaQ6VW]: hasVariant(
            variants,
            "txntoggle",
            "txntoggle"
          )
        })}
      />
    </p.Stack>
  ) : null;
}

const PlasmicDescendants = {
  root: ["root", "svg", "text"],
  svg: ["svg"],
  text: ["text"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicNavproposals__ArgProps,
      internalVariantPropNames: PlasmicNavproposals__VariantProps
    });

    return PlasmicNavproposals__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicNavproposals";
  } else {
    func.displayName = `PlasmicNavproposals.${nodeName}`;
  }
  return func;
}

export const PlasmicNavproposals = Object.assign(
  // Top-level PlasmicNavproposals renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    svg: makeNodeComponent("svg"),
    text: makeNodeComponent("text"),
    // Metadata about props expected for PlasmicNavproposals
    internalVariantProps: PlasmicNavproposals__VariantProps,
    internalArgProps: PlasmicNavproposals__ArgProps
  }
);

export default PlasmicNavproposals;
/* prettier-ignore-end */
