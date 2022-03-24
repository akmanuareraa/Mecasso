import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Web3 from 'web3'

import DonutChartCreator from '../reactComponents/DonutChartCreator'
import ViewCreatorProfile from '../plasmicComponents/ViewCreatorProfile'
import defaultProfilePic from '../../images/male_user.svg'
import YoutubeStat from '../plasmicComponents/YoutubeStat'
import InstaStat from '../plasmicComponents/InstaStat'
import FbStat from '../plasmicComponents/FbStat'

function CreatorProfile(props) {

    const navigate = useNavigate()
    const [uiState, setUiState] = useState({})
    console.log('creatorprofile', props.creatorProfile)

    useEffect(() => {
        if (props.auth.state === 'authenticated') {
            setUiState(prevState => {
                return {
                    ...prevState,
                    profileName: 'Hello, ' + props.user.get('firstname'),
                    loggedin: true,
                    notloggedin: false
                }
            })
        } else {
            setUiState(prevState => {
                return {
                    ...prevState,
                    loggedin: false,
                    notloggedin: true
                }
            })
        }
    }, [props.auth])

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <ViewCreatorProfile

                    profileoverlay={uiState.profileoverlay}
                    authoverlay={uiState.authoverlay}
                    loggedin={uiState.loggedin}
                    notloggedin={uiState.notloggedin}

                    buybutton={{
                        onClick: () => {
                            if (props.auth.state === 'authenticated') {
                                if (props.user.get('basickyc')) {
                                    if (props.user.get('advancedkyc')) {
                                        props.setMainState(prevState => {
                                            return {
                                                ...prevState,
                                                buytoken: {
                                                    tokensymbol: props.creatorProfile.tokensymbol,
                                                    tokenAddress: props.creatorProfile.daoaddr
                                                }
                                            }
                                        })
                                        navigate('/buytoken')
                                    } else {
                                        navigate('/advancedkycalert')
                                    }
                                } else {
                                    navigate('/basickycalert')
                                }
                            } else if (props.auth.state === 'unauthenticated') {
                                navigate('/signup')
                            }
                        }
                    }}

                    overlaycreatorname={props.mainState.userfirstname}
                    overlaycategory={uiState.userProfile}
                    overlaycreatortype=''
                    overlayuserprofilepic={
                        <figure className="image">
                            {/* <img className="is-rounded" src={podiumImages[0]} /> */}
                            <img className="is-rounded" src={props.mainState.userprofilepicture} />
                        </figure>
                    }
                    updateprofilebutton={{
                        onClick: () => {
                            alert('Profile Photo Uploaded')
                        }
                    }}

                    logoutbutton={{
                        onClick: () => {
                            props.logout()
                            navigate('/')
                        }
                    }}

                    uploadbuttonslot={
                        <>
                            <div class="file is-medium is-info">
                                <label class="file-label">
                                    <input class="file-input" type="file" name="pan" onChange={props.onChangeHandlerPhoto} />
                                    <span class="file-cta is-renai">
                                        <span class="file-label">
                                            Upload Profile Photo
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </>
                    }

                    backbutton={{
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    profileoverlay: false,
                                    authoverlay: false
                                }
                            })
                        }
                    }}

                    donutchart={<DonutChartCreator
                        creatorProfile={props.creatorProfile}
                    />}

                    previouspagebutton={{
                        onClick: () => { navigate('/discovercreators') }
                    }}

                    topNavBar={{

                        navbarprofilepic: <figure className="image is-48x48">
                            <img className="is-rounded" src={props.mainState.userprofilepicture} />
                        </figure>,

                        loggedin: props.mainState.userLoggedIn,

                        signupbutton: {
                            children: "SignUp/In",
                            onClick: () => {
                                navigate('/signup')
                            }
                        },

                        dtleaderboardbutton: {
                            onClick: () => { navigate('/') }
                        },

                        dtsocialfeedbutton: {
                            onClick: () => { navigate('/socialfeed') }
                        },

                        dtportfoliobutton: {
                            onClick: () => { navigate('/myportfolio') }
                        },

                        dttransactionsbutton: {
                            onClick: () => { navigate('/mytransactions') }
                        },

                        dtproposalsbutton: {
                            onClick: () => { navigate('/myproposals') }
                        },

                        profilebutton: {
                            onClick: () => {
                                if (props.auth.state === 'authenticated') {
                                    setUiState(prevState => {
                                        return {
                                            ...prevState,
                                            profileoverlay: true,
                                            authoverlay: false
                                        }
                                    })
                                } else {
                                    setUiState(prevState => {
                                        return {
                                            ...prevState,
                                            profileoverlay: false,
                                            authoverlay: true
                                        }
                                    })
                                }
                            }
                        }
                    }}

                    navbartwo={{
                        lbtoggle: true,
                        lbbutton: { onClick: () => { navigate('/') } },
                        feedbutton: { onClick: () => { navigate('/socialfeed') } },
                        portfoliobutton: {
                            onClick: () => {
                                if (props.user.get('basickyc')) {
                                    navigate('/myportfolio')
                                } else {
                                    navigate('/basickycalert')
                                }
                            }
                        },
                        txnsbutton: {
                            onClick: () => {
                                if (props.user.get('basickyc')) {
                                    navigate('/mytransactions')
                                } else {
                                    navigate('/basickycalert')
                                }
                            }
                        },
                        proposalbutton: {
                            onClick: () => {
                                if (props.user.get('basickyc')) {
                                    navigate('/myproposals')
                                } else {
                                    navigate('/basickycalert')
                                }
                            }
                        }
                    }}

                    statscomponent={
                        <>
                            {
                                props.creatorProfile.socialMedia.Youtube ?
                                    <YoutubeStat
                                        channelname={props.creatorProfile.socialMedia.Youtube.channelName}
                                        channeldescription={props.creatorProfile.socialMedia.Youtube.description}
                                        youtubethumbnail={
                                            <figure className="image" style={{ height: '90px' }, { width: '90px' }}>
                                                <img className="is-rounded" src={props.creatorProfile.socialMedia.Youtube.thumbnail} />
                                            </figure>
                                        }
                                        subs={props.creatorProfile.socialMedia.Youtube.subscribers}
                                        media={props.creatorProfile.socialMedia.Youtube.media}
                                        views={props.creatorProfile.socialMedia.Youtube.views}
                                    /> :
                                    <></>
                            }

                            {
                                props.creatorProfile.socialMedia.Instagram ?
                                    <InstaStat
                                        instausername={props.creatorProfile.socialMedia.Instagram.username}
                                        instaacctype={props.creatorProfile.socialMedia.Instagram.accountType}
                                        instamediacount={props.creatorProfile.socialMedia.Instagram.mediaCount}
                                        instafollowercount={props.creatorProfile.socialMedia.Instagram.followerCount}
                                    /> :
                                    <></>
                            }

                            {
                                props.creatorProfile.socialMedia.Facebook ?
                                    <FbStat
                                        fbusername={props.creatorProfile.socialMedia.Facebook.name}
                                        fbprofilepic={
                                            <figure className="image">
                                                <img className="is-rounded" src={props.creatorProfile.socialMedia.Facebook.picture} />
                                            </figure>
                                        }
                                        fbemail={props.creatorProfile.socialMedia.Facebook.email}
                                    /> :
                                    <></>
                            }
                        </>
                    }



                    profilepic={props.creatorProfile.profilepic}
                    creatorname={props.creatorProfile.creatorname}
                    tokensymbol={props.creatorProfile.tokensymbol}
                    tokenname={props.creatorProfile.tokenname}
                    category={props.creatorProfile.category}
                    tokenprice={props.creatorProfile.tokenprice}
                    description={props.creatorProfile.description}
                    creatoraddr={props.creatorProfile.creatoraddr}
                    daoaddr={props.creatorProfile.daoaddr}
                    // subs={props.creatorProfile.subs}
                    // media={props.creatorProfile.media}
                    // views={props.creatorProfile.views}
                    maxcap={parseInt(props.creatorProfile.maxcap).toFixed()}
                    supply={parseInt(props.creatorProfile.supply).toFixed()}
                    creatorbal={parseInt(props.creatorProfile.creatorbal).toFixed()}
                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <ViewCreatorProfile

                    profileoverlay={uiState.profileoverlay}
                    authoverlay={uiState.authoverlay}
                    loggedin={uiState.loggedin}
                    notloggedin={uiState.notloggedin}

                    buybutton={{
                        onClick: () => {
                            if (props.auth.state === 'authenticated') {
                                if (props.user.get('advancedkyc')) {
                                    props.setMainState(prevState => {
                                        return {
                                            ...prevState,
                                            buytoken: {
                                                tokensymbol: props.creatorProfile.tokensymbol,
                                                tokenAddress: props.creatorProfile.daoaddr
                                            }
                                        }
                                    })
                                    navigate('/buytoken')
                                } else {
                                    navigate('/advancedkycalert')
                                }
                            } else if (props.auth.state === 'unauthenticated') {
                                navigate('/signup')
                            }
                        }
                    }}

                    overlaycreatorname={props.mainState.userfirstname}
                    overlaycategory={uiState.userProfile}
                    overlaycreatortype=''
                    overlayuserprofilepic={
                        <figure className="image">
                            {/* <img className="is-rounded" src={podiumImages[0]} /> */}
                            <img className="is-rounded" src={props.mainState.userprofilepicture} />
                        </figure>
                    }
                    updateprofilebutton={{
                        onClick: () => {
                            alert('Profile Photo Uploaded')
                        }
                    }}

                    logoutbutton={{
                        onClick: () => {
                            props.logout()
                            navigate('/')
                        }
                    }}

                    uploadbuttonslot={
                        <>
                            <div class="file is-medium is-info">
                                <label class="file-label">
                                    <input class="file-input" type="file" name="pan" onChange={props.onChangeHandlerPhoto} />
                                    <span class="file-cta is-renai">
                                        <span class="file-label">
                                            Upload Profile Photo
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </>
                    }

                    backbutton={{
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    profileoverlay: false,
                                    authoverlay: false
                                }
                            })
                        }
                    }}

                    donutchart={<DonutChartCreator
                        creatorProfile={props.creatorProfile}
                    />}

                    previouspagebutton={{
                        onClick: () => { navigate('/discovercreators') }
                    }}

                    topNavBar={{

                        navbarprofilepic: <figure className="image is-48x48">
                            <img className="is-rounded" src={props.mainState.userprofilepicture} />
                        </figure>,

                        loggedin: props.mainState.userLoggedIn,

                        signupbutton: {
                            children: "SignUp/In",
                            onClick: () => {
                                navigate('/signup')
                            }
                        },

                        dtleaderboardbutton: {
                            onClick: () => { navigate('/') }
                        },

                        dtsocialfeedbutton: {
                            onClick: () => { navigate('/socialfeed') }
                        },

                        dtportfoliobutton: {
                            onClick: () => { navigate('/myportfolio') }
                        },

                        dttransactionsbutton: {
                            onClick: () => { navigate('/mytransactions') }
                        },

                        dtproposalsbutton: {
                            onClick: () => { navigate('/myproposals') }
                        },



                        profilebutton: {
                            onClick: () => {
                                if (props.auth.state === 'authenticated') {
                                    setUiState(prevState => {
                                        return {
                                            ...prevState,
                                            profileoverlay: true,
                                            authoverlay: false
                                        }
                                    })
                                } else {
                                    setUiState(prevState => {
                                        return {
                                            ...prevState,
                                            profileoverlay: false,
                                            authoverlay: true
                                        }
                                    })
                                }
                            }
                        }
                    }}

                    navbartwo={{
                        lbtoggle: true,
                        lbbutton: { onClick: () => { navigate('/') } },
                        feedbutton: { onClick: () => { navigate('/socialfeed') } },
                        portfoliobutton: {
                            onClick: () => {
                                if (props.user.get('basickyc')) {
                                    navigate('/myportfolio')
                                } else {
                                    navigate('/basickycalert')
                                }
                            }
                        },
                        txnsbutton: {
                            onClick: () => {
                                if (props.user.get('basickyc')) {
                                    navigate('/mytransactions')
                                } else {
                                    navigate('/basickycalert')
                                }
                            }
                        },
                        proposalbutton: {
                            onClick: () => {
                                if (props.user.get('basickyc')) {
                                    navigate('/myproposals')
                                } else {
                                    navigate('/basickycalert')
                                }
                            }
                        }
                    }}

                    statscomponent={
                        <>
                            {
                                props.creatorProfile.socialMedia.Youtube ?
                                    <YoutubeStat
                                        channelname={props.creatorProfile.socialMedia.Youtube.channelName}
                                        channeldescription={props.creatorProfile.socialMedia.Youtube.description}
                                        youtubethumbnail={
                                            <figure className="image" style={{ height: '90px' }, { width: '90px' }}>
                                                <img className="is-rounded" src={props.creatorProfile.socialMedia.Youtube.thumbnail} />
                                            </figure>
                                        }
                                        subs={props.creatorProfile.socialMedia.Youtube.subscribers}
                                        media={props.creatorProfile.socialMedia.Youtube.media}
                                        views={props.creatorProfile.socialMedia.Youtube.views}
                                    /> :
                                    <></>
                            }

                            {
                                props.creatorProfile.socialMedia.Instagram ?
                                    <InstaStat
                                        instausername={props.creatorProfile.socialMedia.Instagram.username}
                                        instaacctype={props.creatorProfile.socialMedia.Instagram.accountType}
                                        instamediacount={props.creatorProfile.socialMedia.Instagram.mediaCount}
                                        instafollowercount={props.creatorProfile.socialMedia.Instagram.followerCount}
                                    /> :
                                    <></>
                            }

                            {
                                props.creatorProfile.socialMedia.Facebook ?
                                    <FbStat
                                        fbusername={props.creatorProfile.socialMedia.Facebook.name}
                                        fbprofilepic={
                                            <figure className="image">
                                                <img className="is-rounded" src={props.creatorProfile.socialMedia.Facebook.picture} />
                                            </figure>
                                        }
                                        fbemail={props.creatorProfile.socialMedia.Facebook.email}
                                    /> :
                                    <></>
                            }
                        </>
                    }

                    profilepic={props.creatorProfile.profilepic}
                    creatorname={props.creatorProfile.creatorname}
                    tokensymbol={props.creatorProfile.tokensymbol}
                    tokenname={props.creatorProfile.tokenname}
                    category={props.creatorProfile.category}
                    tokenprice={props.creatorProfile.tokenprice}
                    description={props.creatorProfile.description}
                    creatoraddr={props.creatorProfile.creatoraddr}
                    daoaddr={props.creatorProfile.daoaddr}
                    // subs={props.creatorProfile.subs}
                    // media={props.creatorProfile.media}
                    // views={props.creatorProfile.views}
                    maxcap={parseInt(props.creatorProfile.maxcap).toFixed()}
                    supply={parseInt(props.creatorProfile.supply).toFixed()}
                    creatorbal={parseInt(props.creatorProfile.creatorbal).toFixed()}
                />
            </div>
        </div>
    );
}

export default CreatorProfile;