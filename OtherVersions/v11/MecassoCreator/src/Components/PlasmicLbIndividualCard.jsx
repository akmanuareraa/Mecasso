// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: q7hWdoDc5Fm3y1TqrPvEG7
// Component: Kbrkie5P0-A
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
import sty from "./PlasmicLbIndividualCard.module.css"; // plasmic-import: Kbrkie5P0-A/css
import image5Q4EI4YqkM from "./image5.png"; // plasmic-import: q4eI4yqkM/picture

export const PlasmicLbIndividualCard__VariantProps = new Array(
  "highup",
  "highdown",
  "normalup",
  "normaldown"
);

export const PlasmicLbIndividualCard__ArgProps = new Array(
  "creatorname",
  "tokensymbol",
  "tradevolume",
  "profilepic"
);

function PlasmicLbIndividualCard__RenderFunc(props) {
  const { variants, args, overrides, forNode } = props;
  return (
    <p.Stack
      as={"div"}
      data-plasmic-name={"creatorbutton"}
      data-plasmic-override={overrides.creatorbutton}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      hasGap={true}
      className={classNames(
        projectcss.all,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_tokens,
        sty.creatorbutton,
        {
          [sty.creatorbuttonhighdown]: hasVariant(
            variants,
            "highdown",
            "highdown"
          ),

          [sty.creatorbuttonhighup]: hasVariant(variants, "highup", "highup")
        }
      )}
    >
      <div
        data-plasmic-name={"text"}
        data-plasmic-override={overrides.text}
        className={classNames(projectcss.all, projectcss.__wab_text, sty.text, {
          [sty.texthighdown]: hasVariant(variants, "highdown", "highdown"),
          [sty.texthighup]: hasVariant(variants, "highup", "highup"),
          [sty.textnormaldown]: hasVariant(variants, "normaldown", "normaldown")
        })}
      >
        {hasVariant(variants, "normaldown", "normaldown")
          ? "▼"
          : hasVariant(variants, "highdown", "highdown")
          ? "▼"
          : "▲"}
      </div>

      <div
        className={classNames(projectcss.all, sty.freeBox__n6Ps, {
          [sty.freeBoxhighup__n6PsWeFrz]: hasVariant(
            variants,
            "highup",
            "highup"
          )
        })}
      >
        {p.renderPlasmicSlot({
          defaultContents: (
            <p.PlasmicImg
              alt={""}
              className={classNames(sty.img__szaAx)}
              displayHeight={"45px"}
              displayMaxHeight={"45px"}
              displayMaxWidth={"45px"}
              displayMinHeight={"45px"}
              displayMinWidth={"45px"}
              displayWidth={"45px"}
              loading={"lazy"}
              src={{
                src: image5Q4EI4YqkM,
                fullWidth: 500,
                fullHeight: 750,
                aspectRatio: undefined
              }}
            />
          ),

          value: args.profilepic
        })}
      </div>

      <div className={classNames(projectcss.all, sty.freeBox__tTppa)}>
        {p.renderPlasmicSlot({
          defaultContents: "Lionel Messi",
          value: args.creatorname,
          className: classNames(sty.slotTargetCreatorname)
        })}
      </div>

      <div className={classNames(projectcss.all, sty.freeBox__zhJIy)}>
        {p.renderPlasmicSlot({
          defaultContents: "LMSI",
          value: args.tokensymbol,
          className: classNames(sty.slotTargetTokensymbol)
        })}
      </div>

      <div className={classNames(projectcss.all, sty.freeBox__yCds)}>
        {p.renderPlasmicSlot({
          defaultContents: "500000",
          value: args.tradevolume,
          className: classNames(sty.slotTargetTradevolume)
        })}
      </div>
    </p.Stack>
  );
}

const PlasmicDescendants = {
  creatorbutton: ["creatorbutton", "text"],
  text: ["text"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicLbIndividualCard__ArgProps,
      internalVariantPropNames: PlasmicLbIndividualCard__VariantProps
    });

    return PlasmicLbIndividualCard__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "creatorbutton") {
    func.displayName = "PlasmicLbIndividualCard";
  } else {
    func.displayName = `PlasmicLbIndividualCard.${nodeName}`;
  }
  return func;
}

export const PlasmicLbIndividualCard = Object.assign(
  // Top-level PlasmicLbIndividualCard renders the root element
  makeNodeComponent("creatorbutton"),
  {
    // Helper components rendering sub-elements
    text: makeNodeComponent("text"),
    // Metadata about props expected for PlasmicLbIndividualCard
    internalVariantProps: PlasmicLbIndividualCard__VariantProps,
    internalArgProps: PlasmicLbIndividualCard__ArgProps
  }
);

export default PlasmicLbIndividualCard;
/* prettier-ignore-end */