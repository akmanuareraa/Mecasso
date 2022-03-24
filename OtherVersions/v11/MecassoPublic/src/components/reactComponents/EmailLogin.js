import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import config from '../../config'

import EmailLoginPlasmic from '../plasmicComponents/EmailLogin.jsx'

function EmailLogin(props) {

    const navigate = useNavigate()

    const [signinData, setSigninData] = useState({
        username: "",
        pass: ""
    })
    const [uiState, setUiState] = useState({
        invalidcreds: false,
        emailconfirmation: false,
        loading: true,
        requirederror: false,
        login: false
    })
    // const [sessionToken, setsessionToken] = useState("");

    // handling the input field data
    const handleChange = (e, field) => {
        let dataField = field
        //console.log('Field: ' + field, 'Value: ', e.target.value)
        setSigninData(prevState => {
            return {
                ...prevState,
                [dataField]: e.target.value
            }
        })
        //console.log(signupData)
    }

    useEffect(() => {
        console.log('uef user', props.user)
        if (props.auth.state === 'authenticated') {
            if (props.user === null) {
                props.refetchUserData()
            } else {
                console.log('mo ver', props.user.get('mobileverified'))
                if (props.user.get('emailverified')) {
                    if (props.user.get('profile') === undefined) {
                        navigate('/fipref')
                    } else {
                        navigate('/')
                    }
                } else {
                    setUiState(prevState => {
                        return {
                            invalidcreds: false,
                            emailconfirmation: true,
                            loading: false,
                            requirederror: false
                        }
                    })
                }
            }
        }
    }, [props.user])

    useEffect(() => {
        console.log(uiState)
        // console.log("useeffect execs")
        // console.log("auth", auth)
        console.log("auth state", props.auth)
        // console.log('Auth Error', hasAuthError)
        // console.log('User', user)
        if (props.auth.state === 'authenticated') {
            console.log('user', props.user)
            if (props.user !== null) {
                console.log('user logged in')
                // if (props.user.get('emailVerified')) {
                //     if(props.user.get('usertype') === 'Investor'){
                //         if(props.user.get('kyc').advancedkyc)   {
                //             navigate('/')
                //         } else {
                //             navigate('/advancedkyc')
                //         }
                //     } else {
                //         navigate('/')
                //     }
                //     navigate('/')
                // } else {
                //     setUiState(prevState => {
                //         return {
                //             invalidcreds: false,
                //             emailconfirmation: true,
                //             loading: false,
                //             requirederror: false
                //         }
                //     })
                // }
            }
        } else if (props.auth.state === 'error') {
            console.log('error occured', props.auth.error.code, props.auth.error.message)
            setUiState(prevState => {
                return {
                    ...prevState,
                    invalidcreds: false,
                    emailconfirmation: false,
                    loading: true
                }
            })
        } else {
            console.log("not auth")
            setUiState(prevState => {
                return {
                    ...prevState,
                    invalidcreds: false,
                    emailconfirmation: false,
                    loading: false,
                    requirederror: false,
                    login: true
                }
            })
        }

        if (props.hasAuthError) {
            console.log("auth code", props.auth.error.code)
            console.log("auth code", props.auth)
            if (props.auth.error.code === 101) {
                setUiState(prevState => {
                    return {
                        ...prevState,
                        invalidcreds: true,
                        emailconfirmation: false,
                        loading: false,
                        requirederror: false,
                        login: false
                    }
                })
            } else if (props.auth.error.code === 200 || props.auth.error.code === 201) {
                setUiState(prevState => {
                    return {
                        ...prevState,
                        invalidcreds: false,
                        emailconfirmation: false,
                        loading: false,
                        requirederror: true,
                        login: false
                    }
                })
            }
        }
    }, [props.auth])

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <EmailLoginPlasmic

                    invalidcreds={uiState.invalidcreds}
                    emailconfirmation={uiState.emailconfirmation}
                    loading={uiState.loading}
                    requirederror={uiState.requirederror}
                    login={uiState.login}
                    emailverify={uiState.emailverify}
                    emailsuccess={uiState.emailsuccess}
                    emailfailed={uiState.emailfailed}
                    emailsuccessmsg={uiState.emailsuccessmsg}
                    emailfailmsg={uiState.emailfailmsg}

                    username={{
                        placeholder: "Enter Username",
                        onChange: (e) => handleChange(e, "username")
                    }}

                    password={{
                        placeholder: "Password",
                        onChange: (e) => handleChange(e, "pass"),
                        type: "password"
                    }}



                    loginbutton={{
                        children: "Login",
                        onClick: () => {
                            if (!uiState.loading) {
                                if(signinData.username && signinData.pass){
                                    setUiState(prevState => {
                                        return {
                                            ...prevState,
                                            invalidcreds: false,
                                            emailconfirmation: false,
                                            loading: true
                                        }
                                    })
                                    props.login('UP-' + signinData.username, signinData.pass)
                                } else {
                                    setUiState(prevState => {
                                        return {
                                            ...prevState,
                                            invalidcreds: true,
                                            emailconfirmation: false,
                                            loading: false
                                        }
                                    })
                                }
                            }
                        }
                    }}

                    loginredirectbutton={{
                        children: "Login",
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    invalidcreds: false,
                                    emailconfirmation: false,
                                    loading: false,
                                    login: true
                                }
                            })
                            //props.logout()
                        }
                    }}

                    gotorenaibutton={{
                        children: "Explore Mecasso",
                        onClick: () => {
                            navigate('/')
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
                <EmailLoginPlasmic

                    invalidcreds={uiState.invalidcreds}
                    emailconfirmation={uiState.emailconfirmation}
                    loading={uiState.loading}
                    requirederror={uiState.requirederror}
                    login={uiState.login}
                    emailverify={uiState.emailverify}
                    emailsuccess={uiState.emailsuccess}
                    emailfailed={uiState.emailfailed}
                    emailsuccessmsg={uiState.emailsuccessmsg}
                    emailfailmsg={uiState.emailfailmsg}

                    username={{
                        placeholder: "Enter Username",
                        onChange: (e) => handleChange(e, "username")
                    }}

                    password={{
                        placeholder: "Password",
                        onChange: (e) => handleChange(e, "pass"),
                        type: "password"
                    }}

                    loginbutton={{
                        children: "Login",
                        onClick: () => {
                            if (!uiState.loading) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        invalidcreds: false,
                                        emailconfirmation: false,
                                        loading: true
                                    }
                                })
                            }
                            props.login('UP-' + signinData.username, signinData.pass)
                        }
                    }}

                    loginredirectbutton={{
                        children: "Login",
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    invalidcreds: false,
                                    emailconfirmation: false,
                                    loading: false,
                                    login: true
                                }
                            })
                            //props.logout()
                        }
                    }}

                    gotorenaibutton={{
                        children: "Explore Mecasso",
                        onClick: () => {
                            navigate('/')
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


export default EmailLogin;