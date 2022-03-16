import React, { useState, useEffect } from 'react';
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import { FacebookLogin } from 'react-facebook-login-with-hooks'
import { useNavigate } from 'react-router-dom'
import FacebookAuth from 'react-facebook-auth';


import config from '../../config'

import SignupWithSocial from '../reactComponents/SignupWithSocial'
import Fbplasmicbutton from '../plasmicComponents/Fbplasmicbutton'


// importing Plasmic components
import SignUpPlasmic from '../plasmicComponents/SignUp.jsx'

function SignUp(props) {

    const navigate = useNavigate()

    const [uiState, setUiState] = useState({
        loading: false,
        error: false
    })

    const PlasmicFBButton = ({ onClick }) => (
        <Fbplasmicbutton
            onClick={onClick}
        />
    )

    let signupErrorMessage = ""
    const clientId = config.googleClientId
    const appId = config.fbClientId
    const fields = "name,email,picture"

    const refreshTokenSetup = (res) => {
        // Timing to renew access token
        let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

        const refreshToken = async () => {
            const newAuthRes = await res.reloadAuthResponse();
            refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
            console.log('newAuthRes:', newAuthRes);
            // saveUserToken(newAuthRes.access_token);  <-- save new token
            localStorage.setItem('authToken', newAuthRes.id_token);

            // Setup the other timer after the first one
            setTimeout(refreshToken, refreshTiming);
        };

        // Setup first refresh timer
        setTimeout(refreshToken, refreshTiming);
    };

    useEffect(() => {
        console.log('auth state', props.auth.state)
        console.log(props.hasAuthError)
        console.log('uerr', props.userError)
    }, [props.auth])

    useEffect(() => {
        console.log(props.user)
        if (props.user !== null) {
            if (props.user.get('username').slice(0, 2) === 'GO' || props.user.get('username').slice(0, 2) === 'FB') {
                if (props.user.get('emailverified') === undefined) {
                    props.setUserData({
                        emailverified: true
                    })
                }
            }
            if (props.user.get('profile') !== undefined) {
                navigate('/')
            } else {
                navigate('/fipref')
            }
        }
    }, [props.user])

    const fbauthenticate = (response) => {
        console.log(response);
        let username = response.name.replace(/\s+/g, '').toLowerCase()
        props.signup('FB-' + username, 'XXXXXX', response.email, { firstname: response.name, lastname: '', emailverified: true })
    }

    const onSuccess = (res) => {
        console.log(res)
        console.log('Login Success: currentUser:', res.profileObj.email, res.profileObj.givenName, res.profileObj.familyName);
        let username = 'GO-' + res.profileObj.givenName.toLowerCase() + res.profileObj.familyName.toLowerCase()
        //let username = 'GO-' + res.profileObj.googleId
        props.signup(username, 'XXXXXX', res.profileObj.email, { firstname: res.profileObj.givenName, lastname: res.profileObj.familyName, emailverified: true })
        refreshTokenSetup(res)
        //signupErrorMessage = SignupWithSocial()
        // if(signupErrorMessage !== null){
        //     setUiState(prevState => {
        //         return {
        //             ...prevState,
        //             loading: false,
        //             error: true
        //         }
        //     })
        // }
        //window.open(config.domain + '/', '_self')
    };


    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        setUiState(prevState => {
            return {
                ...prevState,
                loading: false,
                error: true
            }
        })
    };

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: false,
        accessType: 'offline'
    })

    // const { facebooklogin } = FacebookLogin({
    //     appId,
    //     fields
    // })

    // const callback = (res) => {
    //     console.log(res)
    // }

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <SignUpPlasmic
                    loading={uiState.loading}
                    error={uiState.error}

                    errormessage={signupErrorMessage.message}

                    emailbutton={{
                        onClick: () => {
                            // Opening Email SignUp page in the current tab
                            navigate('/emailsignup')
                        }
                    }}

                    webthreebutton={{
                        onClick: () => {
                            // add function here
                            navigate('/web3auth')
                        }
                    }}

                    // socialmediabutton={{
                    //     disabled: true
                    // }}

                    twitterbutton={{
                        onClick: () => {
                            // add function here
                            alert("Twitter Auth Function")
                        }
                    }}

                    // facebookbutton={{
                    //     onClick: () => {
                    //         // // add function here
                    //         // facebooklogin()
                    //     }
                    // }}

                    facebookbuttonslot={
                        <FacebookAuth
                            appId="363393625288767"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={fbauthenticate}
                            component={PlasmicFBButton}
                        />
                    }

                    googlebutton={{
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    loading: true,
                                    error: false
                                }
                            })
                            signIn()
                        }
                    }}

                    signuptologinbutton={{
                        onClick: () => {
                            navigate('/login')
                        }
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
                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <SignUpPlasmic
                    loading={uiState.loading}
                    error={uiState.error}

                    errormessage={signupErrorMessage.message}

                    emailbutton={{
                        onClick: () => {
                            // Opening Email SignUp page in the current tab
                            navigate('/emailsignup')
                        }
                    }}

                    webthreebutton={{
                        onClick: () => {
                            // add function here
                            navigate('/web3auth')
                        }
                    }}

                    // socialmediabutton={{
                    //     disabled: true
                    // }}

                    twitterbutton={{
                        onClick: () => {
                            // add function here
                            alert("Twitter Auth Function")
                        }
                    }}

                    // facebookbutton={{
                    //     onClick: () => {
                    //         // // add function here
                    //         // facebooklogin()
                    //     }
                    // }}

                    facebookbuttonslot={
                        <FacebookAuth
                            appId="363393625288767"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={fbauthenticate}
                            component={PlasmicFBButton}
                        />
                    }

                    googlebutton={{
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    loading: true,
                                    error: false
                                }
                            })
                            signIn()
                        }
                    }}

                    signuptologinbutton={{
                        onClick: () => {
                            navigate('/login')
                        }
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
                />
            </div>
        </div>
    );
}

export default SignUp;