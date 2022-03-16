import React, { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis'
import { useNavigate } from 'react-router-dom'

import config from '../../config'

import FaninvestorpagePlasmic from '../plasmicComponents/Faninvestorpage'

function FanInvestorPreference(props) {

    const navigate = useNavigate()

    const [uiState, setUiState] = useState({})
    const [componentState, setComponentState] = useState({
        selectedPref: null
    })

    useEffect(() => {
        if (componentState.selectedPref === 'Fan' || componentState.selectedPref === 'Investor') {
            props.setUserData({
                "profile": { profile: componentState.selectedPref }
            })
            navigate('/userpref')
        }
    }, [componentState.selectedPref])

    useEffect(() => {
        console.log('auths', props.auth.state)
        if (props.auth.state === 'unauthenticated') {
            navigate('/signup')
        }
    }, [props.auth.state])

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <FaninvestorpagePlasmic
                    investorbutton={{
                        selected2: uiState.investorselected,
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    investorselected: true
                                }
                            })
                            setComponentState({
                                selectedPref: "Investor"
                            })
                        }
                    }}

                    fanbutton={{
                        selected2: uiState.fanselected,
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    fanselected: true
                                }
                            })
                            setComponentState({
                                selectedPref: "Fan"
                            })
                        }
                    }}
                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <FaninvestorpagePlasmic
                    investorbutton={{
                        selected2: uiState.investorselected,
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    investorselected: true
                                }
                            })
                            setComponentState({
                                selectedPref: "Investor"
                            })
                        }
                    }}

                    fanbutton={{
                        selected2: uiState.fanselected,
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    fanselected: true
                                }
                            })
                            setComponentState({
                                selectedPref: "Fan"
                            })
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default FanInvestorPreference;