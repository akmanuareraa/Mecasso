// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: q7hWdoDc5Fm3y1TqrPvEG7
// Component: 38Z1OQ4oEu
import * as React from "react";
import {
  hasVariant,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts
} from "@plasmicapp/react-web";
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_renai.module.css"; // plasmic-import: q7hWdoDc5Fm3y1TqrPvEG7/projectcss
import sty from "./PlasmicVotebutton.module.css"; // plasmic-import: 38Z1OQ4oEu/css

export const PlasmicVotebutton__VariantProps = new Array("disabled");

export const PlasmicVotebutton__ArgProps = new Array();

function PlasmicVotebutton__RenderFunc(props) {
  const { variants, args, overrides, forNode } = props;
  return (
    <button
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(
        projectcss.all,
        projectcss.button,
        projectcss.__wab_text,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_tokens,
        sty.root,
        { [sty.rootdisabled]: hasVariant(variants, "disabled", "disabled") }
      )}
    >
      {"VOTE"}
    </button>
  );
}

const PlasmicDescendants = {
  root: ["root"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicVotebutton__ArgProps,
      internalVariantPropNames: PlasmicVotebutton__VariantProps
    });

    return PlasmicVotebutton__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicVotebutton";
  } else {
    func.displayName = `PlasmicVotebutton.${nodeName}`;
  }
  return func;
}

export const PlasmicVotebutton = Object.assign(
  // Top-level PlasmicVotebutton renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    // Metadata about props expected for PlasmicVotebutton
    internalVariantProps: PlasmicVotebutton__VariantProps,
    internalArgProps: PlasmicVotebutton__ArgProps
  }
);

export default PlasmicVotebutton;
/* prettier-ignore-end */
