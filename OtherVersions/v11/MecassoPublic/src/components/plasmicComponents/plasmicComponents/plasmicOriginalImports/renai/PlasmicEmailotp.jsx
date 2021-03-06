// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: q7hWdoDc5Fm3y1TqrPvEG7
// Component: 9TAJOpZCudj
import * as React from "react";
import * as p from "@plasmicapp/react-web";
import {
  hasVariant,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts
} from "@plasmicapp/react-web";
import TextInput from "../../../TextInput"; // plasmic-import: QSTyVh7IuMa/component
import Successmessage from "../../../Successmessage"; // plasmic-import: Hz33POcv8Jw/component
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_renai.module.css"; // plasmic-import: q7hWdoDc5Fm3y1TqrPvEG7/projectcss
import sty from "./PlasmicEmailotp.module.css"; // plasmic-import: 9TAJOpZCudj/css

export const PlasmicEmailotp__VariantProps = new Array(
  "fotpverification",
  "phoneverificationsuccess",
  "emailverification",
  "mobileotpsuccess",
  "emailotpsuccess"
);

export const PlasmicEmailotp__ArgProps = new Array();

function PlasmicEmailotp__RenderFunc(props) {
  const { variants, args, overrides, forNode } = props;
  return (
    hasVariant(variants, "emailotpsuccess", "emailotpsuccess")
      ? true
      : hasVariant(variants, "mobileotpsuccess", "mobileotpsuccess")
      ? true
      : hasVariant(variants, "emailverification", "emailverification")
      ? true
      : hasVariant(
          variants,
          "phoneverificationsuccess",
          "phoneverificationsuccess"
        )
      ? true
      : hasVariant(variants, "fotpverification", "fotpverification")
      ? true
      : true
  ) ? (
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
        sty.root,
        {
          [sty.rootemailotpsuccess]: hasVariant(
            variants,
            "emailotpsuccess",
            "emailotpsuccess"
          ),

          [sty.rootemailverification]: hasVariant(
            variants,
            "emailverification",
            "emailverification"
          ),

          [sty.rootfotpverification]: hasVariant(
            variants,
            "fotpverification",
            "fotpverification"
          ),

          [sty.rootmobileotpsuccess]: hasVariant(
            variants,
            "mobileotpsuccess",
            "mobileotpsuccess"
          ),

          [sty.rootphoneverificationsuccess]: hasVariant(
            variants,
            "phoneverificationsuccess",
            "phoneverificationsuccess"
          )
        }
      )}
    >
      {(
        hasVariant(variants, "emailotpsuccess", "emailotpsuccess")
          ? true
          : hasVariant(variants, "mobileotpsuccess", "mobileotpsuccess")
          ? true
          : hasVariant(variants, "emailverification", "emailverification")
          ? true
          : hasVariant(
              variants,
              "phoneverificationsuccess",
              "phoneverificationsuccess"
            )
          ? true
          : hasVariant(variants, "fotpverification", "fotpverification")
          ? true
          : true
      ) ? (
        <TextInput
          data-plasmic-name={"firstname2"}
          data-plasmic-override={overrides.firstname2}
          className={classNames("__wab_instance", sty.firstname2, {
            [sty.firstname2emailotpsuccess]: hasVariant(
              variants,
              "emailotpsuccess",
              "emailotpsuccess"
            ),

            [sty.firstname2emailverification]: hasVariant(
              variants,
              "emailverification",
              "emailverification"
            ),

            [sty.firstname2fotpverification]: hasVariant(
              variants,
              "fotpverification",
              "fotpverification"
            ),

            [sty.firstname2mobileotpsuccess]: hasVariant(
              variants,
              "mobileotpsuccess",
              "mobileotpsuccess"
            ),

            [sty.firstname2phoneverificationsuccess]: hasVariant(
              variants,
              "phoneverificationsuccess",
              "phoneverificationsuccess"
            )
          })}
          isDisabled={true}
        />
      ) : null}
      {(
        hasVariant(variants, "emailotpsuccess", "emailotpsuccess")
          ? true
          : hasVariant(variants, "mobileotpsuccess", "mobileotpsuccess")
          ? true
          : hasVariant(variants, "emailverification", "emailverification")
          ? true
          : hasVariant(
              variants,
              "phoneverificationsuccess",
              "phoneverificationsuccess"
            )
          ? true
          : hasVariant(variants, "fotpverification", "fotpverification")
          ? true
          : true
      ) ? (
        <TextInput
          data-plasmic-name={"lastname2"}
          data-plasmic-override={overrides.lastname2}
          className={classNames("__wab_instance", sty.lastname2, {
            [sty.lastname2emailotpsuccess]: hasVariant(
              variants,
              "emailotpsuccess",
              "emailotpsuccess"
            ),

            [sty.lastname2emailverification]: hasVariant(
              variants,
              "emailverification",
              "emailverification"
            ),

            [sty.lastname2fotpverification]: hasVariant(
              variants,
              "fotpverification",
              "fotpverification"
            ),

            [sty.lastname2mobileotpsuccess]: hasVariant(
              variants,
              "mobileotpsuccess",
              "mobileotpsuccess"
            ),

            [sty.lastname2phoneverificationsuccess]: hasVariant(
              variants,
              "phoneverificationsuccess",
              "phoneverificationsuccess"
            )
          })}
        />
      ) : null}
      {(
        hasVariant(variants, "emailotpsuccess", "emailotpsuccess")
          ? true
          : hasVariant(variants, "mobileotpsuccess", "mobileotpsuccess")
          ? true
          : hasVariant(variants, "emailverification", "emailverification")
          ? true
          : hasVariant(
              variants,
              "phoneverificationsuccess",
              "phoneverificationsuccess"
            )
          ? true
          : hasVariant(variants, "fotpverification", "fotpverification")
          ? true
          : true
      ) ? (
        <TextInput
          data-plasmic-name={"username2"}
          data-plasmic-override={overrides.username2}
          className={classNames("__wab_instance", sty.username2, {
            [sty.username2emailotpsuccess]: hasVariant(
              variants,
              "emailotpsuccess",
              "emailotpsuccess"
            ),

            [sty.username2emailverification]: hasVariant(
              variants,
              "emailverification",
              "emailverification"
            ),

            [sty.username2fotpverification]: hasVariant(
              variants,
              "fotpverification",
              "fotpverification"
            ),

            [sty.username2mobileotpsuccess]: hasVariant(
              variants,
              "mobileotpsuccess",
              "mobileotpsuccess"
            ),

            [sty.username2phoneverificationsuccess]: hasVariant(
              variants,
              "phoneverificationsuccess",
              "phoneverificationsuccess"
            )
          })}
        />
      ) : null}
      {(
        hasVariant(variants, "emailotpsuccess", "emailotpsuccess")
          ? true
          : hasVariant(variants, "mobileotpsuccess", "mobileotpsuccess")
          ? true
          : hasVariant(variants, "emailverification", "emailverification")
          ? true
          : hasVariant(
              variants,
              "phoneverificationsuccess",
              "phoneverificationsuccess"
            )
          ? true
          : hasVariant(variants, "fotpverification", "fotpverification")
          ? true
          : true
      ) ? (
        <TextInput
          data-plasmic-name={"email2"}
          data-plasmic-override={overrides.email2}
          className={classNames("__wab_instance", sty.email2, {
            [sty.email2emailotpsuccess]: hasVariant(
              variants,
              "emailotpsuccess",
              "emailotpsuccess"
            ),

            [sty.email2emailverification]: hasVariant(
              variants,
              "emailverification",
              "emailverification"
            ),

            [sty.email2fotpverification]: hasVariant(
              variants,
              "fotpverification",
              "fotpverification"
            ),

            [sty.email2mobileotpsuccess]: hasVariant(
              variants,
              "mobileotpsuccess",
              "mobileotpsuccess"
            ),

            [sty.email2phoneverificationsuccess]: hasVariant(
              variants,
              "phoneverificationsuccess",
              "phoneverificationsuccess"
            )
          })}
        />
      ) : null}
      {(
        hasVariant(variants, "emailotpsuccess", "emailotpsuccess")
          ? true
          : hasVariant(variants, "mobileotpsuccess", "mobileotpsuccess")
          ? true
          : hasVariant(variants, "emailverification", "emailverification")
          ? true
          : hasVariant(
              variants,
              "phoneverificationsuccess",
              "phoneverificationsuccess"
            )
          ? true
          : hasVariant(variants, "fotpverification", "fotpverification")
          ? true
          : true
      ) ? (
        <TextInput
          data-plasmic-name={"phonenumber2"}
          data-plasmic-override={overrides.phonenumber2}
          className={classNames("__wab_instance", sty.phonenumber2, {
            [sty.phonenumber2emailotpsuccess]: hasVariant(
              variants,
              "emailotpsuccess",
              "emailotpsuccess"
            ),

            [sty.phonenumber2emailverification]: hasVariant(
              variants,
              "emailverification",
              "emailverification"
            ),

            [sty.phonenumber2fotpverification]: hasVariant(
              variants,
              "fotpverification",
              "fotpverification"
            ),

            [sty.phonenumber2mobileotpsuccess]: hasVariant(
              variants,
              "mobileotpsuccess",
              "mobileotpsuccess"
            ),

            [sty.phonenumber2phoneverificationsuccess]: hasVariant(
              variants,
              "phoneverificationsuccess",
              "phoneverificationsuccess"
            )
          })}
        />
      ) : null}
      {(
        hasVariant(variants, "emailotpsuccess", "emailotpsuccess")
          ? true
          : hasVariant(variants, "mobileotpsuccess", "mobileotpsuccess")
          ? true
          : hasVariant(variants, "emailverification", "emailverification")
          ? true
          : hasVariant(
              variants,
              "phoneverificationsuccess",
              "phoneverificationsuccess"
            )
          ? true
          : hasVariant(variants, "fotpverification", "fotpverification")
          ? true
          : true
      ) ? (
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__jBtkr,
            {
              [sty.textemailotpsuccess__jBtkRntqmf]: hasVariant(
                variants,
                "emailotpsuccess",
                "emailotpsuccess"
              ),

              [sty.textemailverification__jBtkRo54VA]: hasVariant(
                variants,
                "emailverification",
                "emailverification"
              ),

              [sty.textfotpverification__jBtkrrpXtG]: hasVariant(
                variants,
                "fotpverification",
                "fotpverification"
              ),

              [sty.textmobileotpsuccess__jBtkRgWt5H]: hasVariant(
                variants,
                "mobileotpsuccess",
                "mobileotpsuccess"
              ),

              [sty.textphoneverificationsuccess__jBtkRkgMnl]: hasVariant(
                variants,
                "phoneverificationsuccess",
                "phoneverificationsuccess"
              )
            }
          )}
        >
          {"An OTP has been sent to your registered email address"}
        </div>
      ) : null}
      {(
        hasVariant(variants, "emailotpsuccess", "emailotpsuccess")
          ? true
          : hasVariant(variants, "mobileotpsuccess", "mobileotpsuccess")
          ? true
          : hasVariant(variants, "emailverification", "emailverification")
          ? true
          : hasVariant(
              variants,
              "phoneverificationsuccess",
              "phoneverificationsuccess"
            )
          ? true
          : hasVariant(variants, "fotpverification", "fotpverification")
          ? true
          : true
      ) ? (
        <TextInput
          data-plasmic-name={"emailotp"}
          data-plasmic-override={overrides.emailotp}
          className={classNames("__wab_instance", sty.emailotp, {
            [sty.emailotpemailotpsuccess]: hasVariant(
              variants,
              "emailotpsuccess",
              "emailotpsuccess"
            ),

            [sty.emailotpemailverification]: hasVariant(
              variants,
              "emailverification",
              "emailverification"
            ),

            [sty.emailotpfotpverification]: hasVariant(
              variants,
              "fotpverification",
              "fotpverification"
            ),

            [sty.emailotpmobileotpsuccess]: hasVariant(
              variants,
              "mobileotpsuccess",
              "mobileotpsuccess"
            ),

            [sty.emailotpphoneverificationsuccess]: hasVariant(
              variants,
              "phoneverificationsuccess",
              "phoneverificationsuccess"
            )
          })}
        />
      ) : null}
      {(
        hasVariant(variants, "emailotpsuccess", "emailotpsuccess") ? true : true
      ) ? (
        <Successmessage
          data-plasmic-name={"successmessage"}
          data-plasmic-override={overrides.successmessage}
          className={classNames("__wab_instance", sty.successmessage, {
            [sty.successmessageemailotpsuccess]: hasVariant(
              variants,
              "emailotpsuccess",
              "emailotpsuccess"
            )
          })}
          errormessage={
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text__uPSdU
              )}
            >
              {"Email ID verified successfully"}
            </div>
          }
        />
      ) : null}
    </p.Stack>
  ) : null;
}

