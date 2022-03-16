import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useApiContract, useERC20Balances } from "react-moralis";
import Web3 from 'web3'

import DonutChart from '../reactComponents/DonutChart'
import daoContractAbi from '../ABI/SocTokDAOABI'
import defaultProfilePic from '../../images/male_user.svg'

import MyPortfolioPlasmic from '../plasmicComponents/MyPortfolio'
import Myportfoliocardtwo from '../plasmicComponents/Myportfoliocardtwo';

import config from '../../config'

function MyPortfolio(props) {

    const navigate = useNavigate()
    const [uiState, setUiState] = useState({
        parameter: '',
        donutchartcomponent: ''
    })

    const balanceFetcher = useERC20Balances()

    const [walletCards, setWalletCards] = useState([])

    const {
        runContractFunction,
        data,
        error,
        isLoading,
        isFetching,
    } = useApiContract({
        chain: "mumbai",
        address: "0xE5D31997Cc545a33847Dac2C32CB70B9e51cc6CC",
        functionName: "balanceOf",
        abi: JSON.parse(daoContractAbi),
        params: { _owner: uiState.parameter },
    })

    // useEffect(() => {
    //     Moralis.enableWeb3()
    // },[])

    useEffect(() => {
        console.log('calling useEffect...4')
        console.log('authState', props.auth.state)
        if (props.auth.state === 'authenticated') {
            setUiState(prevState => {
                return {
                    ...prevState,
                    parameter: props.user.get('accounts')[0],
                    profileName: 'Hello, ' + props.user.get('firstname')
                }
            })
        } else if (props.auth.state === 'unauthenticated') {
            navigate('/signup')
        }
    }, [props.auth])

    useEffect(() => {
        console.log('calling useEffect...3')
        if (props.auth.state === 'authenticated') {
            if (!props.mainState.balanceRetrieved) {
                let data = { userID: props.user.get('email') }
                console.log('started..')
                //let data = { userID: "testaccount@gmail.com" }
                axios.post(config.backendServer + '/viewUserDets', data).then(function (response, error) {
                    if (response) {
                        console.log('viewuserdets', response)
                        if (response.data === "No Record") {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    norecord: true
                                }
                            })
                        } else {
                            let sortedArray = [...new Map(response.data["DAOs"].map(item => [item.tokenName, item])).values()]
                            let tokBalArray = []
                            let counter = 0
                            console.log('sortedArray', sortedArray)
                            props.setUserDAOs([...sortedArray])
                            balanceFetcher.fetchERC20Balances({
                                params: {
                                    chain: "0x13881",
                                    address: props.user.get('accounts')[0]
                                },
                                onSuccess: (results) => {
                                    console.log('results', results)
                                    // console.log('data', balanceFetcher.data)
                                    console.log('sortedarray', sortedArray)
                                    //let filteredArray = results.filter(item => !sortedArray.includes(Web3.utils.toChecksumAddress(item.token_address)))
                                    let filteredArray = results.filter((ele) => {
                                        return sortedArray.some((filterElement) => {
                                            return filterElement.contractAddress === Web3.utils.toChecksumAddress(ele.token_address)
                                        })
                                    })
                                    // tokBalArray.push({
                                    //     name: results[4].name,
                                    //     symbol: results[4].symbol,
                                    //     balance: results[4].balance,
                                    //     tokenAddress: Web3.utils.toChecksumAddress(results[4].token_address)
                                    // })
                                    console.log('filtered array', filteredArray)
                                    let filterCounter = 0
                                    filteredArray.forEach(ele => {
                                        filterCounter++
                                        tokBalArray.push({
                                            name: ele.name,
                                            symbol: ele.symbol,
                                            balance: ele.balance,
                                            tokenAddress: Web3.utils.toChecksumAddress(ele.token_address)
                                        })
                                        if (filterCounter === filteredArray.length) {
                                            props.setMainState(prevState => {
                                                return {
                                                    ...prevState,
                                                    tokenBalance: tokBalArray,
                                                    balanceRetrieved: true
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    } else {
                        console.log(error)
                    }
                })
            }
        }
    }, [props.auth.state])


    useEffect(() => {
        console.log('calling useEffect...1')
        if (props.mainState.balanceRetrieved) {
            console.log('creating myportfolio card...1')
            console.log('tok bal', props.mainState.tokenBalance)
            console.log('cdata', props.creatorsData)
            props.mainState.tokenBalance.forEach(ele => {
                console.log('sym', ele.symbol)
                let obj = props.creatorsData.find(o => o.tokenSymbol === ele.symbol)
                console.log('obj', obj)
                let card = <Myportfoliocardtwo
                    profileimage={
                        <figure className="image is-48x48">
                            <img className="is-rounded" src={obj.profilePhoto} />
                        </figure>
                    }
                    tokensymbol={ele.symbol}
                    tokenname={ele.name}
                    tokenbalance={parseInt(Web3.utils.fromWei(ele.balance)).toFixed()}
                    //tokenbalance={ele.balance}
                    buybutton={{
                        onClick: () => {
                            if (props.user.get('advancedkyc')) {
                                props.setMainState(prevState => {
                                    return {
                                        ...prevState,
                                        buytoken: {
                                            tokensymbol: ele.symbol,
                                            tokenAddress: ele.tokenAddress
                                        }
                                    }
                                })
                                navigate('/buytoken')
                            } else {
                                navigate('/advancedkycalert')
                            }
                        }
                    }}
                    sendbutton={{
                        onClick: () => {
                            props.setMainState(prevState => {
                                return {
                                    ...prevState,
                                    sendtoken: {
                                        tokensymbol: ele.symbol,
                                        tokenAddress: ele.tokenAddress
                                    }
                                }
                            })
                            navigate('/sendtoken')
                        }
                    }}
                />
                setWalletCards(prevState => [...prevState, card])
                console.log('wall cards', walletCards)
            })
            setUiState(prevState => {
                return {
                    ...prevState,
                    donutchartcomponent: <DonutChart
                        mainState={props.mainState}
                        setMainState={props.setMainState}
                    />
                }
            })
        }
    }, [props.mainState.balanceRetrieved])

    useEffect(() => {
        console.log('useff', data)
    }, [data])

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <MyPortfolioPlasmic
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

                    norecord={uiState.norecord}

                    donutchart={uiState.donutchartcomponent}
                    // <DonutChart
                    //     mainState={props.mainState}
                    //     setMainState={props.setMainState}
                    // />


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

                    walletslot={
                        <>
                            {[...walletCards]}
                        </>
                    }

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

                    discovercreatorsbutton={{
                        onClick: () => {
                            navigate('/discovercreators')
                        }
                    }}
                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <MyPortfolioPlasmic
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

                    norecord={uiState.norecord}

                    donutchart={uiState.donutchartcomponent}
                    // <DonutChart
                    //     mainState={props.mainState}
                    //     setMainState={props.setMainState}
                    // />


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

                    walletslot={
                        <>
                            {[...walletCards]}
                        </>
                    }

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

                    discovercreatorsbutton={{
                        onClick: () => {
                            navigate('/discovercreators')
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default MyPortfolio;