// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: q7hWdoDc5Fm3y1TqrPvEG7
// Component: EH7DMpItsHSa
import * as React from "react";
import * as p from "@plasmicapp/react-web";
import {
  hasVariant,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
  ensureGlobalVariants
} from "@plasmicapp/react-web";
import TopNavBar from "../../../TopNavBar"; // plasmic-import: 2FmHKYp2yyp/component
import ScreenAlert from "../../../ScreenAlert"; // plasmic-import: laQG7AfxmqV/component
import Button from "../../../Button"; // plasmic-import: hUmGidH7taW/component
import Navbartwo from "../../../Navbartwo"; // plasmic-import: jF1x-X1nWSN/component
import { useScreenVariants as useScreenVariantsifq4PdpMk2Y } from "./PlasmicGlobalVariant__Screen"; // plasmic-import: IFQ4PdpMK2Y/globalVariant
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_renai.module.css"; // plasmic-import: q7hWdoDc5Fm3y1TqrPvEG7/projectcss
import sty from "./PlasmicProposals.module.css"; // plasmic-import: EH7DMpItsHSa/css
import arrow233Png1Ht3Ij9Y from "./images/arrow233Png.png"; // plasmic-import: 1-HT3Ij9y/picture
import maleUser480Pxpng2EH7EoyOk2 from "./images/maleUser480Pxpng2.png"; // plasmic-import: eH7eoyOK2/picture

export const PlasmicProposals__VariantProps = new Array(
  "profileoverlay",
  "authoverlay",
  "norecord"
);

export const PlasmicProposals__ArgProps = new Array(
  "overlaycreatorname",
  "overlaycategory",
  "overlaycreatortype",
  "errormessage",
  "daoslot",
  "overlayuserprofilepic",
  "uploadbuttonslot"
);

