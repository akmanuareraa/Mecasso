import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useApiContract } from 'react-moralis'
import Web3 from 'web3'
import axios from 'axios'

import daoContractAbi from '../ABI/SocTokDAOABI'
import config from '../../config'
import defaultProfilePic from '../../images/male_user.svg'

import MyproposalsPlasmic from '../plasmicComponents/Proposals'
import Proposaldaocard from '../plasmicComponents/Proposaldaocard';

function MyProposals(props) {

    const navigate = useNavigate()
    const [uiState, setUiState] = useState({
        web3enabled: false
    })
    const [daocards, setDaoCards] = useState([])
    const [contractOptions, setContractOptions] = useState({
        options: {},
        params: {}
    })

    const proposalFetcher = useApiContract({
        chain: "mumbai",
        address: contractOptions.options.address,
        functionName: "numberOfProposals",
        abi: JSON.parse(daoContractAbi)
    })

    useEffect(() => {
        if (Object.keys(contractOptions) !== 0) {
            console.log('state set')
            console.log('new state', contractOptions)
            proposalFetcher.runContractFunction({
                onSuccess: (results) => {
                    console.log('results', results)
                    let obj = props.creatorsData.find(o => o.tokenName === contractOptions.params.tokenName)
                    console.log('obj', obj)
                    let card = <Proposaldaocard
                        profilepic={
                            <figure class="image is-48x48">
                                <img className="is-rounded" src={obj.profilePhoto} />
                            </figure>
                        }
                        tokenname={contractOptions.params.tokenName}
                        tokensymbol={obj.tokenSymbol}
                        proposalsno={results}
                        listproposals={{
                            onClick: () => {
                                props.getProposalsData(contractOptions.params.contractAddress, results)
                                props.setMainState(prevState => {
                                    return {
                                        ...prevState,
                                        selectedDao: contractOptions.params.contractAddress
                                    }
                                })
                                navigate('/proposallist')
                            }
                        }}
                    />
                    setDaoCards(prevState => [...prevState, card])
                    console.log('daocards', daocards)
                },
                onError: (error) => {
                    console.log('error', error)
                }
            })
        }
    }, [contractOptions])

    useEffect(() => {
        console.log('basedata', props.dataFromBackend.status.basedata)
        if (!uiState.daosretrieved) {
            console.log('proposals retrieved', props.mainState.proposalsRetrieved)
            //if (!props.mainState.proposalsRetrieved) {
            if (props.dataFromBackend.status.basedata) {
                //if (props.auth.state === 'authenticated') {
                //let data = { userID: props.user.get('email') }
                console.log('started..')
                //let data = { userID: "testaccount@gmail.com" }
                let data = { userID: props.user.get('email') }
                axios.post(config.backendServer + '/viewUserDets', data).then(function (response, error) {
                    if (response) {
                        console.log(response)
                        if (response.data === "No Record") {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    norecord: true
                                }
                            })
                        } else {
                            let sortedArray = [...new Map(response.data["DAOs"].map(item => [item.tokenName, item])).values()]
                            console.log('sortedArray', sortedArray)
                            props.setUserDAOs([...sortedArray])
                            setDaoCards([])
                            console.log('inside contract call')
                            console.log('userdaos', props.userDAOs)
                            let counter = 0
                            sortedArray.forEach(ele => {
                                console.log('ele', ele)
                                counter++
                                let contractAddress = ele.contractAddress
                                let tokenName = ele.tokenName
                                console.log(contractAddress)
                                console.log('CA', props.user.get('accounts')[0])
                                setContractOptions({
                                    options: {
                                        address: contractAddress
                                    },
                                    params: {
                                        tokenName: tokenName,
                                        contractAddress: contractAddress
                                    }
                                })
                            })
                        }

                    } else {
                        console.log(error)
                    }
                })
                setUiState(prevState => {
                    return {
                        ...prevState,
                        daosretrieved: true
                    }
                })
                //}
                //}
            }
        }
    }, [props.dataFromBackend])

    useEffect(() => {
        if (daocards.length !== 0 && daocards.length === props.userDAOs.length) {
            console.log('inside if', daocards.length, props.userDAOs.length)
            props.setMainState(prevState => {
                return {
                    ...prevState,
                    proposalsRetrieved: true
                }
            })
        }
    }, [daocards])

    useEffect(() => {
        console.log('daocards', daocards)
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
                <MyproposalsPlasmic
                    profileoverlay={uiState.profileoverlay}
                    authoverlay={uiState.authoverlay}
                    loggedin={uiState.loggedin}
                    notloggedin={uiState.notloggedin}
                    norecord={uiState.norecord}

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

                    redirectbutton={{
                        children: "Discover Creators",
                        onClick: () => {
                            navigate('/discovercreators')
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

                    listproposals={{
                        onClick: () => { navigate('/proposallist') }
                    }}

                    navbartwo={{
                        proposaltoggle: true,
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

                    daoslot={[...daocards]}
                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <MyproposalsPlasmic
                    profileoverlay={uiState.profileoverlay}
                    authoverlay={uiState.authoverlay}
                    loggedin={uiState.loggedin}
                    notloggedin={uiState.notloggedin}
                    norecord={uiState.norecord}

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

                    redirectbutton={{
                        children: "Discover Creators",
                        onClick: () => {
                            navigate('/discovercreators')
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

                    listproposals={{
                        onClick: () => { navigate('/proposallist') }
                    }}

                    navbartwo={{
                        proposaltoggle: true,
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

                    daoslot={[...daocards]}
                />
            </div>
        </div>
    );
}

export default MyProposals;