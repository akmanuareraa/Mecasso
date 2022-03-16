import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import config from '../../config'
import defaultProfilePic from '../../images/male_user.svg'

import Txncard from '../plasmicComponents/Txncard'
import MytransactionsPlasmic from '../plasmicComponents/Mytransactions'

function MyTransactions(props) {

    const navigate = useNavigate()
    const [uiState, setUiState] = useState({
        txnsParsed: false
    })
    const [txnData, setTxnData] = useState([])
    const [txnCards, setTxnCards] = useState([])

    const timeConv = (timestamp) => {
        let time = new Date(timestamp);
        let formattedTime = time.toString().slice(4, 21)
        return formattedTime;
    }

    useEffect(() => {
        console.log('basedata', props.dataFromBackend.status.basedata)
        if (props.dataFromBackend.status.basedata) {
            console.log('useff mytxn called')
            // let data = { userID: "testaccount@gmail.com" }
            let data = { userID: props.user.get('email') }
            axios.post(config.backendServer + '/viewUserTransactions', data).then(function (response, error) {
                if (response) {
                    if (response.data.transactions.length !== 0) {
                        let counter = 0
                        console.log('res data', response.data.transactions)
                        response.data.transactions.forEach(ele => {
                            counter++
                            let obj = props.creatorsData.find(o => o.tokenName === ele.tokenName);
                            ele["tokenSymbol"] = obj.tokenSymbol
                            ele["profilePhoto"] = obj.profilePhoto
                            ele["timestamp"] = timeConv(ele.transactionDate)
                            setTxnData(prevState => [...prevState, ele])
                            if (counter === response.data.transactions.length) {
                                console.log('txn data parsed')
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        txnsParsed: true
                                    }
                                })
                            }
                        })
                    } else {
                        setUiState(prevState => {
                            return {
                                ...prevState,
                                norecord: true,
                                profileoverlay: false,
                                authoverlay: false,
                                loggedin: false,
                                notloggedin: false
                            }
                        })
                    }
                } else {
                    console.log(error)
                }
            })
        }
    }, [props.dataFromBackend])

    useEffect(() => {
        if (uiState.txnsParsed) {
            console.log('preparing cards')
            txnData.forEach(ele => {
                console.log('ele', ele)
                let card = <Txncard
                    profilepic={
                        <figure className="image is-48x48">
                            <img className="is-rounded" src={ele.profilePhoto} />
                        </figure>
                    }
                    tokenname={ele.tokenName}
                    tokensymbol={ele.tokenSymbol}
                    amount={ele.amount.toString().slice(0,7)}
                    timestamp={ele.timestamp}
                    address="0x0000"
                    children={ele.sellerID.slice(0, 7) + '...'}
                />
                setTxnCards(prevState => [...prevState, card])
            })
        }
    }, [uiState.txnsParsed])

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
                <MytransactionsPlasmic
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

                    navbartwo={{
                        txntoggle: true,
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

                    txnslot={[...txnCards]}
                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <MytransactionsPlasmic
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

                    navbartwo={{
                        txntoggle: true,
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

                    txnslot={[...txnCards]}
                />
            </div>
        </div>
    )
}

export default MyTransactions;