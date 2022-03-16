import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useApiContract, useWeb3ExecuteFunction } from 'react-moralis';
import Web3 from 'web3'

import daoContractAbi from '../ABI/SocTokDAOABI'

import config from '../../config'

import defaultProfilePic from '../../images/male_user.svg'

import SocialFeedPlasmic from '../plasmicComponents/SocialFeed'
import Socialfeedcard from '../plasmicComponents/Socialfeedcard';

function SocialFeed(props) {

    const navigate = useNavigate()

    let globalCounter = 0

    const [contractOptions, setContractOptions] = useState({})
    const [dataFromContract, setDataFromContract] = useState([])
    const [socialFeed, setSocialFeed] = useState([])
    const [creatorsName, setCreatorsName] = useState({})
    const [uiState, setUiState] = useState({})
    const [postlike, setpostlike] = useState({})

    const {
        runContractFunction,
        data,
        error,
        isLoading,
        isFetching,
    } = useApiContract(contractOptions)


    const getCreatorName = (sym) => {
        if (props.lbData !== undefined) {
            let tempObj = props.lbData.find(obj => obj.tokensymbol === sym)
            let cName = tempObj.creatorname
            setCreatorsName(prevState => {
                return {
                    ...prevState,
                    [sym]: cName
                }
            })
            return cName
        } else {

        }
    }

    useEffect(() => {
        console.log('new datta', data)
        if (data !== null) {
            setDataFromContract(prevState => [...prevState, data])
        }
    }, [data])

    useEffect(() => {
        console.log('new error', error)
    }, [error])

    const timeConv = (timestamp) => {
        //let time = new Date(timestamp.t*1000);
        let time = new Date(timestamp);
        //console.log(time, "time");
        let formattedTime = time.toString().slice(4, 21)
        return formattedTime;
    }

    useEffect(() => {
        console.log('contractparams', props.contractParams)
        if (props.contractParams.length !== 0) {
            if (props.uiState.contractCall) {
                globalCounter++
                let tempArray = props.contractParams
                console.log('setting contract options..', props.contractParams[props.contractParams.length - 1])
                console.log('gC', globalCounter)
                setContractOptions(props.contractParams[props.contractParams.length - 1])
                tempArray.pop()
                props.setUiState(prevState => {
                    return {
                        ...prevState,
                        contractCall: false
                    }
                })
                props.setContractParams([...tempArray])
            }
        }
    }, [props.uiState])

    useEffect(() => {
        if (Object.keys(contractOptions) !== 0) {
            console.log('inside')
            console.log('finisheddd')
            runContractFunction({
                onComplete: () => {
                    props.setUiState(prevState => {
                        return {
                            ...prevState,
                            contractCall: true
                        }
                    })
                }
            })
        }
    }, [contractOptions])

    useEffect(() => {
        console.log('datafromcontractchanged', dataFromContract)
        if (dataFromContract.length === 3) {
            console.log(Web3.utils.fromWei(dataFromContract[1].toString()))
            props.setCreatorProfile(prevState => {
                return {
                    ...prevState,
                    maxcap: Web3.utils.fromWei(dataFromContract[1].toString()),
                    supply: Web3.utils.fromWei(dataFromContract[0].toString()),
                    creatorbal: Web3.utils.fromWei(dataFromContract[2].toString())
                }
            })
            navigate('/creatorprofile')
        }
    }, [dataFromContract])

    // const addCharm = (dao, tokenName, publisheddatetime, postId, type) => {
    //     if (props.mainState.charmBalance - 1 > 0) {
    //         let charmBalance = props.mainState.charmBalance - 1
    //         props.setMainState(prevState => {
    //             return {
    //                 ...prevState,
    //                 charmBalance: charmBalance
    //             }
    //         })

    //         let charm
    //         // if (type == 1) {
    //         //     charm = app.state.postsArray[postId]['charm'] + 1
    //         //     app.state.postsArray[postId]['charm'] = charm
    //         // } else {
    //         //     charm = app.state.allpostsArray[postId]['charm'] + 1
    //         //     app.state.allpostsArray[postId]['charm'] = charm
    //         // }

    //         if (type == 1) {
    //             setpostlike(prevState => {
    //                 return {
    //                     ...prevState,
    //                     [postId]: prevState[postId] + 1
    //                 }
    //             })
    //         }

    //         axios.post(config.backendServer + '/mintCharm', { receiver: dao }).then(function (response, error) {
    //             if (response) {
    //                 console.log(response)
    //                 let params = {
    //                     contract: dao,
    //                     tokenName: tokenName,
    //                     publisheddatetime: publisheddatetime,
    //                     transactionDate: Math.floor(Date.now() / 1000)
    //                 }
    //                 axios.post(config.backendServer + '/addCharmTransaction', params).then(function (response, error) {
    //                     if (response) {
    //                         console.log(response)
    //                         console.log('Charm Added')
    //                     } else {
    //                         console.log(error)
    //                     }
    //                 })
    //             } else {
    //                 console.log(error)
    //                 let charmBalance = props.mainState.charmBalance + 1
    //                 props.setMainState(prevState => {
    //                     return {
    //                         ...prevState,
    //                         charmBalance: charmBalance
    //                     }
    //                 })
    //                 if (type == 1) {
    //                     setpostlike(prevState => {
    //                         return {
    //                             ...prevState,
    //                             [postId]: prevState[postId] + 1
    //                         }
    //                     })
    //                 }
    //             }
    //         })
    //     } else {
    //         console.log('Insufficient charm balance')
    //     }
    // }

    useEffect(() => {
        if (!props.dataFromBackend.status.socialfeeddata) {
            let tempObj = {}
            axios.get(config.backendServer + "/creators").then(function (response, error) {
                if (response) {
                    //console.log(response.data["Creators By Alphabetical order"])
                    let creatorData = response.data["Creators By Alphabetical order"]
                    let counter = 0
                    console.log('CN', creatorData)
                    console.log('CNA', creatorsName)
                    creatorData.forEach(ele => {
                        counter++
                        let cName = ele.name
                        let tSym = ele["DAOs"][0]["tokenSymbol"]
                        //console.log(cName, tSym)
                        tempObj[tSym] = cName
                        //console.log('tO', tempObj)
                        //setCreatorsName(tempObj)
                    })
                    axios.post(config.backendServer + '/viewAllPosts').then(function (response, error) {
                        if (response) {
                            //console.log(response.data)
                            console.log('CNA2', creatorsName)
                            response.data.Posts.forEach(ele => {
                                console.log('ele', ele)
                                let tokSym = ele.tokenSymbol
                                let creatorName = tempObj[tokSym]
                                console.log(creatorName)
                                // if (creatorsName[tokSym] !== undefined) {
                                //     creatorName = creatorName[tokSym]
                                // } else {
                                //     creatorName = getCreatorName(tokSym)
                                // }
                                let postid = ele._id
                                setpostlike(prevState => {
                                    return {
                                        ...prevState,
                                        [postid]: ele.charm
                                    }
                                })
                                console.log('postlikepostid', postlike, ele.charm)
                                let post = <>
                                    <Socialfeedcard
                                        // liked={}
                                        mainState={props.mainState}
                                        postlike={postlike}
                                        profilebutton={{
                                            onClick: async () => {
                                                console.log('Clicked')
                                                console.log('crs data', creatorData)
                                                let obj = await creatorData.find(o => o.name === creatorName)
                                                console.log('obj found', obj)
                                                props.getCreatorProfile(obj.name, obj["DAOs"][0]["tokenSymbol"], obj["DAOs"][0]["tokenName"], obj.contentType, obj["DAOs"][0]["contractAddress"], obj.profilePhoto)
                                            }
                                        }}
                                        postpicture={
                                            <img src={ele.image} style={{ width: '100%' }, { height: '100%' }} />
                                        }
                                        creatorprofilepic={
                                            <div className="has-rounded-corner">
                                                <img src={ele.profilePhoto} />
                                            </div>
                                        }
                                        creatorname={creatorName}
                                        likescount="99"
                                        // charmbutton={{
                                        //     onClick: () => {
                                        //         console.log('liked post')
                                        //         setpostlike(prevState => {
                                        //             return {
                                        //                 ...prevState,
                                        //                 [postid]: prevState[postid] + 1
                                        //             }
                                        //         })
                                        //         //addCharm(ele.DAOcontract, ele.tokenName, ele.publisheddatetime, ele._id, 1)
                                        //     }
                                        // }}
                                        //charmscount={ele.charm}

                                        posttitle={ele.heading}
                                        postdescription={ele.description}
                                        timestamp={ele.publisheddatetime}
                                        sharebutton={{
                                            onClick: () => { alert("DISPLAY SHARING OPTIONS HERE") }
                                        }}
                                        externallinkbutton={{
                                            onClick: () => {
                                                window.open(ele.medialink, '_blank')
                                            }
                                        }}
                                        dao={ele.DAOcontract}
                                        tokenname={ele.tokenName}
                                        postid={ele._id}
                                        charmscount={ele.charm}
                                    />
                                </>
                                console.log('postlike', postlike)
                                setSocialFeed(prevState => [...prevState, post])
                                props.setDataFromBackend(prevState => {
                                    return {
                                        ...prevState,
                                        socialfeeddata: [...prevState.socialfeeddata, post]
                                    }
                                })
                            })
                        } else {
                            console.log(error)
                        }
                    })
                    props.setDataFromBackend(prevState => {
                        return {
                            ...prevState,
                            status: {
                                ...prevState.status,
                                socialfeeddata: true
                            }
                        }
                    })
                } else {
                    console.log(error)
                }
            })
        }
    }, [])

    useEffect(() => {
        console.log('postlikeeffect', postlike)
    }, [postlike])

    useEffect(() => {
        if (props.auth.state === 'authenticated') {
            setUiState(prevState => {
                return {
                    ...prevState,
                    loggedin: true,
                    profileName: 'Hello, ' + props.user.get('firstname')
                }
            })
        } else {
            setUiState(prevState => {
                return {
                    ...prevState,
                    loggedin: false
                }
            })
        }
    }, [props.auth])

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <SocialFeedPlasmic
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

                    // socialfeedslot={socialFeed}
                    socialfeedslot={props.dataFromBackend.socialfeeddata}

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

                    navbartwo={{
                        feedtoggle: true,
                        lbbutton: { onClick: () => { navigate('/') } },
                        //feedbutton: {onClick: () => {navigate('/socialfeed')}},
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
                <SocialFeedPlasmic
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
                                    <span class="file-cta is-renai ">
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

                    // socialfeedslot={socialFeed}
                    socialfeedslot={props.dataFromBackend.socialfeeddata}

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

                    navbartwo={{
                        feedtoggle: true,
                        lbbutton: { onClick: () => { navigate('/') } },
                        //feedbutton: {onClick: () => {navigate('/socialfeed')}},
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

export default SocialFeed;