function PlasmicProposals__RenderFunc(props) {
  const { variants, args, overrides, forNode } = props;
  const globalVariants = ensureGlobalVariants({
    screen: useScreenVariantsifq4PdpMk2Y()
  });

  return (
    <React.Fragment>
      <div className={projectcss.plasmic_page_wrapper}>
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

              [sty.rootnorecord]: hasVariant(variants, "norecord", "norecord"),
              [sty.rootprofileoverlay]: hasVariant(
                variants,
                "profileoverlay",
                "profileoverlay"
              )
            }
          )}
        >
          <TopNavBar
            data-plasmic-name={"topNavBar"}
            data-plasmic-override={overrides.topNavBar}
            className={classNames("__wab_instance", sty.topNavBar, {
              [sty.topNavBarnorecord]: hasVariant(
                variants,
                "norecord",
                "norecord"
              )
            })}
          />

          {false ? (
            <div className={classNames(projectcss.all, sty.freeBox___2Oyla)}>
              {p.renderPlasmicSlot({
                defaultContents: "Please verify your email ID",
                value: args.errormessage,
                className: classNames(sty.slotTargetErrormessage)
              })}
            </div>
          ) : null}
          {(hasVariant(globalVariants, "screen", "desktop") ? true : true) ? (
            <ScreenAlert
              className={classNames("__wab_instance", sty.screenAlert__idRt1)}
            />
          ) : null}

          <div className={classNames(projectcss.all, sty.freeBox__vgCa)}>
            {true ? (
              <p.Stack
                as={"div"}
                hasGap={true}
                className={classNames(projectcss.all, sty.freeBox__a4Lyz)}
              >
                <div
                  className={classNames(
                    projectcss.all,
                    projectcss.__wab_text,
                    sty.text___0Sjsl
                  )}
                >
                  {"Proposals"}
                </div>
              </p.Stack>
            ) : null}
          </div>

          {(
            hasVariant(variants, "authoverlay", "authoverlay")
              ? true
              : hasVariant(variants, "profileoverlay", "profileoverlay")
              ? true
              : true
          ) ? (
            <div
              className={classNames(projectcss.all, sty.freeBox__pzSj9, {
                [sty.freeBoxauthoverlay__pzSj9Tj6Ax]: hasVariant(
                  variants,
                  "authoverlay",
                  "authoverlay"
                ),

                [sty.freeBoxprofileoverlay__pzSj9MmaO1]: hasVariant(
                  variants,
                  "profileoverlay",
                  "profileoverlay"
                )
              })}
            >
              {(
                hasVariant(variants, "authoverlay", "authoverlay")
                  ? true
                  : hasVariant(variants, "profileoverlay", "profileoverlay")
                  ? true
                  : true
              ) ? (
                <div
                  className={classNames(projectcss.all, sty.freeBox__vuBuP, {
                    [sty.freeBoxauthoverlay__vuBuPtj6Ax]: hasVariant(
                      variants,
                      "authoverlay",
                      "authoverlay"
                    ),

                    [sty.freeBoxprofileoverlay__vuBuPMmaO1]: hasVariant(
                      variants,
                      "profileoverlay",
                      "profileoverlay"
                    )
                  })}
                >
                  {(
                    hasVariant(variants, "authoverlay", "authoverlay")
                      ? true
                      : hasVariant(variants, "profileoverlay", "profileoverlay")
                      ? true
                      : true
                  ) ? (
                    <button
                      data-plasmic-name={"backbutton"}
                      data-plasmic-override={overrides.backbutton}
                      className={classNames(
                        projectcss.all,
                        projectcss.button,
                        sty.backbutton,
                        {
                          [sty.backbuttonauthoverlay]: hasVariant(
                            variants,
                            "authoverlay",
                            "authoverlay"
                          ),

                          [sty.backbuttonprofileoverlay]: hasVariant(
                            variants,
                            "profileoverlay",
                            "profileoverlay"
                          )
                        }
                      )}
                    >
                      <p.PlasmicImg
                        data-plasmic-name={"img"}
                        data-plasmic-override={overrides.img}
                        alt={""}
                        className={classNames(sty.img, {
                          [sty.imgauthoverlay]: hasVariant(
                            variants,
                            "authoverlay",
                            "authoverlay"
                          ),

                          [sty.imgprofileoverlay]: hasVariant(
                            variants,
                            "profileoverlay",
                            "profileoverlay"
                          )
                        })}
                        displayHeight={"auto"}
                        displayMaxHeight={"none"}
                        displayMaxWidth={"100%"}
                        displayMinHeight={"0"}
                        displayMinWidth={"0"}
                        displayWidth={"37px"}
                        loading={"lazy"}
                        src={{
                          src: arrow233Png1Ht3Ij9Y,
                          fullWidth: 640,
                          fullHeight: 640,
                          aspectRatio: undefined
                        }}
                      />
                    </button>
                  ) : null}
                </div>
              ) : null}
              {(
                hasVariant(variants, "authoverlay", "authoverlay")
                  ? true
                  : hasVariant(variants, "profileoverlay", "profileoverlay")
                  ? true
                  : true
              ) ? (
                <div
                  className={classNames(projectcss.all, sty.freeBox__ecJAt, {
                    [sty.freeBoxauthoverlay__ecJAtTj6Ax]: hasVariant(
                      variants,
                      "authoverlay",
                      "authoverlay"
                    ),

                    [sty.freeBoxprofileoverlay__ecJAtMmaO1]: hasVariant(
                      variants,
                      "profileoverlay",
                      "profileoverlay"
                    )
                  })}
                >
                  {(
                    hasVariant(variants, "profileoverlay", "profileoverlay")
                      ? false
                      : true
                  ) ? (
                    <div
                      className={classNames(
                        projectcss.all,
                        projectcss.__wab_text,
                        sty.text___8TCk,
                        {
                          [sty.textauthoverlay___8TCktj6Ax]: hasVariant(
                            variants,
                            "authoverlay",
                            "authoverlay"
                          ),

                          [sty.textprofileoverlay___8TCkMmaO1]: hasVariant(
                            variants,
                            "profileoverlay",
                            "profileoverlay"
                          )
                        }
                      )}
                    >
                      {hasVariant(variants, "authoverlay", "authoverlay")
                        ? "Renai"
                        : "Manu Areraa"}
                    </div>
                  ) : null}
                  {(
                    hasVariant(variants, "authoverlay", "authoverlay")
                      ? false
                      : true
                  ) ? (
                    <div
                      className={classNames(
                        projectcss.all,
                        sty.freeBox__buf00,
                        {
                          [sty.freeBoxauthoverlay__buf00Tj6Ax]: hasVariant(
                            variants,
                            "authoverlay",
                            "authoverlay"
                          ),

                          [sty.freeBoxprofileoverlay__buf00MmaO1]: hasVariant(
                            variants,
                            "profileoverlay",
                            "profileoverlay"
                          )
                        }
                      )}
                    >
                      {p.renderPlasmicSlot({
                        defaultContents: "Manu Areraa",
                        value: args.overlaycreatorname,
                        className: classNames(
                          sty.slotTargetOverlaycreatorname,
                          {
                            [sty.slotTargetOverlaycreatornameauthoverlay]:
                              hasVariant(
                                variants,
                                "authoverlay",
                                "authoverlay"
                              ),

                            [sty.slotTargetOverlaycreatornameprofileoverlay]:
                              hasVariant(
                                variants,
                                "profileoverlay",
                                "profileoverlay"
                              )
                          }
                        )
                      })}
                    </div>
                  ) : null}
                  {(
                    hasVariant(variants, "authoverlay", "authoverlay")
                      ? false
                      : hasVariant(variants, "profileoverlay", "profileoverlay")
                      ? true
                      : true
                  ) ? (
                    <div
                      className={classNames(
                        projectcss.all,
                        sty.freeBox__ggc4D,
                        {
                          [sty.freeBoxauthoverlay__ggc4DTj6Ax]: hasVariant(
                            variants,
                            "authoverlay",
                            "authoverlay"
                          ),

                          [sty.freeBoxprofileoverlay__ggc4DMmaO1]: hasVariant(
                            variants,
                            "profileoverlay",
                            "profileoverlay"
                          )
                        }
                      )}
                    >
                      {(
                        hasVariant(variants, "authoverlay", "authoverlay")
                          ? false
                          : true
                      ) ? (
                        <div
                          className={classNames(
                            projectcss.all,
                            sty.freeBox__i0Jhy,
                            {
                              [sty.freeBoxauthoverlay__i0Jhytj6Ax]: hasVariant(
                                variants,
                                "authoverlay",
                                "authoverlay"
                              ),

                              [sty.freeBoxprofileoverlay__i0JhyMmaO1]:
                                hasVariant(
                                  variants,
                                  "profileoverlay",
                                  "profileoverlay"
                                )
                            }
                          )}
                        >
                          {p.renderPlasmicSlot({
                            defaultContents: "Cooking",
                            value: args.overlaycategory,
                            className: classNames(
                              sty.slotTargetOverlaycategory,
                              {
                                [sty.slotTargetOverlaycategoryauthoverlay]:
                                  hasVariant(
                                    variants,
                                    "authoverlay",
                                    "authoverlay"
                                  ),

                                [sty.slotTargetOverlaycategoryprofileoverlay]:
                                  hasVariant(
                                    variants,
                                    "profileoverlay",
                                    "profileoverlay"
                                  )
                              }
                            )
                          })}
                        </div>
                      ) : null}
                      {(
                        hasVariant(variants, "authoverlay", "authoverlay")
                          ? false
                          : true
                      ) ? (
                        <div
                          className={classNames(
                            projectcss.all,
                            projectcss.__wab_text,
                            sty.text__dUC1,
                            {
                              [sty.textauthoverlay__dUC1Tj6Ax]: hasVariant(
                                variants,
                                "authoverlay",
                                "authoverlay"
                              ),

                              [sty.textprofileoverlay__dUC1MmaO1]: hasVariant(
                                variants,
                                "profileoverlay",
                                "profileoverlay"
                              )
                            }
                          )}
                        >
                          {" | "}
                        </div>
                      ) : null}
                      {(
                        hasVariant(variants, "authoverlay", "authoverlay")
                          ? false
                          : true
                      ) ? (
                        <div
                          className={classNames(
                            projectcss.all,
                            sty.freeBox___7Dp9N,
                            {
                              [sty.freeBoxauthoverlay___7Dp9Ntj6Ax]: hasVariant(
                                variants,
                                "authoverlay",
                                "authoverlay"
                              ),

                              [sty.freeBoxprofileoverlay___7Dp9NMmaO1]:
                                hasVariant(
                                  variants,
                                  "profileoverlay",
                                  "profileoverlay"
                                )
                            }
                          )}
                        >
                          {p.renderPlasmicSlot({
                            defaultContents: "Influencer",
                            value: args.overlaycreatortype,
                            className: classNames(
                              sty.slotTargetOverlaycreatortype,
                              {
                                [sty.slotTargetOverlaycreatortypeauthoverlay]:
                                  hasVariant(
                                    variants,
                                    "authoverlay",
                                    "authoverlay"
                                  ),

                                [sty.slotTargetOverlaycreatortypeprofileoverlay]:
                                  hasVariant(
                                    variants,
                                    "profileoverlay",
                                    "profileoverlay"
                                  )
                              }
                            )
                          })}
                        </div>
                      ) : null}
                      {(
                        hasVariant(variants, "profileoverlay", "profileoverlay")
                          ? true
                          : true
                      ) ? (
                        <div
                          className={classNames(
                            projectcss.all,
                            projectcss.__wab_text,
                            sty.text__qlN4Q,
                            {
                              [sty.textprofileoverlay__qlN4QMmaO1]: hasVariant(
                                variants,
                                "profileoverlay",
                                "profileoverlay"
                              )
                            }
                          )}
                        >
                          {"|  Young Stars"}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div
                className={classNames(projectcss.all, sty.freeBox__rfImx, {
                  [sty.freeBoxprofileoverlay__rfImxMmaO1]: hasVariant(
                    variants,
                    "profileoverlay",
                    "profileoverlay"
                  )
                })}
              >
                {p.renderPlasmicSlot({
                  defaultContents: (
                    <p.PlasmicImg
                      alt={""}
                      className={classNames(sty.img__bHiaB)}
                      displayHeight={"290px"}
                      displayMaxHeight={"none"}
                      displayMaxWidth={"100%"}
                      displayMinHeight={"0"}
                      displayMinWidth={"0"}
                      displayWidth={"290px"}
                      loading={"lazy"}
                      src={{
                        src: maleUser480Pxpng2EH7EoyOk2,
                        fullWidth: 480,
                        fullHeight: 480,
                        aspectRatio: undefined
                      }}
                    />
                  ),

                  value: args.overlayuserprofilepic
                })}
              </div>

              {(
                hasVariant(variants, "authoverlay", "authoverlay")
                  ? true
                  : hasVariant(variants, "profileoverlay", "profileoverlay")
                  ? true
                  : true
              ) ? (
                <p.Stack
                  as={"div"}
                  hasGap={true}
                  className={classNames(projectcss.all, sty.freeBox__p0Za5, {
                    [sty.freeBoxauthoverlay__p0Za5Tj6Ax]: hasVariant(
                      variants,
                      "authoverlay",
                      "authoverlay"
                    ),

                    [sty.freeBoxprofileoverlay__p0Za5MmaO1]: hasVariant(
                      variants,
                      "profileoverlay",
                      "profileoverlay"
                    )
                  })}
                >
                  {(
                    hasVariant(variants, "profileoverlay", "profileoverlay")
                      ? false
                      : true
                  ) ? (
                    <p.Stack
                      as={"button"}
                      data-plasmic-name={"loginbutton"}
                      data-plasmic-override={overrides.loginbutton}
                      hasGap={true}
                      className={classNames(
                        projectcss.all,
                        projectcss.button,
                        sty.loginbutton,
                        {
                          [sty.loginbuttonauthoverlay]: hasVariant(
                            variants,
                            "authoverlay",
                            "authoverlay"
                          ),

                          [sty.loginbuttonprofileoverlay]: hasVariant(
                            variants,
                            "profileoverlay",
                            "profileoverlay"
                          )
                        }
                      )}
                    >
                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text___1JwU,
                          {
                            [sty.textauthoverlay___1JwUTj6Ax]: hasVariant(
                              variants,
                              "authoverlay",
                              "authoverlay"
                            ),

                            [sty.textprofileoverlay___1JwUMmaO1]: hasVariant(
                              variants,
                              "profileoverlay",
                              "profileoverlay"
                            )
                          }
                        )}
                      >
                        {hasVariant(variants, "authoverlay", "authoverlay")
                          ? "Login"
                          : "Update Profile"}
                      </div>
                    </p.Stack>
                  ) : null}
                  {(
                    hasVariant(variants, "profileoverlay", "profileoverlay")
                      ? false
                      : true
                  ) ? (
                    <p.Stack
                      as={"button"}
                      data-plasmic-name={"signupbutton"}
                      data-plasmic-override={overrides.signupbutton}
                      hasGap={true}
                      className={classNames(
                        projectcss.all,
                        projectcss.button,
                        sty.signupbutton,
                        {
                          [sty.signupbuttonauthoverlay]: hasVariant(
                            variants,
                            "authoverlay",
                            "authoverlay"
                          ),

                          [sty.signupbuttonprofileoverlay]: hasVariant(
                            variants,
                            "profileoverlay",
                            "profileoverlay"
                          )
                        }
                      )}
                    >
                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__p8GmW,
                          {
                            [sty.textauthoverlay__p8GmWtj6Ax]: hasVariant(
                              variants,
                              "authoverlay",
                              "authoverlay"
                            ),

                            [sty.textprofileoverlay__p8GmWMmaO1]: hasVariant(
                              variants,
                              "profileoverlay",
                              "profileoverlay"
                            )
                          }
                        )}
                      >
                        {hasVariant(variants, "authoverlay", "authoverlay")
                          ? "SignUp"
                          : "Update Profile"}
                      </div>
                    </p.Stack>
                  ) : null}
                  {(
                    hasVariant(variants, "authoverlay", "authoverlay")
                      ? true
                      : true
                  ) ? (
                    <div
                      className={classNames(
                        projectcss.all,
                        sty.freeBox___7Evy9,
                        {
                          [sty.freeBoxauthoverlay___7Evy9Tj6Ax]: hasVariant(
                            variants,
                            "authoverlay",
                            "authoverlay"
                          ),

                          [sty.freeBoxprofileoverlay___7Evy9MmaO1]: hasVariant(
                            variants,
                            "profileoverlay",
                            "profileoverlay"
                          )
                        }
                      )}
                    >
                      {p.renderPlasmicSlot({
                        defaultContents: (
                          <p.Stack
                            as={"button"}
                            hasGap={true}
                            className={classNames(
                              projectcss.all,
                              projectcss.button,
                              sty.button__wCxef
                            )}
                          >
                            <div
                              className={classNames(
                                projectcss.all,
                                projectcss.__wab_text,
                                sty.text__z5QMb
                              )}
                            >
                              {"Upload Profile Photo"}
                            </div>
                          </p.Stack>
                        ),

                        value: args.uploadbuttonslot
                      })}
                    </div>
                  ) : null}
                  {(
                    hasVariant(variants, "authoverlay", "authoverlay")
                      ? false
                      : true
                  ) ? (
                    <p.Stack
                      as={"button"}
                      data-plasmic-name={"logoutbutton"}
                      data-plasmic-override={overrides.logoutbutton}
                      hasGap={true}
                      className={classNames(
                        projectcss.all,
                        projectcss.button,
                        sty.logoutbutton,
                        {
                          [sty.logoutbuttonauthoverlay]: hasVariant(
                            variants,
                            "authoverlay",
                            "authoverlay"
                          ),

                          [sty.logoutbuttonprofileoverlay]: hasVariant(
                            variants,
                            "profileoverlay",
                            "profileoverlay"
                          )
                        }
                      )}
                    >
                      <div
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text__dzOyr,
                          {
                            [sty.textauthoverlay__dzOyrTj6Ax]: hasVariant(
                              variants,
                              "authoverlay",
                              "authoverlay"
                            ),

                            [sty.textprofileoverlay__dzOyrMmaO1]: hasVariant(
                              variants,
                              "profileoverlay",
                              "profileoverlay"
                            )
                          }
                        )}
                      >
                        {"Logout"}
                      </div>
                    </p.Stack>
                  ) : null}
                </p.Stack>
              ) : null}
            </div>
          ) : null}
          {(hasVariant(variants, "norecord", "norecord") ? true : true) ? (
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text__vMAmU,
                {
                  [sty.textnorecord__vMAmUoSCuS]: hasVariant(
                    variants,
                    "norecord",
                    "norecord"
                  )
                }
              )}
            >
              {"No Proposals"}
            </div>
          ) : null}
          {(hasVariant(variants, "norecord", "norecord") ? true : true) ? (
            <Button
              data-plasmic-name={"redirectbutton"}
              data-plasmic-override={overrides.redirectbutton}
              className={classNames("__wab_instance", sty.redirectbutton, {
                [sty.redirectbuttonnorecord]: hasVariant(
                  variants,
                  "norecord",
                  "norecord"
                )
              })}
            />
          ) : null}

          <p.Stack
            as={"div"}
            hasGap={true}
            className={classNames(projectcss.all, sty.freeBox___8QsMh)}
          >
            {p.renderPlasmicSlot({
              defaultContents: null,
              value: args.daoslot
            })}
          </p.Stack>

          {(
            hasVariant(variants, "authoverlay", "authoverlay")
              ? true
              : hasVariant(variants, "profileoverlay", "profileoverlay")
              ? true
              : hasVariant(globalVariants, "screen", "desktop")
              ? true
              : true
          ) ? (
            <Navbartwo
              data-plasmic-name={"navbartwo"}
              data-plasmic-override={overrides.navbartwo}
              className={classNames("__wab_instance", sty.navbartwo, {
                [sty.navbartwoauthoverlay]: hasVariant(
                  variants,
                  "authoverlay",
                  "authoverlay"
                ),

                [sty.navbartwoprofileoverlay]: hasVariant(
                  variants,
                  "profileoverlay",
                  "profileoverlay"
                )
              })}
            />
          ) : null}
          {true ? (
            <ScreenAlert
              className={classNames("__wab_instance", sty.screenAlert__kupFd)}
            />
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}

const PlasmicDescendants = {
  root: [
    "root",
    "topNavBar",
    "backbutton",
    "img",
    "loginbutton",
    "signupbutton",
    "logoutbutton",
    "redirectbutton",
    "navbartwo"
  ],

  topNavBar: ["topNavBar"],
  backbutton: ["backbutton", "img"],
  img: ["img"],
  loginbutton: ["loginbutton"],
  signupbutton: ["signupbutton"],
  logoutbutton: ["logoutbutton"],
  redirectbutton: ["redirectbutton"],
  navbartwo: ["navbartwo"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicProposals__ArgProps,
      internalVariantPropNames: PlasmicProposals__VariantProps
    });

    return PlasmicProposals__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicProposals";
  } else {
    func.displayName = `PlasmicProposals.${nodeName}`;
  }
  return func;
}

export const PlasmicProposals = Object.assign(
  // Top-level PlasmicProposals renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    topNavBar: makeNodeComponent("topNavBar"),
    backbutton: makeNodeComponent("backbutton"),
    img: makeNodeComponent("img"),
    loginbutton: makeNodeComponent("loginbutton"),
    signupbutton: makeNodeComponent("signupbutton"),
    logoutbutton: makeNodeComponent("logoutbutton"),
    redirectbutton: makeNodeComponent("redirectbutton"),
    navbartwo: makeNodeComponent("navbartwo"),
    // Metadata about props expected for PlasmicProposals
    internalVariantProps: PlasmicProposals__VariantProps,
    internalArgProps: PlasmicProposals__ArgProps
  }
);

export default PlasmicProposals;
/* prettier-ignore-end */
