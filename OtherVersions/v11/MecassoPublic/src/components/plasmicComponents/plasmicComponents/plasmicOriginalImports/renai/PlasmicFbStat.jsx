// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: q7hWdoDc5Fm3y1TqrPvEG7
// Component: yZ8foFRq7JO
import * as React from "react";
import * as p from "@plasmicapp/react-web";
import {
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts
} from "@plasmicapp/react-web";
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_renai.module.css"; // plasmic-import: q7hWdoDc5Fm3y1TqrPvEG7/projectcss
import sty from "./PlasmicFbStat.module.css"; // plasmic-import: yZ8foFRq7JO/css
import image24Cw6FftSid from "./images/image24.png"; // plasmic-import: cw6FftSid/picture
import image11SGlvfvWa7 from "./images/image11.png"; // plasmic-import: sGlvfvWa7/picture

export const PlasmicFbStat__VariantProps = new Array();

export const PlasmicFbStat__ArgProps = new Array(
  "fbprofilepic",
  "fbusername",
  "fbemail"
);

function PlasmicFbStat__RenderFunc(props) {
  const { variants, args, overrides, forNode } = props;
  return true ? (
    <p.Stack
      as={"div"}
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      hasGap={true}
      className={classNames(
        projectcss.all,
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
        className={classNames(projectcss.all, sty.freeBox__oEpiG)}
      >
        <p.PlasmicImg
          data-plasmic-name={"img"}
          data-plasmic-override={overrides.img}
          alt={""}
          className={classNames(sty.img)}
          displayHeight={"34px"}
          displayMaxHeight={"none"}
          displayMaxWidth={"100%"}
          displayMinHeight={"0"}
          displayMinWidth={"0"}
          displayWidth={"34px"}
          loading={"lazy"}
          src={{
            src: image24Cw6FftSid,
            fullWidth: 1600,
            fullHeight: 1600,
            aspectRatio: undefined
          }}
        />

        <div
          data-plasmic-name={"text"}
          data-plasmic-override={overrides.text}
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text
          )}
        >
          {"Facebook"}
        </div>
      </p.Stack>

      <p.Stack
        as={"div"}
        hasGap={true}
        className={classNames(projectcss.all, sty.freeBox__kWkZ3)}
      >
        {true ? (
          <div className={classNames(projectcss.all, sty.freeBox__twjKm)}>
            {p.renderPlasmicSlot({
              defaultContents: (
                <p.PlasmicImg
                  alt={""}
                  className={classNames(sty.img__tPdd)}
                  displayHeight={"90px"}
                  displayMaxHeight={"none"}
                  displayMaxWidth={"100%"}
                  displayMinHeight={"0"}
                  displayMinWidth={"0"}
                  displayWidth={"90px"}
                  loading={"lazy"}
                  src={{
                    src: image11SGlvfvWa7,
                    fullWidth: 500,
                    fullHeight: 432,
                    aspectRatio: undefined
                  }}
                />
              ),

              value: args.fbprofilepic
            })}
          </div>
        ) : null}

        <div className={classNames(projectcss.all, sty.freeBox__kv13R)}>
          <div className={classNames(projectcss.all, sty.freeBox__msRfR)}>
            {p.renderPlasmicSlot({
              defaultContents: "si.by.surabhi",
              value: args.fbusername,
              className: classNames(sty.slotTargetFbusername)
            })}
          </div>

          <div className={classNames(projectcss.all, sty.freeBox___15Rgr)}>
            {p.renderPlasmicSlot({
              defaultContents: "jonepaul@gmail.com",
              value: args.fbemail,
              className: classNames(sty.slotTargetFbemail)
            })}
          </div>
        </div>
      </p.Stack>
    </p.Stack>
  ) : null;
}

const PlasmicDescendants = {
  root: ["root", "img", "text"],
  img: ["img"],
  text: ["text"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicFbStat__ArgProps,
      internalVariantPropNames: PlasmicFbStat__VariantProps
    });

    return PlasmicFbStat__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicFbStat";
  } else {
    func.displayName = `PlasmicFbStat.${nodeName}`;
  }
  return func;
}

export const PlasmicFbStat = Object.assign(
  // Top-level PlasmicFbStat renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    img: makeNodeComponent("img"),
    text: makeNodeComponent("text"),
    // Metadata about props expected for PlasmicFbStat
    internalVariantProps: PlasmicFbStat__VariantProps,
    internalArgProps: PlasmicFbStat__ArgProps
  }
);

export default PlasmicFbStat;
/* prettier-ignore-end */
