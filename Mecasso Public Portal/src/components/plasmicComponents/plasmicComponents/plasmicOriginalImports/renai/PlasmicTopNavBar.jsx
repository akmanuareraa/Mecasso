// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: q7hWdoDc5Fm3y1TqrPvEG7
// Component: 2FmHKYp2yyp
import * as React from "react";
import * as p from "@plasmicapp/react-web";
import {
  hasVariant,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
  ensureGlobalVariants
} from "@plasmicapp/react-web";
import Button from "../../../Button"; // plasmic-import: hUmGidH7taW/component
import { useScreenVariants as useScreenVariantsifq4PdpMk2Y } from "./PlasmicGlobalVariant__Screen"; // plasmic-import: IFQ4PdpMK2Y/globalVariant
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_renai.module.css"; // plasmic-import: q7hWdoDc5Fm3y1TqrPvEG7/projectcss
import sty from "./PlasmicTopNavBar.module.css"; // plasmic-import: 2FmHKYp2yyp/css
import RenaiLogoSymbolsvgIcon from "./icons/PlasmicIcon__RenaiLogoSymbolsvg"; // plasmic-import: kWdS79nZ4/icon

export const PlasmicTopNavBar__VariantProps = new Array("loggedin");

export const PlasmicTopNavBar__ArgProps = new Array("navbarprofilepic");

