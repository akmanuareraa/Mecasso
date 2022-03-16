import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useWeb3Contract, useWeb3ExecuteFunction, useMoralis, useChain } from 'react-moralis'
import Web3 from 'web3'
import axios from 'axios'
import transakSDK from '@transak/transak-sdk'

import config from '../../config'

import daoContractModAbi from '../ABI/SocTokDAOMod'
import daoContractAbi from '../ABI/SocTokDAOABI'
import erc20abi from '../ABI/erc20abi'

import BuyTokenPlasmic from '../plasmicComponents/Buytokenpage'
import defaultProfilePic from '../../images/male_user.svg'

function BuyToken(props) {

    const navigate = useNavigate()
    const { Moralis } = useMoralis()
    const tokenTransferMoralis = useWeb3Contract({})
    const { switchNetwork, chainId, chain, account } = useChain();
    const web3exec = useWeb3ExecuteFunction({})
    const [componentState, setComponentState] = useState({
        tokenamount: "0"
    })
    const [uiState, setUiState] = useState({
        wdai: false,
        weth: false,
        loading: false,
        success: false,
        failed: false,
        tokensymbol: 'NULL',
        tokenprice: 0,
        exchangeContract: '0x0000',
        profileName: ''
    })

    // const excessDecimal = (value) => {
    //     let splitArray = value.toString().split('.')
    //     if(splitArray.length === 1) {
    //         if (splitArray[0].length)
    //     }
    // }

    const handleChange = (e, field) => {
        console.log('Field: ' + field, 'Value: ', e.target.value, componentState.amounttopay, uiState.tokenprice)
        if (field === 'tokenamount') {
            setComponentState(prevState => {
                return {
                    ...prevState,
                    tokenamount: e.target.value
                }
            })
            if (uiState.wdai) {
                let calAmount = parseFloat(e.target.value) * parseFloat(uiState.tokenprice) * 0.694376
                setComponentState(prevState => {
                    return {
                        ...prevState,
                        amounttopay: calAmount.toFixed(18)
                    }
                })
            } else if (uiState.weth) {
                console.log(2)
                let calAmount = parseFloat(e.target.value) * parseFloat(uiState.tokenprice) * 0.000534
                setComponentState(prevState => {
                    return {
                        ...prevState,
                        amounttopay: calAmount.toFixed(18)
                    }
                })
            } else {
                console.log(3)
                let calAmount = parseFloat(e.target.value) * parseFloat(uiState.tokenprice)
                setComponentState(prevState => {
                    return {
                        ...prevState,
                        amounttopay: calAmount.toFixed(18)
                    }
                })
            }
        }
    }

    useEffect(() => {
        if (uiState.initiateTxn) {
            if (!props.isWeb3Enabled) {
                console.log('enabling web3 from inittxn useffect')
                if (window.screen.width <= 780) {
                    props.enableWeb3({ provider: 'walletconnect', chainId: '137', signingMessage: "Welcome to Mecasso" })
                } else {
                    props.enableWeb3({ chainId: '137', signingMessage: "Welcome to Mecasso" })
                }

            } else {
                buyTokens()
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
            console.log('calling sendTokens.. from web3 useeffect', props.web3)
            let chainIdDec = props.web3.provider.chainId;
            console.log('chainid', chainIdDec)
            buyTokens()
            // if (props.web3.provider.chainId.toString() == '80001') {
            //     buyTokens()
            // } else {
            //     console.log('changing network')
            //     changeNtw()
            // }
            // // buyTokens()
            // setUiState(prevState => {
            //     return {
            //         ...prevState,
            //         initiateTxn: false
            //     }
            // })
        }
        if (props.web3 !== null) {
            if (window.screen.width > 780) {
                switchNetwork('0x13881').then(async () => {
                    console.log('network switched', props.web3.provider.chainId)
                })
            }
        }
    }, [props.web3])


    const changeNtw = async () => {
        if (props.web3.provider.chainId.toString() !== '0x13881') {
            if (window.screen.width > 780) {
                switchNetwork('0x13881').then(async () => {
                    console.log('after sw net', props.web3.provider.chainId)
                    buyTokens()
                })
            }
        } else {
            buyTokens()
        }
    }

    async function transakTransaction() {
        let transak = new transakSDK({
            apiKey: 'dc21faeb-ea3d-4541-b28a-6ced3d421456',
            environment: 'STAGING',
            hostURL: window.location.origin,
            widgetHeight: '625px',
            widgetWidth: '500px',

            cryptoCurrencyCode: 'DVI',
            network: 'POLYGON',
            //walletAddress: '0x8391c675d2f3588ff97a336E0A6b368546e4F322',
            walletAddress: '0x4A5B8807e404CFb3A944F9fAB9B673F560cF6031',
            disableWalletAddressForm: true,
            fiatCurrency: 'INR',
            //fiatAmount: '7600',
            hideMenu: true,
            
            email: 'manuareraa@gmail.com',
            themeColor: '192A46',
            exchangeScreenTitle: 'Pay via Credit Card or UPI'

        })

        transak.init();

        // To get all the events
        transak.on(transak.ALL_EVENTS, (data) => {
            console.log('transakData',data)
        });

        // This will trigger when the user marks payment is made.
        transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
            console.log('orderData', orderData);
            transak.close();
        });
    }


    async function buyTokens() {
        console.log('calling buytokenfunc')
        console.log('approve params', props.mainState.buytoken.tokenAddress, Web3.utils.toWei(componentState.amounttopay.toString(), 'ether'), 'exchange contract', uiState.exchangeContract)
        console.log('check')
        console.log('calling buytokens()', props.web3.provider.chainId)
        if (uiState.exchangeContract === '0x0000') {
            console.log('inside matic')
            await tokenTransferMoralis.runContractFunction({
                params: {
                    chain: "mumbai",
                    //contractAddress: "0x2d2a42527E71bb0366631E49A64F5096d4A953A7",
                    contractAddress: props.mainState.buytoken.tokenAddress,
                    functionName: "swapmatic",
                    abi: JSON.parse(daoContractModAbi),
                    //abi: JSON.parse(daoContractAbi),
                    params: {
                        "_buyerAddress": props.user.get('accounts')[0],
                        "_sendAmount": Web3.utils.toWei(componentState.amounttopay.toString(), 'ether'),
                        "_receiveAmount": Web3.utils.toWei(componentState.tokenamount.toString(), 'ether')
                    },
                    msgValue: Web3.utils.toWei(componentState.amounttopay.toString(), 'ether')
                },
                onSuccess: (results) => {
                    console.log('results for native swap', results)
                    console.log('crs data', props.creatorsData)
                    console.log('tokensym from ui', uiState.tokensymbol)
                    setUiState(prevState => {
                        return {
                            ...prevState,
                            txnhash: results.hash.slice(0, 25) + '...'
                        }
                    })
                    let obj = props.creatorsData.find(o => o.tokenSymbol === props.mainState.buytoken.tokensymbol)
                    let data = {
                        tokenName: obj.tokenName,
                        baseAsset: uiState.baseAsset,
                        userID: props.user.get('email'),
                        creator: obj.creatorAddress,
                        contractAddress: props.mainState.buytoken.tokenAddress,
                        price: parseFloat(uiState.tokenprice),
                        amount: parseFloat(componentState.amounttopay),
                        transactionDate: new Date().getTime()
                    }
                    axios.post(config.backendServer + '/addTransaction', data).then(function (response, error) {
                        if (response) {
                            console.log(response)
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    success: true,
                                    failed: false,
                                    loading: false,
                                    txnhash: results.hash.slice(0, 25) + '...'
                                }
                            })
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
        } else {
            console.log('inside nonmatic')
            const optionsforapprove = {
                functionName: 'approve',
                contractAddress: uiState.exchangeContract,
                abi: JSON.parse(erc20abi),
                params: {
                    "spender": props.mainState.buytoken.tokenAddress,
                    "amount": Web3.utils.toWei(componentState.amounttopay.toString(), 'ether')
                }
            }
            const transactionapprove = await Moralis.executeFunction(optionsforapprove)
            const approvereceipt = await transactionapprove.wait()
            console.log(1, approvereceipt)
            setUiState(prevState => {
                return {
                    ...prevState,
                    txnhash: approvereceipt.transactionHash.slice(0, 25) + '...'
                }
            })
            if (approvereceipt.status === 1) {
                console.log('swap params',
                    props.user.get('accounts')[0],
                    Web3.utils.toWei(componentState.amounttopay.toString(), 'ether'),
                    Web3.utils.toWei(componentState.tokenamount.toString(), 'ether'),
                    uiState.exchangeContract
                )
                const requestDetails = {
                    functionName: 'swaperc20',
                    contractAddress: props.mainState.buytoken.tokenAddress,
                    //msgValue:Moralis.Units.ETH("0.02"),
                    abi: JSON.parse(daoContractModAbi),
                    params: {
                        "_buyerAddress": props.user.get('accounts')[0],
                        "_sendAmount": Web3.utils.toWei(componentState.amounttopay.toString(), 'ether'),
                        "_receiveAmount": Web3.utils.toWei(componentState.tokenamount.toString(), 'ether'),
                        "_tokenAddress": uiState.exchangeContract
                    },
                }
                const transaction = await Moralis.executeFunction(requestDetails)
                const receipt = await transaction.wait()
                console.log(2, receipt)
                setUiState(prevState => {
                    return {
                        ...prevState,
                        txnhash: receipt.transactionHash.slice(0, 25) + '...'
                    }
                })
                if (receipt.status === 1) {
                    setUiState(prevState => {
                        return {
                            ...prevState,
                            success: true,
                            failed: false,
                            loading: false
                        }
                    })
                    let obj = props.creatorsData.find(o => o.tokenSymbol === props.mainState.buytoken.tokensymbol)
                    let data = {
                        tokenName: obj.tokenName,
                        baseAsset: uiState.baseAsset,
                        userID: props.user.get('email'),
                        creator: obj.creatorAddress,
                        contractAddress: props.mainState.buytoken.tokenAddress,
                        price: parseFloat(uiState.tokenprice),
                        //amount: parseFloat(componentState.amounttopay),
                        amount: parseFloat(componentState.tokenamount),
                        transactionDate: new Date().getTime()
                    }
                    axios.post(config.backendServer + '/addTransaction', data).then(function (response, error) {
                        if (response) {
                            console.log(response)
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    success: true,
                                    failed: false,
                                    loading: false
                                }
                            })
                        } else {
                            console.log(error)
                        }
                    })
                } else {
                    setUiState(prevState => {
                        return {
                            ...prevState,
                            success: false,
                            failed: true,
                            loading: false
                        }
                    })
                }
            } else {
                setUiState(prevState => {
                    return {
                        ...prevState,
                        success: false,
                        failed: true,
                        loading: false
                    }
                })
            }
        }
    }

    useEffect(() => {
        console.log('contract addr', props.mainState.buytoken.tokenAddress)
        axios.post(config.backendServer + '/queryDAO', { contractAddress: props.mainState.buytoken.tokenAddress }).then(function (response, error) {
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
            props.enableWeb3({ chainId: 137, signingMessage: "Welcome to Mecasso" })
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
                <BuyTokenPlasmic
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

                    backpagebutton={{
                        children: "Go Back",
                        onClick: () => {
                            navigate('/myportfolio')
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

                    buytokendashboard={{

                        wdai: uiState.wdai,
                        weth: uiState.weth,
                        loading: uiState.loading,
                        success: uiState.success,
                        failed: uiState.failed,

                        tokensymbolone: props.mainState.buytoken.tokensymbol,
                        tokensymboltwo: props.mainState.buytoken.tokensymbol,
                        tokenprice: uiState.tokenprice,

                        txnhash: uiState.txnhash,

                        maticbutton: {
                            onClick: () => {
                                console.log(11)
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        wdai: false,
                                        weth: false,
                                        exchangeContract: '0x0000',
                                        baseAsset: 'MATIC'
                                    }
                                })
                                setComponentState(prevState => {
                                    return {
                                        ...prevState,
                                        amounttopay: 0
                                    }
                                })
                            }
                        },

                        wdaibutton: {
                            onClick: () => {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        wdai: true,
                                        weth: false,
                                        exchangeContract: '0xD8127560c84463eC32F48977AC8D74aDAE1c1bd9',
                                        baseAsset: 'WDAI'
                                    }
                                })
                                setComponentState(prevState => {
                                    return {
                                        ...prevState,
                                        amounttopay: 0
                                    }
                                })
                            }
                        },

                        wethbutton: {
                            onClick: () => {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        wdai: false,
                                        weth: true,
                                        exchangeContract: '0xF45de7A671c20c88138AE20e42D64732eaBbD2B6',
                                        baseAsset: 'WETH'
                                    }
                                })
                                setComponentState(prevState => {
                                    return {
                                        ...prevState,
                                        amounttopay: 0
                                    }
                                })
                            }
                        },

                        tokeninput: {
                            onChange: (e) => handleChange(e, "tokenamount")
                        },

                        amounttopay: componentState.amounttopay,

                        buybutton: {
                            onClick: () => {
                                console.log("Bought " + componentState.tokenamount + " PBO tokens")
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        success: false,
                                        failed: false,
                                        loading: true,
                                        initiateTxn: true
                                    }
                                })
                            }
                        },

                        fiatbuybutton: {
                            onClick: () => {
                                //window.open('https://staging-global.transak.com/?apiKey=dc21faeb-ea3d-4541-b28a-6ced3d421456', '_blank')
                                transakTransaction()
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
                <BuyTokenPlasmic
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

                    backpagebutton={{
                        children: "Go Back",
                        onClick: () => {
                            navigate('/myportfolio')
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

                    buytokendashboard={{

                        wdai: uiState.wdai,
                        weth: uiState.weth,
                        loading: uiState.loading,
                        success: uiState.success,
                        failed: uiState.failed,

                        tokensymbolone: props.mainState.buytoken.tokensymbol,
                        tokensymboltwo: props.mainState.buytoken.tokensymbol,
                        tokenprice: uiState.tokenprice,

                        txnhash: uiState.txnhash,

                        maticbutton: {
                            onClick: () => {
                                console.log(11)
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        wdai: false,
                                        weth: false,
                                        exchangeContract: '0x0000',
                                        baseAsset: 'MATIC'
                                    }
                                })
                                setComponentState(prevState => {
                                    return {
                                        ...prevState,
                                        amounttopay: 0
                                    }
                                })
                            }
                        },

                        wdaibutton: {
                            onClick: () => {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        wdai: true,
                                        weth: false,
                                        exchangeContract: '0xD8127560c84463eC32F48977AC8D74aDAE1c1bd9',
                                        baseAsset: 'WDAI'
                                    }
                                })
                                setComponentState(prevState => {
                                    return {
                                        ...prevState,
                                        amounttopay: 0
                                    }
                                })
                            }
                        },

                        wethbutton: {
                            onClick: () => {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        wdai: false,
                                        weth: true,
                                        exchangeContract: '0xF45de7A671c20c88138AE20e42D64732eaBbD2B6',
                                        baseAsset: 'WETH'
                                    }
                                })
                                setComponentState(prevState => {
                                    return {
                                        ...prevState,
                                        amounttopay: 0
                                    }
                                })
                            }
                        },

                        tokeninput: {
                            onChange: (e) => handleChange(e, "tokenamount")
                        },

                        amounttopay: componentState.amounttopay,

                        buybutton: {
                            onClick: () => {
                                console.log("Bought " + componentState.tokenamount + " PBO tokens")
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        success: false,
                                        failed: false,
                                        loading: true,
                                        initiateTxn: true
                                    }
                                })
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

export default BuyToken;