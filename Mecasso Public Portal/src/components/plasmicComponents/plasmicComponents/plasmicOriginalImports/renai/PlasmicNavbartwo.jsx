// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: q7hWdoDc5Fm3y1TqrPvEG7
// Component: jF1x-X1nWSN
import * as React from "react";
import * as p from "@plasmicapp/react-web";
import {
  hasVariant,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts
} from "@plasmicapp/react-web";
import Navlb from "../../../Navlb"; // plasmic-import: fXH2_Fxbhwf/component
import Navfeed from "../../../Navfeed"; // plasmic-import: EEZbiOYEIeX/component
import Navportfolio from "../../../Navportfolio"; // plasmic-import: Q0V_0uzKUkU/component
import Navtxns from "../../../Navtxns"; // plasmic-import: NDD8Sm8rUkf/component
import Navproposals from "../../../Navproposals"; // plasmic-import: s9MDnPLue4Q/component
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_renai.module.css"; // plasmic-import: q7hWdoDc5Fm3y1TqrPvEG7/projectcss
import sty from "./PlasmicNavbartwo.module.css"; // plasmic-import: jF1x-X1nWSN/css
import LeaderboardsvgIcon from "./icons/PlasmicIcon__Leaderboardsvg"; // plasmic-import: E2qL9DKvG/icon

export const PlasmicNavbartwo__VariantProps = new Array(
  "notloggedin",
  "profileoverlay",
  "authoverlay",
  "lbtoggle",
  "feedtoggle",
  "portfoliotoggle",
  "txntoggle",
  "proposaltoggle"
);

export const PlasmicNavbartwo__ArgProps = new Array();