function PlasmicTopNavBar__RenderFunc(props) {
  const { variants, args, overrides, forNode } = props;
  const globalVariants = ensureGlobalVariants({
    screen: useScreenVariantsifq4PdpMk2Y()
  });

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
        projectcss.plasmic_tokens,
        sty.root,
        { [sty.rootloggedin]: hasVariant(variants, "loggedin", "loggedin") }
      )}
    >
      {true ? (
        <p.Stack
          as={"a"}
          data-plasmic-name={"logobutton"}
          data-plasmic-override={overrides.logobutton}
          hasGap={true}
          className={classNames(projectcss.all, projectcss.a, sty.logobutton, {
            [sty.logobuttonloggedin]: hasVariant(
              variants,
              "loggedin",
              "loggedin"
            )
          })}
          href={"https://mecasso.live"}
        >
          <RenaiLogoSymbolsvgIcon
            data-plasmic-name={"svg"}
            data-plasmic-override={overrides.svg}
            className={classNames(projectcss.all, sty.svg)}
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
                [sty.textloggedin]: hasVariant(variants, "loggedin", "loggedin")
              }
            )}
          >
            {hasVariant(variants, "loggedin", "loggedin")
              ? "Mecasso"
              : "Mecasso"}
          </div>
        </p.Stack>
      ) : null}
      {false ? (
        <div
          data-plasmic-name={"profilebutton2"}
          data-plasmic-override={overrides.profilebutton2}
          className={classNames(projectcss.all, sty.profilebutton2)}
        />
      ) : null}
      {(hasVariant(variants, "loggedin", "loggedin") ? true : true) ? (
        <p.Stack
          as={"div"}
          hasGap={true}
          className={classNames(projectcss.all, sty.freeBox__wNdZu, {
            [sty.freeBoxloggedin__wNdZuChSJa]: hasVariant(
              variants,
              "loggedin",
              "loggedin"
            )
          })}
        >
          {(
            hasVariant(variants, "loggedin", "loggedin") &&
            hasVariant(globalVariants, "screen", "desktop")
              ? true
              : hasVariant(variants, "loggedin", "loggedin")
              ? true
              : hasVariant(globalVariants, "screen", "desktop")
              ? true
              : true
          ) ? (
            <p.Stack
              as={"div"}
              hasGap={true}
              className={classNames(projectcss.all, sty.freeBox__xTeE, {
                [sty.freeBoxloggedin__xTeEChSJa]: hasVariant(
                  variants,
                  "loggedin",
                  "loggedin"
                )
              })}
            >
              <button
                data-plasmic-name={"dtleaderboardbutton"}
                data-plasmic-override={overrides.dtleaderboardbutton}
                className={classNames(
                  projectcss.all,
                  projectcss.button,
                  projectcss.__wab_text,
                  sty.dtleaderboardbutton,
                  {
                    [sty.dtleaderboardbuttonloggedin]: hasVariant(
                      variants,
                      "loggedin",
                      "loggedin"
                    )
                  }
                )}
              >
                {"Leaderboard"}
              </button>

              <button
                data-plasmic-name={"dtsocialfeedbutton"}
                data-plasmic-override={overrides.dtsocialfeedbutton}
                className={classNames(
                  projectcss.all,
                  projectcss.button,
                  projectcss.__wab_text,
                  sty.dtsocialfeedbutton,
                  {
                    [sty.dtsocialfeedbuttonloggedin]: hasVariant(
                      variants,
                      "loggedin",
                      "loggedin"
                    )
                  }
                )}
              >
                {"Social Feed"}
              </button>

              <button
                data-plasmic-name={"dtportfoliobutton"}
                data-plasmic-override={overrides.dtportfoliobutton}
                className={classNames(
                  projectcss.all,
                  projectcss.button,
                  projectcss.__wab_text,
                  sty.dtportfoliobutton,
                  {
                    [sty.dtportfoliobuttonloggedin]: hasVariant(
                      variants,
                      "loggedin",
                      "loggedin"
                    )
                  }
                )}
              >
                {"Portfolio"}
              </button>

              <button
                data-plasmic-name={"dttransactionsbutton"}
                data-plasmic-override={overrides.dttransactionsbutton}
                className={classNames(
                  projectcss.all,
                  projectcss.button,
                  projectcss.__wab_text,
                  sty.dttransactionsbutton,
                  {
                    [sty.dttransactionsbuttonloggedin]: hasVariant(
                      variants,
                      "loggedin",
                      "loggedin"
                    )
                  }
                )}
              >
                {"Transactions"}
              </button>

              <button
                data-plasmic-name={"dtproposalsbutton"}
                data-plasmic-override={overrides.dtproposalsbutton}
                className={classNames(
                  projectcss.all,
                  projectcss.button,
                  projectcss.__wab_text,
                  sty.dtproposalsbutton,
                  {
                    [sty.dtproposalsbuttonloggedin]: hasVariant(
                      variants,
                      "loggedin",
                      "loggedin"
                    )
                  }
                )}
              >
                {"Proposals"}
              </button>
            </p.Stack>
          ) : null}
          {(hasVariant(variants, "loggedin", "loggedin") ? true : true) ? (
            <Button
              data-plasmic-name={"signupbutton"}
              data-plasmic-override={overrides.signupbutton}
              className={classNames("__wab_instance", sty.signupbutton, {
                [sty.signupbuttonloggedin]: hasVariant(
                  variants,
                  "loggedin",
                  "loggedin"
                )
              })}
            />
          ) : null}
          {(hasVariant(variants, "loggedin", "loggedin") ? true : false) ? (
            <div
              data-plasmic-name={"profilebutton"}
              data-plasmic-override={overrides.profilebutton}
              className={classNames(projectcss.all, sty.profilebutton, {
                [sty.profilebuttonloggedin]: hasVariant(
                  variants,
                  "loggedin",
                  "loggedin"
                )
              })}
            >
              {(hasVariant(variants, "loggedin", "loggedin") ? true : true) ? (
                <div
                  className={classNames(projectcss.all, sty.freeBox__prRXn, {
                    [sty.freeBoxloggedin__prRXnChSJa]: hasVariant(
                      variants,
                      "loggedin",
                      "loggedin"
                    )
                  })}
                >
                  {p.renderPlasmicSlot({
                    defaultContents: null,
                    value: args.navbarprofilepic
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
        </p.Stack>
      ) : null}
    </p.Stack>
  ) : null;
}

const PlasmicDescendants = {
  root: [
    "root",
    "logobutton",
    "svg",
    "text",
    "profilebutton2",
    "dtleaderboardbutton",
    "dtsocialfeedbutton",
    "dtportfoliobutton",
    "dttransactionsbutton",
    "dtproposalsbutton",
    "signupbutton",
    "profilebutton"
  ],

  logobutton: ["logobutton", "svg", "text"],
  svg: ["svg"],
  text: ["text"],
  profilebutton2: ["profilebutton2"],
  dtleaderboardbutton: ["dtleaderboardbutton"],
  dtsocialfeedbutton: ["dtsocialfeedbutton"],
  dtportfoliobutton: ["dtportfoliobutton"],
  dttransactionsbutton: ["dttransactionsbutton"],
  dtproposalsbutton: ["dtproposalsbutton"],
  signupbutton: ["signupbutton"],
  profilebutton: ["profilebutton"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicTopNavBar__ArgProps,
      internalVariantPropNames: PlasmicTopNavBar__VariantProps
    });

    return PlasmicTopNavBar__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicTopNavBar";
  } else {
    func.displayName = `PlasmicTopNavBar.${nodeName}`;
  }
  return func;
}

export const PlasmicTopNavBar = Object.assign(
  // Top-level PlasmicTopNavBar renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    logobutton: makeNodeComponent("logobutton"),
    svg: makeNodeComponent("svg"),
    text: makeNodeComponent("text"),
    profilebutton2: makeNodeComponent("profilebutton2"),
    dtleaderboardbutton: makeNodeComponent("dtleaderboardbutton"),
    dtsocialfeedbutton: makeNodeComponent("dtsocialfeedbutton"),
    dtportfoliobutton: makeNodeComponent("dtportfoliobutton"),
    dttransactionsbutton: makeNodeComponent("dttransactionsbutton"),
    dtproposalsbutton: makeNodeComponent("dtproposalsbutton"),
    signupbutton: makeNodeComponent("signupbutton"),
    profilebutton: makeNodeComponent("profilebutton"),
    // Metadata about props expected for PlasmicTopNavBar
    internalVariantProps: PlasmicTopNavBar__VariantProps,
    internalArgProps: PlasmicTopNavBar__ArgProps
  }
);

export default PlasmicTopNavBar;
/* prettier-ignore-end */
