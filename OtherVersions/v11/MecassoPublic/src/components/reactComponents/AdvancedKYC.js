import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import config from '../../config'

import AdvancedKYCPlasmic from '../plasmicComponents/Advancedkyc.jsx'

function AdvancedKYC(props) {

    const navigate = useNavigate()

    const [uiState, setUiState] = useState({
        submitted: false
    })

    const [componentState, setComponentState] = useState({
        "pan": "",
        "aadhar": "",
        "panFileName": "",
        "aadharFileName": "",
        "photoFileName": ""
    })

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
        for (const [key, value] of Object.entries(componentState)) {
            if (value === undefined || value === "") {
                return false
            }
        }
        return true
    }

    const onChangeHandlerPan = (event) => {
        console.log(event.target.files[0]);
        setComponentState(prevState => {
            return {
                ...prevState,
                panFile: event.target.files[0],
                panFileName: event.target.files[0].name
            }
        })
    }

    const onChangeHandlerAadhar = (event) => {
        console.log(event.target.files[0]);
        setComponentState(prevState => {
            return {
                ...prevState,
                aadharFile: event.target.files[0],
                aadharFileName: event.target.files[0].name
            }
        })
    }

    const onChangeHandlerPhoto = (event) => {
        console.log(event.target.files[0]);
        setComponentState(prevState => {
            return {
                ...prevState,
                photoFile: event.target.files[0],
                photoFileName: event.target.files[0].name
            }
        })
    }

    const uploadFiles = () => {

        const data = new FormData()

        data.append('pan', componentState.panFile)
        data.append('aadhar', componentState.aadharFile)
        data.append('image', componentState.photoFile)

        let userObj = {
            userid: props.user.get('username'),
            aadharno: componentState.aadhar,
            pancardno: componentState.pan
        }
        console.log(userObj)
        console.log('data', data)

        console.log(componentState.panFile)
        console.log(componentState.aadharFile)
        console.log(componentState.photoFile)

        axios.post(config.backendServer + '/advancedKYC', userObj).then(function (response, error) {
            if (response) {
                console.log(response)
                console.log('formdata', data)
                axios.post(config.backendServer + '/kycdocupload', data).then(function (response, error) {
                    if (response) {
                        console.log(response)
                        setUiState(prevState => {
                            return {
                                ...prevState,
                                submitted: true
                            }
                        })
                        props.setUserData({
                            advancedkyc: true
                        })
                    } else {
                        console.log(error)
                        alert("An Error occured")
                    }
                })
            } else {
                console.log(error)
            }
        })

    }

    useEffect(() => {
        console.log('auths', props.auth.state)
        if (props.auth.state === 'unauthenticated') {
            navigate('/signup')
        }
    }, [props.auth.state])

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <AdvancedKYCPlasmic
                    submitted={uiState.submitted}

                    pan={{
                        placeholder: "Enter PAN Number",
                        onChange: (e) => handleChange(e, "pan")
                    }}

                    aadhar={{
                        placeholder: "Enter Aadhar Number",
                        onChange: (e) => handleChange(e, "aadhar")
                    }}

                    panuploadbutton={
                        <>
                            <div className="columns is-centered">
                                <div className="file is-small is-boxed has-name">
                                    <label className="file-label">
                                        <input className="file-input" type="file" name="pan" onInput={onChangeHandlerPan} />
                                        <span className="file-cta is-fixed-width">
                                            <span className="file-icon">
                                                <i className="fas fas-upload"></i>
                                            </span>
                                            <span className="file-label">
                                                Upload PAN
                                            </span>
                                        </span>
                                        <span className="file-name is-fixed-width">
                                            {componentState.panFileName}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </>
                    }

                    aadharuploadbutton={
                        <div className="columns is-centered">
                            <div className="file is-small is-boxed has-name is-light">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="aadhar" onInput={onChangeHandlerAadhar} />
                                    <span className="file-cta is-fixed-width">
                                        <span className="file-icon">
                                            <i className="fas fas-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Upload Aadhar
                                        </span>
                                    </span>
                                    <span className="file-name is-fixed-width">
                                        {componentState.aadharFileName}
                                    </span>
                                </label>
                            </div>
                        </div>
                    }

                    photouploadbutton={

                        <div className="column is-centered">
                            <div className="file is-small is-boxed has-name  is-light">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="image" onInput={onChangeHandlerPhoto} />
                                    <span className="file-cta is-fixed-width">
                                        <span className="file-icon">
                                            <i className="fas fas-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Upload Photo
                                        </span>
                                    </span>
                                    <span className="file-name is-fixed-width ">
                                        {componentState.photoFileName}
                                    </span>
                                </label>
                            </div>
                        </div>
                    }

                    submitkycbutton={{
                        children: "Submit",
                        onClick: () => {
                            if (fieldChecker) {
                                uploadFiles()
                            } else {
                                alert("Please fill all fields")
                            }
                        }
                    }}

                    redirectbutton={{
                        children: "Next",
                        onClick: () => {
                            if (props.user.get('accounts') === undefined) {
                                navigate('/connectwallet')
                            } else {
                                navigate('/')
                            }
                        }
                    }}

                    skipkycbutton={{
                        children: "Skip KYC for now",
                        onClick: () => {
                            if (props.user.get('accounts') === undefined) {
                                navigate('/connectwallet')
                            } else {
                                navigate('/')
                            }
                        }
                    }}
                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <AdvancedKYCPlasmic
                    submitted={uiState.submitted}

                    pan={{
                        placeholder: "Enter PAN Number",
                        onChange: (e) => handleChange(e, "pan")
                    }}

                    aadhar={{
                        placeholder: "Enter Aadhar Number",
                        onChange: (e) => handleChange(e, "aadhar")
                    }}

                    panuploadbutton={
                        <>
                            <div className="columns is-centered">
                                <div className="file is-small is-boxed has-name">
                                    <label className="file-label">
                                        <input className="file-input" type="file" name="pan" onInput={onChangeHandlerPan} />
                                        <span className="file-cta is-fixed-width">
                                            <span className="file-icon">
                                                <i className="fas fas-upload"></i>
                                            </span>
                                            <span className="file-label">
                                                Upload PAN
                                            </span>
                                        </span>
                                        <span className="file-name is-fixed-width">
                                            {componentState.panFileName}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </>
                    }

                    aadharuploadbutton={
                        <div className="columns is-centered">
                            <div className="file is-small is-boxed has-name is-light">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="aadhar" onInput={onChangeHandlerAadhar} />
                                    <span className="file-cta is-fixed-width">
                                        <span className="file-icon">
                                            <i className="fas fas-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Upload Aadhar
                                        </span>
                                    </span>
                                    <span className="file-name is-fixed-width">
                                        {componentState.aadharFileName}
                                    </span>
                                </label>
                            </div>
                        </div>
                    }

                    photouploadbutton={

                        <div className="column is-centered">
                            <div className="file is-small is-boxed has-name  is-light">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="image" onInput={onChangeHandlerPhoto} />
                                    <span className="file-cta is-fixed-width">
                                        <span className="file-icon">
                                            <i className="fas fas-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Upload Photo
                                        </span>
                                    </span>
                                    <span className="file-name is-fixed-width ">
                                        {componentState.photoFileName}
                                    </span>
                                </label>
                            </div>
                        </div>
                    }

                    submitkycbutton={{
                        children: "Submit",
                        onClick: () => {
                            if (fieldChecker) {
                                uploadFiles()
                            } else {
                                alert("Please fill all fields")
                            }
                        }
                    }}

                    redirectbutton={{
                        children: "Next",
                        onClick: () => {
                            if (props.user.get('accounts') === undefined) {
                                navigate('/connectwallet')
                            } else {
                                navigate('/')
                            }
                        }
                    }}

                    skipkycbutton={{
                        children: "Skip KYC for now",
                        onClick: () => {
                            if (props.user.get('accounts') === undefined) {
                                navigate('/connectwallet')
                            } else {
                                navigate('/')
                            }
                        }
                    }}
                />
            </div>
        </div>

    );
}

export default AdvancedKYC;