const PlasmicDescendants = {
  root: [
    "root",
    "firstname2",
    "lastname2",
    "username2",
    "email2",
    "phonenumber2",
    "emailotp",
    "successmessage"
  ],

  firstname2: ["firstname2"],
  lastname2: ["lastname2"],
  username2: ["username2"],
  email2: ["email2"],
  phonenumber2: ["phonenumber2"],
  emailotp: ["emailotp"],
  successmessage: ["successmessage"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicEmailotp__ArgProps,
      internalVariantPropNames: PlasmicEmailotp__VariantProps
    });

    return PlasmicEmailotp__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicEmailotp";
  } else {
    func.displayName = `PlasmicEmailotp.${nodeName}`;
  }
  return func;
}

export const PlasmicEmailotp = Object.assign(
  // Top-level PlasmicEmailotp renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    firstname2: makeNodeComponent("firstname2"),
    lastname2: makeNodeComponent("lastname2"),
    username2: makeNodeComponent("username2"),
    email2: makeNodeComponent("email2"),
    phonenumber2: makeNodeComponent("phonenumber2"),
    emailotp: makeNodeComponent("emailotp"),
    successmessage: makeNodeComponent("successmessage"),
    // Metadata about props expected for PlasmicEmailotp
    internalVariantProps: PlasmicEmailotp__VariantProps,
    internalArgProps: PlasmicEmailotp__ArgProps
  }
);

export default PlasmicEmailotp;
/* prettier-ignore-end */
