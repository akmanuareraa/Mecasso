import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Web3 from 'web3'

import ConnectWalletPlasmic from '../plasmicComponents/ConnectWallet'

function ConnectWallet(props) {

    const navigate = useNavigate()

    const [uiState, setUiState] = useState({
        loading: false,
        connected: false,
        address: ''
    })

    useEffect(() => {
        console.log('web3??', props.isWeb3Enabled)
        console.log('web3Enableerror', props.web3Enableerror)
        console.log('web3', props.web3)
            if (props.web3 !== null) {
                console.log('obj keys', props.web3)
                console.log('addra', props.web3.provider)
                if (props.web3.provider.selectedAddress !== undefined) {
                    console.log('addra', props.web3.provider.selectedAddress)
                    props.setUserData({
                        accounts: [props.web3.provider.selectedAddress]
                    })
                    setUiState(prevState => {
                        return {
                            ...prevState,
                            loading: false,
                            connected: true,
                            address: props.web3.provider.selectedAddress
                        }
                    })
                }
            }
        
    }, [props.web3])

    // useEffect(() => {
    //    console.log('web3 stat', props.isWeb3Enabled)
    //    if(props.isWeb3Enabled){
    //        console.log('web3 stat in', props.web3.provider)
    //        console.log('web3 stat in json', Object.keys(props.web3.provider))
    //        console.log('web3 stat in json', props.web3.provider.selectedAddress)
    //    } 
    // },[props.isWeb3Enabled])

    useEffect(() => {
        console.log(props.auth)
        console.log('auth error', props.hasAuthError)
        if (props.auth.state === 'authenticated') {
            if (props.user.get("ethAddress") !== undefined) {
                console.log(props.user.get("ethAddress"))
            }
        } else if (props.auth.state === 'unauthenticated') {
            navigate('/signup')
        }
    }, [props.auth.state])

    return (

        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <ConnectWalletPlasmic
                    loading={uiState.loading}
                    connected={uiState.connected}

                    address={uiState.address}

                    wcbutton={{
                        children: "Connect your Mobile Wallet",
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    loading: true,
                                    connected: false
                                }
                            })
                            // props.authenticate({
                            //     provider: "walletconnect",
                            //     chainId: 137
                            // })
                            props.enableWeb3({ provider: 'walletconnect', signingMessage: "Welcome to Mecasso" })
                        }
                    }}

                    metamaskbutton={{
                        children: "Connect Metamask Wallet",
                        onClick: () => {
                            props.enableWeb3({signingMessage: "Welcome to Mecasso"})
                        }
                    }}

                    explorerenaibutton={{
                        children: "Explore Mecasso",
                        onClick: () => {
                            navigate('/')
                        }
                    }}
                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <ConnectWalletPlasmic
                    loading={uiState.loading}
                    connected={uiState.connected}

                    address={uiState.address}

                    wcbutton={{
                        children: "Connect your Mobile Wallet",
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    loading: true,
                                    connected: false
                                }
                            })
                            // props.authenticate({
                            //     provider: "walletconnect",
                            //     chainId: 137
                            // })
                            props.enableWeb3({ provider: 'walletconnect', signingMessage: "Welcome to Mecasso"})
                        }
                    }}

                    metamaskbutton={{
                        children: "Connect Metamask Wallet",
                        onClick: () => {
                            props.enableWeb3({signingMessage: "Welcome to Mecasso"})
                        }
                    }}

                    explorerenaibutton={{
                        children: "Explore Mecasso",
                        onClick: () => {
                            navigate('/')
                        }
                    }}
                />
            </div>
        </div>
    );
}



export default ConnectWallet;