function PlasmicNavbartwo__RenderFunc(props) {
  const { variants, args, overrides, forNode } = props;
  return true ? (
    <div
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(
        projectcss.all,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_tokens,
        sty.root,
        {
          [sty.rootauthoverlay]: hasVariant(
            variants,
            "authoverlay",
            "authoverlay"
          ),

          [sty.rootfeedtoggle]: hasVariant(
            variants,
            "feedtoggle",
            "feedtoggle"
          ),

          [sty.rootlbtoggle]: hasVariant(variants, "lbtoggle", "lbtoggle"),
          [sty.rootnotloggedin]: hasVariant(
            variants,
            "notloggedin",
            "notloggedin"
          ),

          [sty.rootportfoliotoggle]: hasVariant(
            variants,
            "portfoliotoggle",
            "portfoliotoggle"
          ),

          [sty.rootprofileoverlay]: hasVariant(
            variants,
            "profileoverlay",
            "profileoverlay"
          ),

          [sty.rootproposaltoggle]: hasVariant(
            variants,
            "proposaltoggle",
            "proposaltoggle"
          ),

          [sty.roottxntoggle]: hasVariant(variants, "txntoggle", "txntoggle")
        }
      )}
    >
      {(
        hasVariant(variants, "authoverlay", "authoverlay")
          ? false
          : hasVariant(variants, "profileoverlay", "profileoverlay")
          ? false
          : hasVariant(variants, "notloggedin", "notloggedin")
          ? false
          : true
      ) ? (
        <p.Stack
          as={"div"}
          data-plasmic-name={"navbar"}
          data-plasmic-override={overrides.navbar}
          hasGap={true}
          className={classNames(projectcss.all, sty.navbar, {
            [sty.navbarauthoverlay]: hasVariant(
              variants,
              "authoverlay",
              "authoverlay"
            ),

            [sty.navbarfeedtoggle]: hasVariant(
              variants,
              "feedtoggle",
              "feedtoggle"
            ),

            [sty.navbarlbtoggle]: hasVariant(variants, "lbtoggle", "lbtoggle"),
            [sty.navbarnotloggedin]: hasVariant(
              variants,
              "notloggedin",
              "notloggedin"
            ),

            [sty.navbarportfoliotoggle]: hasVariant(
              variants,
              "portfoliotoggle",
              "portfoliotoggle"
            ),

            [sty.navbarprofileoverlay]: hasVariant(
              variants,
              "profileoverlay",
              "profileoverlay"
            ),

            [sty.navbarproposaltoggle]: hasVariant(
              variants,
              "proposaltoggle",
              "proposaltoggle"
            ),

            [sty.navbartxntoggle]: hasVariant(
              variants,
              "txntoggle",
              "txntoggle"
            )
          })}
        >
          {true ? (
            <Navlb
              data-plasmic-name={"lbbutton"}
              data-plasmic-override={overrides.lbbutton}
              className={classNames("__wab_instance", sty.lbbutton, {
                [sty.lbbuttonfeedtoggle]: hasVariant(
                  variants,
                  "feedtoggle",
                  "feedtoggle"
                ),

                [sty.lbbuttonlbtoggle]: hasVariant(
                  variants,
                  "lbtoggle",
                  "lbtoggle"
                ),

                [sty.lbbuttonportfoliotoggle]: hasVariant(
                  variants,
                  "portfoliotoggle",
                  "portfoliotoggle"
                ),

                [sty.lbbuttonproposaltoggle]: hasVariant(
                  variants,
                  "proposaltoggle",
                  "proposaltoggle"
                ),

                [sty.lbbuttontxntoggle]: hasVariant(
                  variants,
                  "txntoggle",
                  "txntoggle"
                )
              })}
              feedtoggle={
                hasVariant(variants, "feedtoggle", "feedtoggle")
                  ? true
                  : undefined
              }
              lbtoggle={
                hasVariant(variants, "lbtoggle", "lbtoggle") ? true : undefined
              }
              portfoliotoggle={
                hasVariant(variants, "portfoliotoggle", "portfoliotoggle")
                  ? true
                  : undefined
              }
              proposaltoggle={
                hasVariant(variants, "proposaltoggle", "proposaltoggle")
                  ? true
                  : undefined
              }
              slot={
                <LeaderboardsvgIcon
                  data-plasmic-name={"svg"}
                  data-plasmic-override={overrides.svg}
                  className={classNames(projectcss.all, sty.svg, {
                    [sty.svgfeedtoggle]: hasVariant(
                      variants,
                      "feedtoggle",
                      "feedtoggle"
                    ),

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

                    [sty.svgtxntoggle]: hasVariant(
                      variants,
                      "txntoggle",
                      "txntoggle"
                    )
                  })}
                  role={"img"}
                />
              }
              txntoggle={
                hasVariant(variants, "txntoggle", "txntoggle")
                  ? true
                  : undefined
              }
            >
              {"Leaderboard"}
            </Navlb>
          ) : null}
          {true ? (
            <Navfeed
              data-plasmic-name={"feedbutton"}
              data-plasmic-override={overrides.feedbutton}
              className={classNames("__wab_instance", sty.feedbutton, {
                [sty.feedbuttonfeedtoggle]: hasVariant(
                  variants,
                  "feedtoggle",
                  "feedtoggle"
                ),

                [sty.feedbuttonlbtoggle]: hasVariant(
                  variants,
                  "lbtoggle",
                  "lbtoggle"
                ),

                [sty.feedbuttonportfoliotoggle]: hasVariant(
                  variants,
                  "portfoliotoggle",
                  "portfoliotoggle"
                ),

                [sty.feedbuttonproposaltoggle]: hasVariant(
                  variants,
                  "proposaltoggle",
                  "proposaltoggle"
                ),

                [sty.feedbuttontxntoggle]: hasVariant(
                  variants,
                  "txntoggle",
                  "txntoggle"
                )
              })}
              feedtoggle={
                hasVariant(variants, "feedtoggle", "feedtoggle")
                  ? true
                  : undefined
              }
              lbtoggle={
                hasVariant(variants, "lbtoggle", "lbtoggle") ? true : undefined
              }
              portfoliotoggle={
                hasVariant(variants, "portfoliotoggle", "portfoliotoggle")
                  ? true
                  : undefined
              }
              proposaltoggle={
                hasVariant(variants, "proposaltoggle", "proposaltoggle")
                  ? true
                  : undefined
              }
              txntoggle={
                hasVariant(variants, "txntoggle", "txntoggle")
                  ? true
                  : undefined
              }
            />
          ) : null}
          {true ? (
            <Navportfolio
              data-plasmic-name={"portfoliobutton"}
              data-plasmic-override={overrides.portfoliobutton}
              className={classNames("__wab_instance", sty.portfoliobutton, {
                [sty.portfoliobuttonfeedtoggle]: hasVariant(
                  variants,
                  "feedtoggle",
                  "feedtoggle"
                ),

                [sty.portfoliobuttonlbtoggle]: hasVariant(
                  variants,
                  "lbtoggle",
                  "lbtoggle"
                ),

                [sty.portfoliobuttonportfoliotoggle]: hasVariant(
                  variants,
                  "portfoliotoggle",
                  "portfoliotoggle"
                ),

                [sty.portfoliobuttonproposaltoggle]: hasVariant(
                  variants,
                  "proposaltoggle",
                  "proposaltoggle"
                ),

                [sty.portfoliobuttontxntoggle]: hasVariant(
                  variants,
                  "txntoggle",
                  "txntoggle"
                )
              })}
              feedtoggle={
                hasVariant(variants, "feedtoggle", "feedtoggle")
                  ? true
                  : undefined
              }
              lbtoggle={
                hasVariant(variants, "lbtoggle", "lbtoggle") ? true : undefined
              }
              portfoliotoggle={
                hasVariant(variants, "portfoliotoggle", "portfoliotoggle")
                  ? true
                  : undefined
              }
              proposaltoggle={
                hasVariant(variants, "proposaltoggle", "proposaltoggle")
                  ? true
                  : undefined
              }
              txntoggle={
                hasVariant(variants, "txntoggle", "txntoggle")
                  ? true
                  : undefined
              }
            />
          ) : null}
          {true ? (
            <Navtxns
              data-plasmic-name={"txnsbutton"}
              data-plasmic-override={overrides.txnsbutton}
              className={classNames("__wab_instance", sty.txnsbutton, {
                [sty.txnsbuttonfeedtoggle]: hasVariant(
                  variants,
                  "feedtoggle",
                  "feedtoggle"
                ),

                [sty.txnsbuttonlbtoggle]: hasVariant(
                  variants,
                  "lbtoggle",
                  "lbtoggle"
                ),

                [sty.txnsbuttonportfoliotoggle]: hasVariant(
                  variants,
                  "portfoliotoggle",
                  "portfoliotoggle"
                ),

                [sty.txnsbuttonproposaltoggle]: hasVariant(
                  variants,
                  "proposaltoggle",
                  "proposaltoggle"
                ),

                [sty.txnsbuttontxntoggle]: hasVariant(
                  variants,
                  "txntoggle",
                  "txntoggle"
                )
              })}
              feedtoggle={
                hasVariant(variants, "feedtoggle", "feedtoggle")
                  ? true
                  : undefined
              }
              lbtoggle={
                hasVariant(variants, "lbtoggle", "lbtoggle") ? true : undefined
              }
              portfoliotoggle={
                hasVariant(variants, "portfoliotoggle", "portfoliotoggle")
                  ? true
                  : undefined
              }
              proposaltoggle={
                hasVariant(variants, "proposaltoggle", "proposaltoggle")
                  ? true
                  : undefined
              }
              txntoggle={
                hasVariant(variants, "txntoggle", "txntoggle")
                  ? true
                  : undefined
              }
            />
          ) : null}
          {true ? (
            <Navproposals
              data-plasmic-name={"proposalbutton"}
              data-plasmic-override={overrides.proposalbutton}
              className={classNames("__wab_instance", sty.proposalbutton, {
                [sty.proposalbuttonfeedtoggle]: hasVariant(
                  variants,
                  "feedtoggle",
                  "feedtoggle"
                ),

                [sty.proposalbuttonlbtoggle]: hasVariant(
                  variants,
                  "lbtoggle",
                  "lbtoggle"
                ),

                [sty.proposalbuttonportfoliotoggle]: hasVariant(
                  variants,
                  "portfoliotoggle",
                  "portfoliotoggle"
                ),

                [sty.proposalbuttonproposaltoggle]: hasVariant(
                  variants,
                  "proposaltoggle",
                  "proposaltoggle"
                ),

                [sty.proposalbuttontxntoggle]: hasVariant(
                  variants,
                  "txntoggle",
                  "txntoggle"
                )
              })}
              feedtoggle={
                hasVariant(variants, "feedtoggle", "feedtoggle")
                  ? true
                  : undefined
              }
              lbtoggle={
                hasVariant(variants, "lbtoggle", "lbtoggle") ? true : undefined
              }
              portfoliotoggle={
                hasVariant(variants, "portfoliotoggle", "portfoliotoggle")
                  ? true
                  : undefined
              }
              proposaltoggle={
                hasVariant(variants, "proposaltoggle", "proposaltoggle")
                  ? true
                  : undefined
              }
              txntoggle={
                hasVariant(variants, "txntoggle", "txntoggle")
                  ? true
                  : undefined
              }
            />
          ) : null}
        </p.Stack>
      ) : null}
    </div>
  ) : null;
}

