import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import config from '../../config'

import AdvancedkycalertPlasmic from '../plasmicComponents/Advancedkycalert'

import defaultProfilePic from '../../images/male_user.svg'

function AdvancedKYCAlert(props) {

    const navigate = useNavigate()
    const [uiState, setUiState] = useState({})

    useEffect(() => {
        if (props.auth.state === 'authenticated') {
            setUiState(prevState => {
                return {
                    ...prevState,
                    profileName: 'Hello, ' + props.user.get('firstname')
                }
            })
        } else if (props.auth.state === 'unauthenticated') {
            navigate('/signup')
        }
    }, [props.auth])

    const onChangeHandlerPhoto = (event) => {
        console.log(event.target.files[0])
        const reader = new FileReader();
        let base64data = null
        reader.onloadend = () => {
            // use a regex to remove data url part
            const base64String = reader.result
                .replace("data:", "")
                .replace(/^.+,/, "");

            // log to console
            // logs wL2dvYWwgbW9yZ...
            console.log('base64', base64String);
            // base64data = base64String
            axios.post(config.backendServer + '/uploadProfilePhoto', { image: base64String, userID: props.user.get('email') }).then(function (response, error) {
                if (response) {
                    console.log(response)
                } else {
                    console.log(error)
                }
            })
        };
        reader.readAsDataURL(event.target.files[0]);
        console.log('base64data', base64data)
    }

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <AdvancedkycalertPlasmic
                    profileoverlay={uiState.profileoverlay}
                    authoverlay={uiState.authoverlay}
                    loggedin={uiState.loggedin}
                    notloggedin={uiState.notloggedin}

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



                    kycproceed={{
                        onClick: () => { navigate('/advancedkyc') }
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
                            onClick: () => {navigate('/')}
                        },

                        dtsocialfeedbutton: {
                            onClick: () => {navigate('/socialfeed')}
                        },

                        dtportfoliobutton: {
                            onClick: () => {navigate('/myportfolio')}
                        },

                        dttransactionsbutton: {
                            onClick: () => {navigate('/mytransactions')}
                        },

                        dtproposalsbutton: {
                            onClick: () => {navigate('/myproposals')}
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
                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <AdvancedkycalertPlasmic
                    profileoverlay={uiState.profileoverlay}
                    authoverlay={uiState.authoverlay}
                    loggedin={uiState.loggedin}
                    notloggedin={uiState.notloggedin}

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



                    kycproceed={{
                        onClick: () => { navigate('/advancedkyc') }
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
                            onClick: () => {navigate('/')}
                        },

                        dtsocialfeedbutton: {
                            onClick: () => {navigate('/socialfeed')}
                        },

                        dtportfoliobutton: {
                            onClick: () => {navigate('/myportfolio')}
                        },

                        dttransactionsbutton: {
                            onClick: () => {navigate('/mytransactions')}
                        },

                        dtproposalsbutton: {
                            onClick: () => {navigate('/myproposals')}
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
                />
            </div>
        </div>
    );
}

export default AdvancedKYCAlert;