import React, { useState, useEffect }from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import config from '../../config'

import EmailVerifyProcessPlasmic from '../plasmicComponents/EmailVerifyProcess.jsx'

function EmailVerifyProcess(props) {

    const navigate = useNavigate()
    const { token } = useParams()

    useEffect(() => {
        // axios.post('')
        console.log('token', token)
    },[])

    return (
        <>
            <EmailVerifyProcessPlasmic 

            />   
        </>
    );
}

export default EmailVerifyProcess;