const PlasmicDescendants = {
  root: [
    "root",
    "navbar",
    "lbbutton",
    "svg",
    "feedbutton",
    "portfoliobutton",
    "txnsbutton",
    "proposalbutton"
  ],

  navbar: [
    "navbar",
    "lbbutton",
    "svg",
    "feedbutton",
    "portfoliobutton",
    "txnsbutton",
    "proposalbutton"
  ],

  lbbutton: ["lbbutton", "svg"],
  svg: ["svg"],
  feedbutton: ["feedbutton"],
  portfoliobutton: ["portfoliobutton"],
  txnsbutton: ["txnsbutton"],
  proposalbutton: ["proposalbutton"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicNavbartwo__ArgProps,
      internalVariantPropNames: PlasmicNavbartwo__VariantProps
    });

    return PlasmicNavbartwo__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicNavbartwo";
  } else {
    func.displayName = `PlasmicNavbartwo.${nodeName}`;
  }
  return func;
}

export const PlasmicNavbartwo = Object.assign(
  // Top-level PlasmicNavbartwo renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    navbar: makeNodeComponent("navbar"),
    lbbutton: makeNodeComponent("lbbutton"),
    svg: makeNodeComponent("svg"),
    feedbutton: makeNodeComponent("feedbutton"),
    portfoliobutton: makeNodeComponent("portfoliobutton"),
    txnsbutton: makeNodeComponent("txnsbutton"),
    proposalbutton: makeNodeComponent("proposalbutton"),
    // Metadata about props expected for PlasmicNavbartwo
    internalVariantProps: PlasmicNavbartwo__VariantProps,
    internalArgProps: PlasmicNavbartwo__ArgProps
  }
);

export default PlasmicNavbartwo;
/* prettier-ignore-end */
