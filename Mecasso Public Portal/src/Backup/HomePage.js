import React, { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Web3 from 'web3'
import { useApiContract, useWeb3ExecuteFunction } from 'react-moralis';

import daoContractAbi from '../ABI/SocTokDAOABI'

import config from '../../config'

import HomePagePlasmic from '../plasmicComponents/HomePage.jsx'
import LbIndividualCard from '../plasmicComponents/LbIndividualCard.jsx'
import Creatorslidercard from '../plasmicComponents/Creatorslidercard.jsx'
import { PlasmicSendtokencomponent__VariantProps } from '../plasmicComponents/plasmicComponents/plasmicOriginalImports/renai/PlasmicSendtokencomponent';

function HomePage(props) {

    const navigate = useNavigate()
    let globalCounter = 0

    const [contractOptions, setContractOptions] = useState({})
    const [contractParams, setContractParams] = useState([])
    const [dataFromContract, setDataFromContract] = useState([])

    const [uiState, setUiState] = useState({
        backendProcessCompletion: false,
        profileoverlay: false,
        authoverlay: false,
        loggedin: false,
        notloggedin: false,
        emailnotverified: false,
        creatormode: false,
        duoCategoryButton: {
            categorywise: true,
            creatorwise: false
        },
        contentTypeButton: {
            topten: true,
            art: false,
            music: false,
            dance: false,
            sports: false,
            gaming: false,
            skits: false,
            cooking: false
        },
        creatortypebutton: {
            topten: true
        },
        contractCall: null
    })

    const {
        runContractFunction,
        data,
        error,
        isLoading,
        isFetching,
    } = useApiContract(contractOptions)

    useEffect(() => {
        console.log('contractparams', contractParams)
        if (contractParams.length !== 0) {
            if (uiState.contractCall) {
                globalCounter++
                let tempArray = contractParams
                console.log('setting contract options..', contractParams[contractParams.length - 1])
                console.log('gC', globalCounter)
                setContractOptions(contractParams[contractParams.length - 1])
                tempArray.pop()
                setUiState(prevState => {
                    return {
                        ...prevState,
                        contractCall: false
                    }
                })
                setContractParams([...tempArray])
            }
        }
    }, [uiState])

    useEffect(() => {
        if (Object.keys(contractOptions) !== 0) {
            console.log('inside')
            console.log('finisheddd')
            runContractFunction({
                onComplete: () => {
                    setUiState(prevState => {
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
        console.log('new datta', data)
        if (data !== null) {
            setDataFromContract(prevState => [...prevState, data])
        }
    }, [data])

    useEffect(() => {
        console.log('new error', error)
    }, [error])

    const { auth, user, logout } = useMoralis();



    const [lbData, setLbData] = useState([])
    const [lbElements, setLbElements] = useState([])
    const [tempLbElements, setTempLbElements] = useState([])
    const [sliderElements, setSliderElements] = useState([])
    const [podiumImages, setPodiumImages] = useState(['#', '#', '#'])

    useEffect(() => {
        if (props.user !== null) {
            let profilename = 'Hello, ' + props.user.get('firstname')
            let userprofile = props.user.get('profile').profile
            setUiState(prevState => {
                return {
                    ...prevState,
                    profileName: [profilename],
                    userProfile: [userprofile]
                }
            })
        }
    }, props.user)

    useEffect(() => {
        console.log('APJS', auth.state)
        if (auth.state === 'authenticated') {
            setUiState(prevState => {
                return {
                    ...prevState,
                    profileoverlay: false,
                    authoverlay: false,
                    loggedin: true,
                    notloggedin: false
                }
            })
            console.log('uistate', uiState)
        } else {
            props.setMainState(prevState => {
                return {
                    ...prevState,
                    userLoggedIn: false
                }
            })
            setUiState(prevState => {
                return {
                    ...prevState,
                    emailverified: false,
                    authoverlay: false,
                    profileoverlay: false,
                    loggedin: false,
                    notloggedin: true
                }
            })
            console.log('exedc', uiState.notloggedin)
        }
    }, [props.auth])

    useEffect(() => {
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

    const getCreatorProfile = (cname, tsym, tname, cat, addr, ppic) => {
        console.log('GCP called in home page')
        console.log('params', cname, tsym, tname, cat, addr, ppic)
        let contractAbi = JSON.parse(daoContractAbi)
        axios.post(config.backendServer + '/queryDAO', { contractAddress: addr }).then(function (response, error) {
            if (response) {
                console.log(response.data.queryresult[0])
                let dataFromBackend = response.data.queryresult[0]
                console.log(dataFromBackend.creator)
                let parametersOne = {
                    chain: "mumbai",
                    address: "0xE5D31997Cc545a33847Dac2C32CB70B9e51cc6CC",
                    functionName: "balanceOf",
                    abi: contractAbi,
                    params: { _owner: dataFromBackend.creator }
                }
                let parametersTwo = {
                    chain: "mumbai",
                    address: "0xE5D31997Cc545a33847Dac2C32CB70B9e51cc6CC",
                    functionName: "cap",
                    abi: contractAbi,
                    //params: { _owner: dataFromBackend.creator }
                }
                let parametersThree = {
                    chain: "mumbai",
                    address: "0xE5D31997Cc545a33847Dac2C32CB70B9e51cc6CC",
                    functionName: "totalSupply",
                    abi: JSON.parse(daoContractAbi)
                }
                setContractParams([parametersOne, parametersTwo, parametersThree])
                setUiState(prevState => {
                    return {
                        ...prevState,
                        contractCall: true
                    }
                })
                props.setCreatorProfile({
                    profilepic: <figure class="image is-48x48">
                        <img className="is-rounded" src={ppic} />
                    </figure>,
                    creatorname: cname,
                    tokensymbol: tsym,
                    tokenname: tname,
                    category: cat,
                    tokenprice: dataFromBackend.currentPrice,
                    description: dataFromBackend.description,
                    creatoraddr: dataFromBackend.creator,
                    daoaddr: dataFromBackend._id,
                    subs: dataFromBackend.socialMedia.Youtube.subscribers,
                    media: dataFromBackend.socialMedia.Youtube.media,
                    views: dataFromBackend.socialMedia.Youtube.views
                })
            } else {
                console.log(error)
            }
        })
    }

    useEffect(() => {
        if (!props.dataFromBackend.status.leaderboarddata) {
            axios.get(config.backendServer + "/creators").then(function (response, error) {
                if (response) {
                    console.log(response.data["Creators By Alphabetical order"])
                    let creatorData = response.data["Creators By Alphabetical order"]
                    let counter = 0
                    //setCreatorData(creatorData)
                    let rawDataArray = []
                    creatorData.forEach(ele => {
                        counter++
                        // if(counter < 4 ) {
                        //     podiumImages.push(ele.profilePhoto)
                        //     setUiState(prevState => {
                        //         return {
                        //             ...prevState,
                        //             podiumImageArray: podiumImages
                        //         }
                        //     })
                        // }
                        let cName = ''
                        let tSym = ''
                        if (ele.name.length > 13) {
                            cName = ele.name.slice(0, 10) + '...'
                        } else {
                            cName = ele.name
                        }
                        if (ele["DAOs"][0]["tokenName"].length > 5) {
                            tSym = ele["DAOs"][0]["tokenSymbol"].slice(0, 3) + '..'
                        } else {
                            tSym = ele["DAOs"][0]["tokenSymbol"]
                        }
                        let rawData = {
                            creatorName: ele.name,
                            profilePhoto: ele.profilePhoto,
                            contenttype: ele.contentType,
                            creatortype: ele.creatorType,
                            tokenName: ele["DAOs"][0]["tokenName"],
                            tokenSymbol: ele["DAOs"][0]["tokenSymbol"],
                            daoaddress: ele["DAOs"][0]["contractAddress"],
                            contentType: ele.contentType,
                            creatorType: ele.creatorType,
                        }
                        let card = <Creatorslidercard
                            image={
                                <figure className="image">
                                    <img className="is-rounded" src={ele.profilePhoto} />
                                </figure>
                            }
                            creatorname={cName}
                            tokensymbol={tSym}
                            tokenprice="2.00"
                            category={ele.contentType}
                            creatortype={ele.creatorType}
                            onClick={() => {
                                //getCap()
                                getCreatorProfile(cName, tSym, ele["DAOs"][0]["tokenName"], ele.contentType, ele["DAOs"][0]["contractAddress"], ele.profilePhoto)
                            }}
                            //value={ele["DAOs"][0]["tokenSymbol"]}
                            value={rawData}
                        />
                        //rawDataArray.push(rawData)
                        props.setCreatorsData(prevState => [...prevState, rawData])
                        props.setDataFromBackend(prevState => {
                            return {
                                ...prevState,
                                sliderdata: [...prevState.sliderdata, card]
                            }
                        })
                        setSliderElements(prevState => [...prevState, card])
                    })
                    axios.post(config.backendServer + '/leaderboard').then(function (response, error) {
                        if (response) {
                            let lbData = response.data['leaderboard']
                            let mapArray = {}
                            let currentTradeVolume = 0
                            let counter = 0
                            let counterb = 0
                            let tempArray = []
                            let rawLbData = []
                            lbData.forEach(ele => {
                                counterb++
                                let tokName = ele["_id"]["tokenName"]
                                let cObj = creatorData.find(obj => { return obj["DAOs"][0]["tokenName"] === tokName })
                                let cName = cObj.name
                                let cContentType = cObj.contentType
                                let cCreatorType = cObj.creatorType
                                let cProfilePic = cObj.profilePhoto
                                if (ele["_id"]["baseAsset"] === "WETH") {
                                    currentTradeVolume = parseInt(ele["sales"]) * 1
                                } else if (ele["_id"]["baseAsset"] === "WDAI") {
                                    currentTradeVolume = parseInt(ele["sales"]) * 1
                                } else if (ele["_id"]["baseAsset"] === "MATIC") {
                                    currentTradeVolume = parseInt(ele["sales"])
                                }
                                // console.log('tokname', tokName)
                                // console.log('maparray tokname', mapArray[tokName])
                                // console.log('tradevolume', currentTradeVolume)
                                if (mapArray[tokName] === undefined) {
                                    //console.log('new')
                                    mapArray[tokName] = {
                                        "index": counter,
                                        "tradeVolume": currentTradeVolume
                                    }
                                    counter++
                                    //console.log(mapArray)
                                    // console.log('ele', ele)
                                    // console.log('sym', ele["DAOdetails"][0])
                                    let creatorObj = {
                                        profilepic: cProfilePic,
                                        creatorname: cName,
                                        tokensymbol: ele["DAOdetails"][0]['tokenSymbol'],
                                        tradevolume: currentTradeVolume,
                                        contenttype: cContentType,
                                        creatortype: cCreatorType
                                    }
                                    let card = <LbIndividualCard
                                        profilepic={
                                            <figure className="image">
                                                <img className="is-rounded" src={cProfilePic} />
                                            </figure>
                                        }
                                        creatorname={cName}
                                        tokensymbol={ele["DAOdetails"][0]['tokenSymbol']}
                                        tradevolume={currentTradeVolume}
                                    />
                                    rawLbData.push(creatorObj)
                                    tempArray.push(card)
                                    //setLbElements(prevState => [...prevState, card])
                                    setLbElements([...tempArray])
                                    setLbData([...rawLbData])
                                    //console.log('lbElements', lbElements)
                                } else {
                                    // console.log('old')
                                    // console.log(mapArray)
                                    let arrIndex = mapArray[tokName]["index"]
                                    let creatorObj = {
                                        profilepic: cProfilePic,
                                        creatorname: cName,
                                        tokensymbol: ele["DAOdetails"][0]['tokenSymbol'],
                                        tradevolume: currentTradeVolume + mapArray[tokName]["tradeVolume"],
                                        contenttype: cContentType,
                                        creatortype: cCreatorType
                                    }
                                    let card = <LbIndividualCard
                                        profilepic={
                                            <figure className="image">
                                                <img className="is-rounded" src={cProfilePic} />
                                            </figure>
                                        }
                                        creatorname={cName}
                                        tokensymbol={ele["DAOdetails"][0]["tokenSymbol"]}
                                        tradevolume={currentTradeVolume + mapArray[tokName]["tradeVolume"]}
                                    />
                                    rawLbData[arrIndex] = creatorObj
                                    tempArray[arrIndex] = card
                                    // console.log('tpa',tempArray)
                                    // console.log('idx', arrIndex)
                                    //setLbElements(prevState => [...prevState, prevState[arrIndex] = card])
                                    setLbElements([...tempArray])
                                    setLbData([...rawLbData])
                                    //console.log('lbElements', lbElements)
                                }
                                if (counterb === lbData.length) {
                                    setUiState(prevState => {
                                        return {
                                            ...prevState,
                                            backendProcessCompletion: true
                                        }
                                    })
                                }
                            })
                        }
                    })
                    props.setDataFromBackend(prevState => {
                        return {
                            ...prevState,
                            status: {
                                ...prevState.status,
                                leaderboarddata: true
                            }
                        }
                    })
                }
            })
        }
    }, [])

    useEffect(() => {
        if (uiState.backendProcessCompletion) {
            catFilter('', '', 10)
            props.setCreatorsDatabase([...lbData])
            props.setCreatorCards([...sliderElements])
            setPodiumImages([lbData[0].profilepic, lbData[1].profilepic, lbData[2].profilepic])
            props.setDataFromBackend(prevState => {
                return {
                    ...prevState,
                    podiumdata: [lbData[0].profilepic, lbData[1].profilepic, lbData[2].profilepic]
                }
            })
            props.setMainState(prevState => {
                return {
                    ...prevState,
                    lbData: lbData
                }
            })
        }
    }, [uiState.backendProcessCompletion])

    const catFilter = (primaryFilter, secondaryFilter, limit) => {
        //console.log('lb', lbData)
        setTempLbElements([])
        let selectedElements = []
        let counter = 0
        lbData.forEach(ele => {
            if (counter === limit) {
                setTempLbElements([...selectedElements])
                return
            } else {
                if (primaryFilter === '' && secondaryFilter === '') {
                    let card = <LbIndividualCard
                        profilepic={
                            <figure className="image">
                                <img className="is-rounded" src={ele.profilepic} />
                            </figure>
                        }
                        creatorname={ele.creatorname}
                        tokensymbol={ele.tokensymbol}
                        tradevolume={ele.tradevolume}
                    />
                    selectedElements.push(card)
                    props.setDataFromBackend(prevState => {
                        return {
                            ...prevState,
                            leaderboarddata: [...selectedElements]
                        }
                    })
                    setTempLbElements([...selectedElements])
                    counter++
                } else {
                    if (ele[primaryFilter] === secondaryFilter) {
                        let card = <LbIndividualCard
                            profilepic={
                                <figure className="image">
                                    <img className="is-rounded" src={ele.profilepic} />
                                </figure>
                            }
                            creatorname={ele.creatorname}
                            tokensymbol={ele.tokensymbol}
                            tradevolume={ele.tradevolume}
                        />
                        selectedElements.push(card)
                        props.setDataFromBackend(prevState => {
                            return {
                                ...prevState,
                                leaderboarddata: [...selectedElements]
                            }
                        })
                        setTempLbElements([...selectedElements])
                        counter++
                    }
                }
            }
        })
    }

    useEffect(() => {
        let sortedArray = lbData.sort((a, b) => b.tradevolume - a.tradevolume)
        setLbData(sortedArray)
    }, [lbData])

    return (
        <>
            <HomePagePlasmic
                profileoverlay={uiState.profileoverlay}
                authoverlay={uiState.authoverlay}
                loggedin={uiState.loggedin}
                notloggedin={uiState.notloggedin}

                // profileoverlay={false}
                // authoverlay={false}
                // loggedin={false}
                // notloggedin={false}

                overlaycreatorname={uiState.profileName}
                overlaycategory={uiState.userProfile}
                overlaycreatortype=''



                navbartwo={{
                    lbtoggle: true,
                    //lbbutton: {onClick: () => {navigate('/')}},
                    feedbutton: {
                        onClick: () => {
                            navigate('/socialfeed')
                        }
                    },
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

                imageone={
                    <figure className="image is-96x96">
                        {/* <img className="is-rounded" src={podiumImages[0]} /> */}
                        <img className="is-rounded" src={props.dataFromBackend.podiumdata[0]} />
                    </figure>
                }

                imagetwo={
                    <figure className="image">
                        <img className="is-rounded" src={props.dataFromBackend.podiumdata[1]} />
                    </figure>
                }

                imagethree={
                    <figure className="image">
                        <img className="is-rounded" src={props.dataFromBackend.podiumdata[2]} />
                    </figure>
                }


                topNavBar={{

                    loggedin: props.mainState.userLoggedIn,

                    signupbutton: {
                        children: "Signup/SignIn",
                        onClick: () => {
                            navigate('/signup')
                        }
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

                viewmorecreatorsbutton={{
                    onClick: () => {
                        navigate('/discovercreators')
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

                loginbutton={{
                    onClick: () => {
                        //window.open(config.domain + '/login', '_self')
                        navigate('/login')
                    }
                }}

                signupbutton={{
                    onClick: () => {
                        //window.open(config.domain + '/signup', '_self')
                        navigate('/signup')
                    }
                }}

                logoutbutton={{
                    onClick: () => {
                        logout()
                        navigate('/')
                    }
                }}

                updateprofilebutton={{
                    onClick: () => {
                        console.log('Update Profile Page')
                    }
                }}

                categorywisebutton={{
                    selected: uiState.duoCategoryButton.categorywise,
                    onClick: () => {
                        setUiState(prevState => {
                            return {
                                ...prevState,
                                creatormode: false,
                                duoCategoryButton: {
                                    categorywise: true,
                                    creatorwise: false
                                }
                            }
                        })
                    }
                }}

                creatorwisebutton={{
                    selected: uiState.duoCategoryButton.creatorwise,
                    onClick: () => {
                        setUiState(prevState => {
                            return {
                                ...prevState,
                                creatormode: true,
                                duoCategoryButton: {
                                    categorywise: false,
                                    creatorwise: true
                                }
                            }
                        })
                    }
                }}

                catscrollbar={{
                    creatormode: uiState.creatormode,
                    toptenbutton: {
                        buttoninnertext: "Top 10",
                        selected: uiState.contentTypeButton.topten,
                        onClick: () => {
                            if (!uiState.contentTypeButton.topten) {
                                catFilter('', '', 10)
                            }
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    contentTypeButton: {
                                        topten: true
                                    }
                                }
                            })
                        }
                    },
                    art: {
                        buttoninnertext: "Art",
                        selected: uiState.contentTypeButton.art,
                        onClick: () => {
                            if (!uiState.contentTypeButton.art) {
                                catFilter('contenttype', 'Art', 10)
                            }
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    contentTypeButton: {
                                        art: true
                                    }
                                }
                            })
                        }
                    },
                    music: {
                        buttoninnertext: "Music",
                        selected: uiState.contentTypeButton.music,
                        onClick: () => {
                            if (!uiState.contentTypeButton.music) {
                                catFilter('contenttype', 'Music', 10)
                            }
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    contentTypeButton: {
                                        music: true
                                    }
                                }
                            })
                        }
                    },
                    dance: {
                        buttoninnertext: "Dance",
                        selected: uiState.contentTypeButton.dance,
                        onClick: () => {
                            if (!uiState.contentTypeButton.dance) {
                                catFilter('contenttype', 'Dance', 10)
                            }
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    contentTypeButton: {
                                        dance: true
                                    }
                                }
                            })
                        }
                    },
                    sports: {
                        buttoninnertext: "Sports",
                        selected: uiState.contentTypeButton.sports,
                        onClick: () => {
                            if (!uiState.contentTypeButton.sports) {
                                catFilter('contenttype', 'Sports', 10)
                            }
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    contentTypeButton: {
                                        sports: true
                                    }
                                }
                            })
                        }
                    },
                    gaming: {
                        buttoninnertext: "Gaming",
                        selected: uiState.contentTypeButton.gaming,
                        onClick: () => {
                            if (!uiState.contentTypeButton.gaming) {
                                catFilter('contenttype', 'Gaming', 10)
                            }
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    contentTypeButton: {
                                        gaming: true
                                    }
                                }
                            })
                        }
                    },
                    skits: {
                        buttoninnertext: "Skits",
                        selected: uiState.contentTypeButton.skits,
                        onClick: () => {
                            if (!uiState.contentTypeButton.skits) {
                                catFilter('contenttype', 'skits', 10)
                            }
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    contentTypeButton: {
                                        skits: true
                                    }
                                }
                            })
                        }
                    },
                    cooking: {
                        buttoninnertext: "Cooking",
                        selected: uiState.contentTypeButton.cooking,
                        onClick: () => {
                            if (!uiState.contentTypeButton.cooking) {
                                catFilter('contenttype', 'Cooking', 10)
                            }
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    contentTypeButton: {
                                        cooking: true
                                    }
                                }
                            })
                        }
                    },

                    toptenbuttoncreator: {
                        buttoninnertext: "Top 10",
                        selected: uiState.creatortypebutton.topten,
                        onClick: () => {
                            if (!uiState.creatortypebutton.toptenbuttoncreator) {
                                catFilter('', '', 10)
                            }
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    creatortypebutton: {
                                        topten: true
                                    }
                                }
                            })
                        }
                    },

                    influencers: {
                        buttoninnertext: "Influencers",
                        selected: uiState.creatortypebutton.influencers,
                        onClick: () => {
                            if (!uiState.creatortypebutton.influencers) {
                                catFilter('creatortype', 'Influencer', 10)
                            }
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    creatortypebutton: {
                                        influencers: true
                                    }
                                }
                            })
                        }
                    },

                    blogger: {
                        buttoninnertext: "Blogger",
                        selected: uiState.creatortypebutton.blogger,
                        onClick: () => {
                            if (!uiState.creatortypebutton.blogger) {
                                catFilter('creatortype', 'Blogger', 10)
                            }
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    creatortypebutton: {
                                        blogger: true
                                    }
                                }
                            })
                        }
                    },

                    celebrity: {
                        buttoninnertext: "Celebrity",
                        selected: uiState.creatortypebutton.celebrity,
                        onClick: () => {
                            if (!uiState.creatortypebutton.celebrity) {
                                catFilter('creatortype', 'Celebrity', 10)
                            }
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    creatortypebutton: {
                                        celebrity: true
                                    }
                                }
                            })
                        }
                    },

                    youngstars: {
                        buttoninnertext: "Young Stars",
                        selected: uiState.creatortypebutton.youngstars,
                        onClick: () => {
                            if (!uiState.creatortypebutton.youngstars) {
                                catFilter('creatortype', 'Young Star', 10)
                            }
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    creatortypebutton: {
                                        youngstars: true
                                    }
                                }
                            })
                        }
                    },

                    comets: {
                        buttoninnertext: "Comets",
                        selected: uiState.creatortypebutton.comets,
                        onClick: () => {
                            if (!uiState.creatortypebutton.comets) {
                                catFilter('creatortype', 'Comet', 10)
                            }
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    creatortypebutton: {
                                        comets: true
                                    }
                                }
                            })
                        }
                    }
                }}

                // leaderboardstack={[...tempLbElements]}
                // contentcreatorslot={[...sliderElements]}
                leaderboardstack={[...props.dataFromBackend.leaderboarddata]}
                contentcreatorslot={[...props.dataFromBackend.sliderdata]}
            />
        </>
    );
}

export default HomePage;