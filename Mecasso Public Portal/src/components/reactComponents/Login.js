import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import FacebookAuth from 'react-facebook-auth';

import config from '../../config'

import LoginPlasmic from '../plasmicComponents/Login.jsx'
import Fbplasmicbutton from '../plasmicComponents/Fbplasmicbutton'

function Login(props) {

    const navigate = useNavigate()

    const [uiState, setUiState] = useState({
        emailverified: false
    })

    // useEffect(() => {
    //         if(success){
    //             setUiState(prevState => {
    //                 return {
    //                     ...prevState,
    //                     emailverified: true
    //                 }
    //             })
    //Also add function to update emailverified
    //         }
    // }, [emailToken])

    // useEffect(() => {
    //     console.log('LoginPage - Auth', props.auth)
    //     if(props.auth.state === 'authenticated'){
    //         console.log('E.V', props.user.get('emailVerified'))
    //     }   
    // },[props.auth])

    const clientId = config.googleClientId

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
        if (props.auth.state === 'authenticated') {
            navigate('/')
        }
    }, [props.auth])

    const onSuccess = (res) => {
        console.log(res)
        let username = res.profileObj.givenName.toLowerCase() + res.profileObj.familyName.toLowerCase()
        props.login('GO-' + username, 'XXXXXX')
        //props.login('GO-' + res.profileObj.googleId, 'XXXXXX')
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

    const PlasmicFBButton = ({ onClick }) => (
        <Fbplasmicbutton
            onClick={onClick}
        />
    )

    const fbauthenticate = (response) => {
        console.log(response);
        let username = response.name.replace(/\s+/g, '').toLowerCase()
        props.login('FB-' + username, 'XXXXXX')
        // Api call to server so we can validate the token
    }

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <LoginPlasmic
                    emailverified={uiState.emailverified}
                    emailnotverified={uiState.emailnotverified}



                    emailbutton={{
                        onClick: () => {
                            navigate('/emaillogin')
                            // if(props.auth.state === 'authenticated'){
                            //     if(props.user.get('emailverified')){
                            //         navigate('/')
                            //     } else {
                            //         console.log('ss')
                            //         setUiState(prevState => {
                            //             return {
                            //                 ...prevState,
                            //                 emailverified: false,
                            //                 emailnotverified: true
                            //             }
                            //         })
                            //     }   
                            // } else {
                            //     navigate('/emaillogin')
                            // }
                        }
                    }}

                    webthreebutton={{
                        onClick: () => {
                            navigate('/web3auth')
                        }
                    }}

                    // socialmediabutton = {{
                    //     onClick: () => {
                    //         window.open(config.domain + '/login', '_self')
                    //     }
                    // }}

                    googlebutton={{
                        onClick: () => {
                            // setUiState(prevState => {
                            //     return {
                            //         ...prevState,
                            //         loading: true,
                            //         error: false
                            //     }
                            // })
                            signIn()
                        }
                    }}

                    facebookbuttonslot={
                        <FacebookAuth
                            appId={config.fbClientId}
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={fbauthenticate}
                            component={PlasmicFBButton}
                        />
                    }

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
                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <LoginPlasmic
                    emailverified={uiState.emailverified}
                    emailnotverified={uiState.emailnotverified}



                    emailbutton={{
                        onClick: () => {
                            navigate('/emaillogin')
                            // if(props.auth.state === 'authenticated'){
                            //     if(props.user.get('emailverified')){
                            //         navigate('/')
                            //     } else {
                            //         console.log('ss')
                            //         setUiState(prevState => {
                            //             return {
                            //                 ...prevState,
                            //                 emailverified: false,
                            //                 emailnotverified: true
                            //             }
                            //         })
                            //     }   
                            // } else {
                            //     navigate('/emaillogin')
                            // }
                        }
                    }}

                    webthreebutton={{
                        onClick: () => {
                            navigate('/web3auth')
                        }
                    }}

                    // socialmediabutton = {{
                    //     onClick: () => {
                    //         window.open(config.domain + '/login', '_self')
                    //     }
                    // }}

                    googlebutton={{
                        onClick: () => {
                            // setUiState(prevState => {
                            //     return {
                            //         ...prevState,
                            //         loading: true,
                            //         error: false
                            //     }
                            // })
                            signIn()
                        }
                    }}

                    facebookbuttonslot={
                        <FacebookAuth
                            appId="363393625288767"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={fbauthenticate}
                            component={PlasmicFBButton}
                        />
                    }

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
                />
            </div>
        </div>
    );
}

export default Login;