import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useWeb3Transfer, useApiContract, useWeb3Contract, useChain } from 'react-moralis'
import Moralis from 'moralis'
import axios from 'axios'
import Web3 from 'web3';

import config from '../../config'
import daoContractAbi from '../ABI/SocTokDAOABI';

import defaultProfilePic from '../../images/male_user.svg'

import SendtokenPage from '../plasmicComponents/SendtokenPage'

function SendToken(props) {

    const navigate = useNavigate()
    const { switchNetwork, chainId, chain, account } = useChain();
    const [componentState, setComponentState] = useState({})
    const [uiState, setUiState] = useState({
        tokenprice: 0,
        success: false,
        failed: false,
        loading: false,
        initiateTxn: false
    })

    // const tokenTransferMoralis = useWeb3Transfer()
    // const tokenTransferMoralis = useApiContract({})
    const tokenTransferMoralis = useWeb3Contract({})

    const handleChange = (e, field) => {
        let dataField = field
        console.log('Field: ' + field, 'Value: ', e.target.value)
        setComponentState(prevState => {
            return {
                ...prevState,
                [dataField]: e.target.value
            }
        })
        //console.log(signupData)
    }

    useEffect(() => {
        if (uiState.initiateTxn) {
            if (!props.isWeb3Enabled) {
                console.log('enabling web3 from inittxn useffect')
                if(window.screen.width <= 780){
                    props.enableWeb3({ provider: 'walletconnect', chainId: 137 })
                } else {
                    props.enableWeb3({ chainId: 137 }) 
                }
            } else {
                sendTokens()
                setUiState(prevState => {
                    return {
                        ...prevState,
                        initiateTxn: false
                    }
                })
            }
        }
    }, [uiState.initiateTxn])

    useEffect(() => {
        if (props.web3 !== null && uiState.initiateTxn) {
            console.log('calling sendTokens.. from web3 useeffect')
            sendTokens()
            setUiState(prevState => {
                return {
                    ...prevState,
                    initiateTxn: false
                }
            })
        }
        if(props.web3 !== null){
            if (window.screen.width > 780) {
                switchNetwork('0x13881').then(async () => {
                    console.log('network switched', props.web3.provider.chainId)
                })
            }
        }
    }, [props.web3])

    async function sendTokens() {
        console.log('calling sendtokenfunc')
        console.log('params to sendtokens', componentState.recvAddress, Web3.utils.toWei(componentState.tokenamount.toString()))
        tokenTransferMoralis.runContractFunction({
            params: {
                chain: "mumbai",
                contractAddress: props.mainState.sendtoken.tokenAddress,
                functionName: "transfer",
                abi: JSON.parse(daoContractAbi),
                params: { "_to": componentState.recvAddress, "_amount": Web3.utils.toWei(componentState.tokenamount.toString()) }
            },
            onSuccess: (results) => {
                console.log('results', results)
                setUiState(prevState => {
                    return {
                        ...prevState,
                        success: true,
                        failed: false,
                        loading: false,
                        txnhash: results.hash.slice(0, 25) + '...'
                    }
                })
                let obj = props.creatorsData.find(o => o.tokenSymbol === props.mainState.sendtoken.tokensymbol)
                let data = {
                    tokenName: obj.tokenName,
                    //baseAsset: uiState.baseAsset,
                    baseAsset: 'MATIC',
                    userID: props.user.get('email'),
                    creator: obj.creatorAddress,
                    contractAddress: props.mainState.sendtoken.tokenAddress,
                    price: parseFloat(uiState.tokenprice),
                    amount: parseFloat(componentState.tokenamount),
                    transactionDate: new Date().getTime() + ' - SEND'
                }
                axios.post(config.backendServer + '/addTransaction', data).then(function (response, error) {
                    if (response) {
                        console.log(response)
                        // setUiState(prevState => {
                        //     return {
                        //         ...prevState,
                        //         success: true,
                        //         failed: false,
                        //         loading: false,
                        //         txnhash: results.hash.slice(0, 25) + '...'
                        //     }
                        // })
                    } else {
                        console.log(error)
                    }
                })
            },
            onError: (error) => {
                console.log('error', error)
                setUiState(prevState => {
                    return {
                        ...prevState,
                        success: false,
                        failed: true,
                        loading: false
                    }
                })
            }
        })

    }

    useEffect(() => {
        console.log('contract addr', props.mainState.sendtoken.tokenAddress)
        axios.post(config.backendServer + '/queryDAO', { contractAddress: props.mainState.sendtoken.tokenAddress }).then(function (response, error) {
            if (response) {
                console.log(response)
                setUiState(prevState => {
                    return {
                        ...prevState,
                        tokenprice: response.data.queryresult[0].currentPrice
                    }
                })
            } else {
                console.log(error)
            }
        })
        if (window.screen.width > 780) {
            props.enableWeb3({ chainId: 137, signingMessage: "Welcome to Mecasso"})
        }
    }, [])

    useEffect(() => {
        if (props.auth.state === 'authenticated') {
            setUiState(prevState => {
                return {
                    ...prevState,
                    profileName: 'Hello, ' + props.user.get('firstname')
                }
            })
        } else if (props.auth.state === 'unauthenticated') {
            navigate('/signup')
        }
    }, [props.auth])

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <SendtokenPage
                    profileoverlay={uiState.profileoverlay}
                    authoverlay={uiState.authoverlay}
                    loggedin={uiState.loggedin}
                    notloggedin={uiState.notloggedin}

                    overlaycreatorname={props.mainState.userfirstname}
                    overlaycategory={uiState.userProfile}
                    overlaycreatortype=''
                    overlayuserprofilepic={
                        <figure className="image">
                            {/* <img className="is-rounded" src={podiumImages[0]} /> */}
                            <img className="is-rounded" src={props.mainState.userprofilepicture} />
                        </figure>
                    }
                    updateprofilebutton={{
                        onClick: () => {
                            alert('Profile Photo Uploaded')
                        }
                    }}

                    logoutbutton={{
                        onClick: () => {
                            props.logout()
                            navigate('/')
                        }
                    }}
                    gobackbutton={{
                        children: 'Go Back',
                        onClick: () => {
                            navigate('/myportfolio')
                        }
                    }}


                    uploadbuttonslot={
                        <>
                            <div class="file is-medium is-info">
                                <label class="file-label">
                                    <input class="file-input" type="file" name="pan" onChange={props.onChangeHandlerPhoto} />
                                    <span class="file-cta is-renai">
                                        <span class="file-label">
                                            Upload Profile Photo
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </>
                    }

                    backbutton={{
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    profileoverlay: false,
                                    authoverlay: false
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

                    sendtoken={{

                        success: uiState.success,
                        failed: uiState.failed,
                        loading: uiState.loading,

                        tokensymbolone: props.mainState.sendtoken.tokensymbol,

                        tokensymboltwo: props.mainState.sendtoken.tokensymbol,

                        tokenprice: uiState.tokenprice,

                        txnhash: uiState.txnhash,

                        tokenamountinput: {
                            onChange: (e) => handleChange(e, "tokenamount")
                        },

                        receiverinput: {
                            onChange: (e) => handleChange(e, "recvAddress")
                        },

                        sendbutton: {
                            onClick: () => {
                                console.log("Sent " + componentState.tokenamount + " PBO tokens to " + componentState.recvAddress + "TKN ADDR: " + props.mainState.sendtoken.tokenAddress)
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        success: false,
                                        failed: false,
                                        loading: true,
                                        initiateTxn: true
                                    }
                                })
                                //sendTokens()
                            }
                        }
                    }}

                    navbartwo={{
                        portfoliotoggle: true,
                        lbbutton: { onClick: () => { navigate('/') } },
                        feedbutton: { onClick: () => { navigate('/socialfeed') } },
                        portfoliobutton: {
                            onClick: () => {
                                if (props.user.get('basickyc')) {
                                    navigate('/myportfolio')
                                } else {
                                    navigate('/basickycalert')
                                }
                            }
                        },
                        txnsbutton: {
                            onClick: () => {
                                if (props.user.get('basickyc')) {
                                    navigate('/mytransactions')
                                } else {
                                    navigate('/basickycalert')
                                }
                            }
                        },
                        proposalbutton: {
                            onClick: () => {
                                if (props.user.get('basickyc')) {
                                    navigate('/myproposals')
                                } else {
                                    navigate('/basickycalert')
                                }
                            }
                        }
                    }}

                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <SendtokenPage
                    profileoverlay={uiState.profileoverlay}
                    authoverlay={uiState.authoverlay}
                    loggedin={uiState.loggedin}
                    notloggedin={uiState.notloggedin}

                    overlaycreatorname={props.mainState.userfirstname}
                    overlaycategory={uiState.userProfile}
                    overlaycreatortype=''
                    overlayuserprofilepic={
                        <figure className="image">
                            {/* <img className="is-rounded" src={podiumImages[0]} /> */}
                            <img className="is-rounded" src={props.mainState.userprofilepicture} />
                        </figure>
                    }
                    updateprofilebutton={{
                        onClick: () => {
                            alert('Profile Photo Uploaded')
                        }
                    }}

                    logoutbutton={{
                        onClick: () => {
                            props.logout()
                            navigate('/')
                        }
                    }}

                    gobackbutton={{
                        children: 'Go Back',
                        onClick: () => {
                            navigate('/myportfolio')
                        }
                    }}

                    uploadbuttonslot={
                        <>
                            <div class="file is-medium is-info">
                                <label class="file-label">
                                    <input class="file-input" type="file" name="pan" onChange={props.onChangeHandlerPhoto} />
                                    <span class="file-cta is-renai">
                                        <span class="file-label">
                                            Upload Profile Photo
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </>
                    }

                    backbutton={{
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    profileoverlay: false,
                                    authoverlay: false
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

                    sendtoken={{

                        success: uiState.success,
                        failed: uiState.failed,
                        loading: uiState.loading,

                        tokensymbolone: props.mainState.sendtoken.tokensymbol,

                        tokensymboltwo: props.mainState.sendtoken.tokensymbol,

                        tokenprice: uiState.tokenprice,

                        txnhash: uiState.txnhash,

                        tokenamountinput: {
                            onChange: (e) => handleChange(e, "tokenamount")
                        },

                        receiverinput: {
                            onChange: (e) => handleChange(e, "recvAddress")
                        },

                        sendbutton: {
                            onClick: () => {
                                console.log("Sent " + componentState.tokenamount + " PBO tokens to " + componentState.recvAddress + "TKN ADDR: " + props.mainState.sendtoken.tokenAddress)
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        success: false,
                                        failed: false,
                                        loading: true,
                                        initiateTxn: true
                                    }
                                })
                                //sendTokens()
                            }
                        }
                    }}

                    navbartwo={{
                        portfoliotoggle: true,
                        lbbutton: { onClick: () => { navigate('/') } },
                        feedbutton: { onClick: () => { navigate('/socialfeed') } },
                        portfoliobutton: {
                            onClick: () => {
                                if (props.user.get('basickyc')) {
                                    navigate('/myportfolio')
                                } else {
                                    navigate('/basickycalert')
                                }
                            }
                        },
                        txnsbutton: {
                            onClick: () => {
                                if (props.user.get('basickyc')) {
                                    navigate('/mytransactions')
                                } else {
                                    navigate('/basickycalert')
                                }
                            }
                        },
                        proposalbutton: {
                            onClick: () => {
                                if (props.user.get('basickyc')) {
                                    navigate('/myproposals')
                                } else {
                                    navigate('/basickycalert')
                                }
                            }
                        }
                    }}

                />
            </div>
        </div>
    );
}

export default SendToken;