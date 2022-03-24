import React, { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import config from '../../config'

import BasickycPlasmic from '../plasmicComponents/Basickyc'

function BasicKYC(props) {

    const navigate = useNavigate()

    const [uiState, setUiState] = useState(() => {
        return {
            firstname: {
                disabled: false,
                placeholder: 'Enter First Name'
            },
            lastname: {
                disabled: false,
                placeholder: 'Enter Last Name'
            },
            username: {
                disabled: false,
                placeholder: 'Enter Username'
            },
            email: {
                disabled: false,
                placeholder: 'Enter Email ID'
            },
            phonenumber: {
                disabled: false,
                placeholder: 'Enter Mobile Number'
            },
            socialloginkyc: false
        }
    })
    const [componentState, setComponentState] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        phonenumber: ''
    })

    const uploadKycToBackend = () => {
        let userObj = {
            //userid: componentState.username, 
            userid: props.user.get('username'),
            name: componentState.firstname + componentState.lastname,
            email: componentState.email,
            phoneno: componentState.phonenumber
        }
        axios.post(config.backendServer + '/basickyc', userObj).then(function (response, error) {
            if (response) {
                console.log(response)
                navigate('/advancedkyc')
            } else {
                console.log(error)
            }
        })
    }

    const handleChange = (e, field) => {
        let dataField = field
        //console.log('Field: ' + field, 'Value: ', e.target.value)
        setComponentState(prevState => {
            return {
                ...prevState,
                [dataField]: e.target.value
            }
        })
        //console.log(signupData)
    }

    const fieldChecker = () => {
        console.log('cs', componentState)
        console.log(props.user.get('username').slice(0, 2))
        if (props.user.get('username').slice(0, 2) === 'FB' || props.user.get('username').slice(0, 2) === 'GO') {
            console.log(1)
            if (componentState.phonenumber === "") {
                return false
            }
        } else {
            console.log(2)
            for (const [key, value] of Object.entries(componentState)) {
                if (value === undefined || value === "") {
                    return false
                }
            }
        }
        return true
    }

    useEffect(() => {
        console.log(uiState)
        if (props.auth.state === 'authenticated') {
            console.log('in')
            let tempUsername = props.user.get("username")
            let firstname = props.user.get("firstname")
            let lastname = props.user.get("lastname")
            let email = props.user.get("email")
            if (tempUsername.slice(0, 2) === 'UP' || tempUsername.slice(0, 2) === 'GO' || tempUsername.slice(0, 2) === 'FB') {
                console.log(1)
                if (tempUsername.slice(0, 2) === 'GO' || tempUsername.slice(0, 2) === 'FB') {
                    console.log(2)
                    setUiState(prevState => {
                        return {
                            ...prevState,
                            socialloginkyc: true,
                            otpverification: false
                        }
                    })
                }
                setComponentState(prevState => {
                    return {
                        ...prevState,
                        "firstname": firstname,
                        "lastname": lastname,
                        "username": tempUsername.slice(3, -1),
                        "email": email
                    }
                })
                setUiState(prevState => {
                    return {
                        ...prevState,
                        firstname: {
                            disabled: true,
                            placeholder: firstname
                        },
                        lastname: {
                            disabled: true,
                            placeholder: lastname
                        },
                        username: {
                            disabled: true,
                            placeholder: tempUsername.slice(3)
                        },
                        email: {
                            disabled: true,
                            placeholder: email
                        },
                        phonenumber: {
                            disabled: false,
                            placeholder: "Enter Mobile Number"
                        }
                    }
                })
            }
        } else if (props.auth.state === 'unauthenticated') {
            navigate('/signup')
        }
    }, [props.auth])

    useEffect(() => {
        if (componentState.mobileotpfrombackend !== '' && componentState.mobileotpfrombackend !== undefined) {
            if (componentState.mobileotp === componentState.mobileotpfrombackend.toString()) {
                setUiState(prevState => {
                    return {
                        ...prevState,
                        mobileotpsuccess: true
                    }
                })
            }
        }
    }, [componentState.mobileotp])

    useEffect(() => {
        if (componentState.emailotpfrombackend !== '' && componentState.emailotpfrombackend !== undefined) {
            if (componentState.emailotp === componentState.emailotpfrombackend.toString()) {
                setUiState(prevState => {
                    return {
                        ...prevState,
                        emailotpsuccess: true
                    }
                })
            }
        }
    }, [componentState.emailotp])

    return (
            <div className="columns is-centered bg-img">
                <div className="column has-text-centered bg-img public is-hidden-mobile">
                    <BasickycPlasmic
                        otpverification={uiState.otpverification}

                        otp={{
                            placeholder: "Enter OTP",
                            onChange: (e) => handleChange(e, "otp")
                        }}



                        mobileform={{
                            fotpverification: uiState.fotpverification,
                            mobileotpsuccess: uiState.mobileotpsuccess,
                            socialloginkyc: uiState.socialloginkyc,

                            mobileotp: {
                                placeholder: "Enter Mobile OTP",
                                onChange: (e) => handleChange(e, 'mobileotp')
                            },
                            firstname: {
                                isDisabled: uiState.firstname.disabled,
                                placeholder: uiState.firstname.placeholder,
                                onChange: (e) => handleChange(e, "firstname")
                            },
                            lastname: {
                                isDisabled: uiState.lastname.disabled,
                                placeholder: uiState.lastname.placeholder,
                                onChange: (e) => handleChange(e, "lastname")
                            },
                            username: {
                                isDisabled: uiState.username.disabled,
                                placeholder: uiState.username.placeholder,
                                onChange: (e) => handleChange(e, "username")
                            },
                            email: {
                                isDisabled: uiState.email.disabled,
                                placeholder: uiState.email.placeholder,
                                onChange: (e) => handleChange(e, "email")
                            },
                            phonenumber: {
                                isDisabled: uiState.phonenumber.disabled,
                                placeholder: uiState.phonenumber.placeholder,
                                onChange: (e) => handleChange(e, "phonenumber")
                            }
                        }}

                        emailform={{
                            fotpverification: uiState.fotpverification,
                            emailotpsuccess: uiState.emailotpsuccess,
                            emailotp: {
                                placeholder: "Enter Email OTP",
                                onChange: (e) => handleChange(e, 'emailotp')
                            }
                        }}

                        submitkycbutton={{
                            children: "Submit",
                            onClick: () => {
                                if (fieldChecker()) {
                                    if (props.user.get("username").slice(0, 2) === 'WC') {
                                        props.setUserData({
                                            firstname: componentState.firstname,
                                            lastname: componentState.lastname,
                                            username: 'WC-' + componentState.username,
                                            email: componentState.email
                                        })
                                    }
                                    axios.post(config.backendServer + '/generateEmailOTP', { "email": componentState.email }).then(function (response, error) {
                                        if (response) {
                                            console.log('email otp', response.data)
                                            setComponentState(prevState => {
                                                return {
                                                    ...prevState,
                                                    emailotpfrombackend: response.data.otp
                                                }
                                            })
                                        } else {
                                            console.log(error)
                                        }
                                    })
                                    axios.get(config.backendServer + '/sendOtp', { params: { "phno": componentState.phonenumber } }).then(function (response, error) {
                                        if (response) {
                                            console.log('mobile otp', response.data.otp)
                                            setComponentState(prevState => {
                                                return {
                                                    ...prevState,
                                                    mobileotpfrombackend: response.data.otp
                                                }
                                            })
                                        } else {
                                            console.log(error)
                                        }
                                    })
                                    setUiState(prevState => {
                                        return {
                                            ...prevState,
                                            otpverification: true,
                                            fotpverification: true
                                        }
                                    })
                                } else {
                                    alert("Please fill all fields")
                                }
                            }
                        }}
                        completebutton={{
                            children: "Next",
                            onClick: () => {
                                //if(uiState.emailotpsuccess && uiState.mobileotpsuccess){
                                if (uiState.emailotpsuccess) {
                                    props.setUserData({
                                        basickyc: true
                                    })
                                    console.log('OTP Success')
                                    uploadKycToBackend()
                                } else {
                                    alert("Please enter and verify the OTP")
                                }
                            }
                        }}
                    />
                </div>
                <div className="column has-text-centered is-hidden-desktop">
                    <BasickycPlasmic
                        otpverification={uiState.otpverification}

                        otp={{
                            placeholder: "Enter OTP",
                            onChange: (e) => handleChange(e, "otp")
                        }}



                        mobileform={{
                            fotpverification: uiState.fotpverification,
                            mobileotpsuccess: uiState.mobileotpsuccess,
                            socialloginkyc: uiState.socialloginkyc,

                            mobileotp: {
                                placeholder: "Enter Mobile OTP",
                                onChange: (e) => handleChange(e, 'mobileotp')
                            },
                            firstname: {
                                isDisabled: uiState.firstname.disabled,
                                placeholder: uiState.firstname.placeholder,
                                onChange: (e) => handleChange(e, "firstname")
                            },
                            lastname: {
                                isDisabled: uiState.lastname.disabled,
                                placeholder: uiState.lastname.placeholder,
                                onChange: (e) => handleChange(e, "lastname")
                            },
                            username: {
                                isDisabled: uiState.username.disabled,
                                placeholder: uiState.username.placeholder,
                                onChange: (e) => handleChange(e, "username")
                            },
                            email: {
                                isDisabled: uiState.email.disabled,
                                placeholder: uiState.email.placeholder,
                                onChange: (e) => handleChange(e, "email")
                            },
                            phonenumber: {
                                isDisabled: uiState.phonenumber.disabled,
                                placeholder: uiState.phonenumber.placeholder,
                                onChange: (e) => handleChange(e, "phonenumber")
                            }
                        }}

                        emailform={{
                            fotpverification: uiState.fotpverification,
                            emailotpsuccess: uiState.emailotpsuccess,
                            emailotp: {
                                placeholder: "Enter Email OTP",
                                onChange: (e) => handleChange(e, 'emailotp')
                            }
                        }}

                        submitkycbutton={{
                            children: "Submit",
                            onClick: () => {
                                if (fieldChecker()) {
                                    if (props.user.get("username").slice(0, 2) === 'WC') {
                                        props.setUserData({
                                            firstname: componentState.firstname,
                                            lastname: componentState.lastname,
                                            username: 'WC-' + componentState.username,
                                            email: componentState.email
                                        })
                                    }
                                    axios.post(config.backendServer + '/generateEmailOTP', { "email": componentState.email }).then(function (response, error) {
                                        if (response) {
                                            console.log('email otp', response.data)
                                            setComponentState(prevState => {
                                                return {
                                                    ...prevState,
                                                    emailotpfrombackend: response.data.otp
                                                }
                                            })
                                        } else {
                                            console.log(error)
                                        }
                                    })
                                    axios.get(config.backendServer + '/sendOtp', { params: { "phno": componentState.phonenumber } }).then(function (response, error) {
                                        if (response) {
                                            console.log('mobile otp', response.data.otp)
                                            setComponentState(prevState => {
                                                return {
                                                    ...prevState,
                                                    mobileotpfrombackend: response.data.otp
                                                }
                                            })
                                        } else {
                                            console.log(error)
                                        }
                                    })
                                    setUiState(prevState => {
                                        return {
                                            ...prevState,
                                            otpverification: true,
                                            fotpverification: true
                                        }
                                    })
                                } else {
                                    alert("Please fill all fields")
                                }
                            }
                        }}
                        completebutton={{
                            children: "Next",
                            onClick: () => {
                                //if(uiState.emailotpsuccess && uiState.mobileotpsuccess){
                                if (uiState.emailotpsuccess) {
                                    props.setUserData({
                                        basickyc: true
                                    })
                                    console.log('OTP Success')
                                    uploadKycToBackend()
                                } else {
                                    alert("Please enter and verify the OTP")
                                }
                            }
                        }}
                    />
                </div>
            </div>
    );
}

export default BasicKYC;