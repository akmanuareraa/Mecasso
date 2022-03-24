import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import axios from 'axios'

import config from '../../config'

// importing Plasmic components
import EmailSignUpPlasmic from '../plasmicComponents/EmailSignUp.jsx'

function EmailSignUp(props) {

    const navigate = useNavigate()

    const [signupData, setSignupData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        pass: "",
        confirmpass: "",
        email: ""
    })
    //const { signup, hasAuthError, auth, user } = useMoralis();
    const [uiState, setUiState] = useState({
        emailconfirmation: false,
        usernameerror: false,
        emailerror: false,
        passworderror: false,
        passwordpolicyerror: false,
        emailformaterror: false,
        loading: false,
        emptyfields: false
    })

    // handling the input field data
    const handleChange = (e, field) => {
        let dataField = field
        //console.log('Field: ' + field, 'Value: ', e.target.value)
        setSignupData(prevState => {
            return {
                ...prevState,
                [dataField]: e.target.value
            }
        })
        //console.log(signupData)
    }

    const fieldChecker = () => {
        for (const [key, value] of Object.entries(signupData)) {
            if (value === undefined || value === "") {
                return false
            }
        }
        return true
    }

    useEffect(() => {
        console.log("USER USEEFFECT", props.user)
        if (props.user !== null) {
            let tempUsername = props.user.get("username")
            let fname = props.user.get('firstname')
            let lname = props.user.get('lastname')
            props.setMainState(prevState => {
                return {
                    ...prevState,
                    userobject: {
                        ...prevState.userobject,
                        firstname: fname,
                        lastname: lname
                    }
                }
            })
            props.setUserData({
                username: "UP-" + tempUsername
            })
            axios.post(config.backendServer + '/generateEmailLink', { "username": props.user.get('username').slice(3), "email": props.user.get('email') }).then(function (response, error) {
                if (response) {
                    console.log(response.data)
                    navigate('/emailverification')
                } else {
                    console.log(error)
                }
            })
        }
    }, props.user)

    useEffect(() => {
        console.log("useeffect execs")
        console.log("auth state", props.auth.state)
        console.log("auth", props.auth)
        console.log('Auth Error', props.hasAuthError)
        console.log('User', props.user)
        //if (props.auth.state === "authenticated") {
        //     if (props.user === null) {
        //         //window.location.reload(true)
        //         console.log("inside null")
        //         console.log(props.auth.state)
        //         //props.authenticate()
        //         //props.refetchUserData()
        //     } else {

        //         //window.open(config.domain + '/fipref', '_self')
        //     }
        //     //window.location.reload(true)
        //     console.log("auth...!!")
        //     //window.open(config.domain + '/fipref', '_self')
        //     // setUiState(prevState => {
        //     //     return {
        //     //         ...prevState,
        //     //         emailconfirmation: true,
        //     //         usernameerror: false,
        //     //         emailerror: false,
        //     //         passworderror: false,
        //     //         passwordpolicyerror: false,
        //     //         loading: false,
        //     //         emptyfields: false
        //     //     }
        //     // })
        // }
        //console.log("Auth Specific Error", auth.error.code)
        if (props.auth.error != null) {
            console.log("error code", props.auth.error.code)
            if (props.auth.error.code === 202) {
                setUiState(prevState => {
                    return {
                        ...prevState,
                        emailconfirmation: false,
                        usernameerror: true,
                        emailerror: false,
                        passworderror: false,
                        passwordpolicyerror: false,
                        emailformaterror: false,
                        loading: false,
                        emptyfields: false
                    }
                })
            } else if (props.auth.error.code === 203) {
                setUiState(prevState => {
                    return {
                        ...prevState,
                        emailconfirmation: false,
                        usernameerror: false,
                        emailerror: true,
                        passworderror: false,
                        passwordpolicyerror: false,
                        emailformaterror: false,
                        loading: false,
                        emptyfields: false
                    }
                })
            } else if (props.auth.error.code === 125) {
                setUiState(prevState => {
                    return {
                        ...prevState,
                        emailconfirmation: false,
                        usernameerror: false,
                        emailerror: false,
                        passworderror: false,
                        passwordpolicyerror: false,
                        emailformaterror: true,
                        loading: false,
                        emptyfields: false
                    }
                })
            } else {
                setUiState(prevState => {
                    return {
                        ...prevState,
                        emailconfirmation: false,
                        usernameerror: false,
                        emailerror: false,
                        passworderror: false,
                        passwordpolicyerror: false,
                        emailformaterror: false,
                        loading: false,
                        emptyfields: true
                    }
                })
            }
            setSignupData(prevState => {
                return {
                    ...prevState,
                    status: {
                        success: false,
                        failed: props.auth.error.code
                    }
                }
            })
        }
    }, [props.auth])

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <EmailSignUpPlasmic

                    emailconfirmation={uiState.emailconfirmation}
                    usernameerror={uiState.usernameerror}
                    emailerror={uiState.emailerror}
                    passworderror={uiState.passworderror}
                    passwordpolicyerror={uiState.passwordpolicyerror}
                    emailformaterror={uiState.emailformaterror}
                    loading={uiState.loading}
                    emptyfields={uiState.emptyfields}

                    firstname={{
                        placeholder: "Enter Firstname",
                        onChange: (e) => handleChange(e, "firstname")
                    }}

                    lastname={{
                        placeholder: "Enter Lastname",
                        onChange: (e) => handleChange(e, "lastname")
                    }}

                    username={{
                        placeholder: "Enter Username",
                        onChange: (e) => handleChange(e, "username")
                    }}

                    mail={{
                        placeholder: "Enter Email ID",
                        onChange: (e) => handleChange(e, "email")
                    }}

                    password={{
                        placeholder: "Password",
                        onChange: (e) => handleChange(e, "pass"),
                        type: "password"
                    }}

                    confirmpassword={{
                        placeholder: "Confirm Password",
                        onChange: (e) => handleChange(e, "confirmpass"),
                        type: "password"
                    }}

                    submitbutton={{
                        children: "Submit",
                        onClick: () => {
                            console.log("Submitted")
                            // console.log(signupData)
                            console.log('email', signupData.email)
                            if (!uiState.loading) {
                                if (fieldChecker()) {
                                    if (signupData.pass === signupData.confirmpass) {
                                        setUiState(prevState => {
                                            return {
                                                ...prevState,
                                                emailconfirmation: false,
                                                usernameerror: false,
                                                emailerror: false,
                                                passworderror: false,
                                                passwordpolicyerror: false,
                                                loading: true,
                                                emptyfields: false
                                            }
                                        })
                                        props.signup(signupData.username, signupData.pass, signupData.email, { firstname: signupData.firstname, lastname: signupData.lastname })
                                        let data = {
                                            userID: props.user.get('email'),
                                            tokenName: '',
                                            contractAddress: ''
                                        }
                                        axios.post(config.backendServer + '/createNewUser', data).then(function (response, error) {
                                            if (response) {
                                                console.log(response)
                                            } else {
                                                console.log(error)
                                            }
                                        })
                                    } else {
                                        console.log("Password does not Match")
                                        setUiState(prevState => {
                                            return {
                                                ...prevState,
                                                emailconfirmation: false,
                                                usernameerror: false,
                                                emailerror: false,
                                                passworderror: true,
                                                passwordpolicyerror: false,
                                                emptyfields: false
                                            }
                                        })
                                    }
                                } else {
                                    setUiState(prevState => {
                                        return {
                                            ...prevState,
                                            emailconfirmation: false,
                                            usernameerror: false,
                                            emailerror: false,
                                            passworderror: false,
                                            passwordpolicyerror: false,
                                            emptyfields: true
                                        }
                                    })
                                }
                            }
                        }
                    }}

                    redirecttologinbutton={{
                        children: "Login",
                        onClick: () => {
                            // Opening Email SignUp page in the current tab
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
                <EmailSignUpPlasmic

                    emailconfirmation={uiState.emailconfirmation}
                    usernameerror={uiState.usernameerror}
                    emailerror={uiState.emailerror}
                    passworderror={uiState.passworderror}
                    passwordpolicyerror={uiState.passwordpolicyerror}
                    emailformaterror={uiState.emailformaterror}
                    loading={uiState.loading}
                    emptyfields={uiState.emptyfields}

                    firstname={{
                        placeholder: "Enter Firstname",
                        onChange: (e) => handleChange(e, "firstname")
                    }}

                    lastname={{
                        placeholder: "Enter Lastname",
                        onChange: (e) => handleChange(e, "lastname")
                    }}

                    username={{
                        placeholder: "Enter Username",
                        onChange: (e) => handleChange(e, "username")
                    }}

                    mail={{
                        placeholder: "Enter Email ID",
                        onChange: (e) => handleChange(e, "email")
                    }}

                    password={{
                        placeholder: "Password",
                        onChange: (e) => handleChange(e, "pass"),
                        type: "password"
                    }}

                    confirmpassword={{
                        placeholder: "Confirm Password",
                        onChange: (e) => handleChange(e, "confirmpass"),
                        type: "password"
                    }}

                    submitbutton={{
                        children: "Submit",
                        onClick: () => {
                            console.log("Submitted")
                            // console.log(signupData)
                            console.log('email', signupData.email)
                            if (!uiState.loading) {
                                if (fieldChecker()) {
                                    if (signupData.pass === signupData.confirmpass) {
                                        setUiState(prevState => {
                                            return {
                                                ...prevState,
                                                emailconfirmation: false,
                                                usernameerror: false,
                                                emailerror: false,
                                                passworderror: false,
                                                passwordpolicyerror: false,
                                                loading: true,
                                                emptyfields: false
                                            }
                                        })
                                        props.signup(signupData.username, signupData.pass, signupData.email, { firstname: signupData.firstname, lastname: signupData.lastname })
                                        let data = {
                                            userID: props.user.get('email'),
                                            tokenName: '',
                                            contractAddress: ''
                                        }
                                        axios.post(config.backendServer + '/createNewUser', data).then(function (response, error) {
                                            if (response) {
                                                console.log(response)
                                            } else {
                                                console.log(error)
                                            }
                                        })
                                    } else {
                                        console.log("Password does not Match")
                                        setUiState(prevState => {
                                            return {
                                                ...prevState,
                                                emailconfirmation: false,
                                                usernameerror: false,
                                                emailerror: false,
                                                passworderror: true,
                                                passwordpolicyerror: false,
                                                emptyfields: false
                                            }
                                        })
                                    }
                                } else {
                                    setUiState(prevState => {
                                        return {
                                            ...prevState,
                                            emailconfirmation: false,
                                            usernameerror: false,
                                            emailerror: false,
                                            passworderror: false,
                                            passwordpolicyerror: false,
                                            emptyfields: true
                                        }
                                    })
                                }
                            }
                        }
                    }}

                    redirecttologinbutton={{
                        children: "Login",
                        onClick: () => {
                            // Opening Email SignUp page in the current tab
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

export default EmailSignUp;