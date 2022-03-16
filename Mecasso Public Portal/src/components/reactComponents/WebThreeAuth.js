import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useNavigate } from 'react-router-dom'

import config from '../../config'

// importing Plasmic components
import WebThreeAuthPlasmic from '../plasmicComponents/WebThreeAuth'

function WebThreeAuth(props) {

    const navigate = useNavigate()

    const { authenticate, isAuthenticated, auth, hasAuthError, user, logout } = useMoralis();

    const [uiState, setUiState] = useState({
        authenticating: false,
        loggedin: false,
        provider: ''
    })

    const [data, setData] = useState({})

    useEffect(() => {
        console.log("auth", auth.state)
        console.log("err", hasAuthError)
        if (isAuthenticated) {
            console.log("User object", user);
            if (user.get('profile') === undefined) {
                let tempUsername = props.user.get("username")
                props.setUserData({
                    emailverified: true,
                    username: uiState.provider + "-" + tempUsername
                })
                navigate('/fipref')
            } else {
                navigate('/')
            }
        } else {
            console.log("auth state", auth)
        }
    }, [auth.state])

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <WebThreeAuthPlasmic
                    authenticating={uiState.authenticating}
                    loggedin={uiState.loggedin}

                    username={data.username}

                    walletconnectbutton={{
                        children: "Connect your Mobile Wallet",
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    provider: 'WC'
                                }
                            })
                            authenticate({
                                provider: "walletconnect",
                                chainId: '137', 
                                signingMessage: "Welcome to Mecasso"
                            })
                        }
                    }}

                    metamaskbutton={{
                        children: "Connect with Metamask",
                        onClick: async () => {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    provider: 'MM'
                                }
                            })
                            await props.switchNetworkMumbai()
                            //authenticate({chainId: 137, signingMessage: "Welcome to Mecasso"})
                        }
                    }}

                    logoutbutton={{
                        children: "Logout",
                        onClick: () => {
                            console.log("Clicked logout")
                            logout()
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    authenticating: false,
                                    loggedin: false
                                }
                            })
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
                <WebThreeAuthPlasmic
                    authenticating={uiState.authenticating}
                    loggedin={uiState.loggedin}

                    username={data.username}

                    walletconnectbutton={{
                        children: "Connect your Mobile Wallet",
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    provider: 'WC'
                                }
                            })
                            authenticate({
                                provider: "walletconnect",
                                chainId: '137', 
                                signingMessage: "Welcome to Mecasso" 
                            })
                        }
                    }}

                    metamaskbutton={{
                        children: "Connect with Metamask",
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    provider: 'MM'
                                }
                            })
                            authenticate({chainId: 137, signingMessage: "Welcome to Mecasso"})
                        }
                    }}

                    logoutbutton={{
                        children: "Logout",
                        onClick: () => {
                            console.log("Clicked logout")
                            logout()
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    authenticating: false,
                                    loggedin: false
                                }
                            })
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

export default WebThreeAuth;