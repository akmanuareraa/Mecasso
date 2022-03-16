import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import EmailVerificationPlasmic from '../plasmicComponents/EmailVerification'

function EmailVerification(props) {

    const navigate = useNavigate()

    useEffect(() => {
        console.log('auths', props.auth.state)
        if (props.auth.state === 'unauthenticated') {
            navigate('/signup')
        }
    }, [props.auth.state])

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <EmailVerificationPlasmic
                    loginredirectbutton={{
                        children: "Go back to Login",
                        onClick: () => {
                            props.logout()
                            navigate('/emaillogin')
                            // if(props.auth.state === 'authenticated'){
                            //     if(props.user.get('username').slice(0,2) === 'UP') {

                            //     }
                            // }
                        }
                    }}
                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <EmailVerificationPlasmic
                    loginredirectbutton={{
                        children: "Go back to Login",
                        onClick: () => {
                            props.logout()
                            navigate('/emaillogin')
                            // if(props.auth.state === 'authenticated'){
                            //     if(props.user.get('username').slice(0,2) === 'UP') {

                            //     }
                            // }
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default EmailVerification;