import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import config from '../../config'

import EmailTokenVer from '../plasmicComponents/EmailTokenVer.jsx'

function EmailTokenVerification(props) {

    const { token } = useParams()
    const navigate = useNavigate()
    const [uiState, setUiState] = useState({
        success: false,
        fail: false,
        emailverified: null
    })

    useEffect(() => {
        console.log('USER', props.user)
        if (props.user !== null) {
            if (uiState.emailverified) {
                props.setUserData({
                    emailverified: true
                })
            }
        }
    }, [uiState.emailverified])

    useEffect(() => {
        console.log('token', token)
        if (token !== undefined) {
            //function to verify the token that is received from the confirmation email
            axios.post(config.backendServer + '/verifyEmailToken', { "verifytoken": parseInt(token) }).then(function (response, error) {
                if (response) {
                    console.log(response.data.response)
                    if (response.data.response) {
                        setUiState(prevState => {
                            return {
                                fail: false,
                                success: true,
                                emailverified: true
                            }
                        })
                    } else {
                        setUiState(prevState => {
                            return {
                                emailfailmsg: true,
                                emailsuccessmsg: false
                            }
                        })
                    }
                }
            })
        } else if (props.auth.state === 'unauthenticated') {
            navigate('/signup')
        }
    }, [])

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <EmailTokenVer
                    success={uiState.success}
                    fail={uiState.fail}

                    redirectbutton={{
                        //give button inner-text
                        children: "Go back to Login",
                        onClick: () => {
                            // navigate to a page
                            props.logout()
                            navigate('/emaillogin')
                        }
                    }}
                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <EmailTokenVer
                    success={uiState.success}
                    fail={uiState.fail}

                    redirectbutton={{
                        //give button inner-text
                        children: "Go back to Login",
                        onClick: () => {
                            // navigate to a page
                            props.logout()
                            navigate('/emaillogin')
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default EmailTokenVerification;