import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Web3 from 'web3'
import axios from 'axios'
import { useApiContract, useWeb3ExecuteFunction } from 'react-moralis';

import daoContractAbi from '../ABI/SocTokDAOABI'
import config from '../../config'
import defaultProfilePic from '../../images/male_user.svg'

import DiscoverCreatorsPlasmic from '../plasmicComponents/DiscoverCreators'
import Discovercreatorduoslot from '../plasmicComponents/Discovercreatorduoslot';
import Creatorslidercard from '../plasmicComponents/Creatorslidercard';

function DiscoverCreators(props) {

    let globalCounter = 0
    const navigate = useNavigate()
    const [contractOptions, setContractOptions] = useState({})
    const [dataFromContract, setDataFromContract] = useState([])

    const {
        runContractFunction,
        data,
        error,
        isLoading,
        isFetching,
    } = useApiContract(contractOptions)

    const [discoverCards, setDiscoverCards] = useState([])

    const [uiState, setUiState] = useState({
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
        console.log('new datta', data)
        if (data !== null) {
            setDataFromContract(prevState => [...prevState, data])
        }
    }, [data])

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

    useEffect(() => {
        console.log('USEFF called...')
        let tempArray = []
        console.log('tmparr', tempArray)
        let counter = 0
        console.log('ccards', props.dataFromBackend.sliderdata)
        setDiscoverCards([])
        props.dataFromBackend.sliderdata.forEach(ele => {
            counter++
            tempArray.push(ele)
            console.log('pushing one card..')
            if (counter === 2) {
                console.log('pushing temparr', tempArray)
                let card = <Discovercreatorduoslot
                    slot={[...tempArray]}
                />
                setDiscoverCards(prevState => [...prevState, card])
                console.log('duo created..')
                tempArray = []
                counter = 0
            }
        })
    }, [props.dataFromBackend])

    const catFilter = (primaryFilter, secondaryFilter, limit) => {
        setDiscoverCards([])
        if (primaryFilter !== '' && secondaryFilter !== '') {
            console.log('Filter called...', primaryFilter, secondaryFilter, limit)
            let tempArray = []
            console.log('tmparr', tempArray)
            let counter = 0
            console.log('ccards', props.creatorCards)
            props.creatorCards.forEach(ele => {
                if (ele.props[primaryFilter] === secondaryFilter) {
                    counter++
                    tempArray.push(ele)
                    console.log('pushing one card..')
                    if (counter === 2) {
                        console.log('pushing temparr', tempArray)
                        let card = <Discovercreatorduoslot
                            slot={[...tempArray]}
                        />
                        setDiscoverCards(prevState => [...prevState, card])
                        console.log('duo created..')
                        tempArray = []
                        counter = 0
                    }
                }
            })
        } else {
            console.log('USEFF called...')
            let tempArray = []
            console.log('tmparr', tempArray)
            let counter = 0
            console.log('ccards', props.creatorCards)
            props.creatorCards.forEach(ele => {
                counter++
                tempArray.push(ele)
                console.log('pushing one card..')
                if (counter === 2) {
                    console.log('pushing temparr', tempArray)
                    let card = <Discovercreatorduoslot
                        slot={[...tempArray]}
                    />
                    setDiscoverCards(prevState => [...prevState, card])
                    console.log('duo created..')
                    tempArray = []
                    counter = 0
                }
            })
        }
    }

    useEffect(() => {
        if (props.auth.state === 'authenticated') {
            setUiState(prevState => {
                return {
                    ...prevState,
                    //profileName: 'Hello, ' + props.user.get('firstname')
                    loggedin: true,
                    notloggedin: false
                }
            })
        } else {
            setUiState(prevState => {
                return {
                    ...prevState,
                    //profileName: 'Hello, ' + props.user.get('firstname')
                    loggedin: false,
                    notloggedin: true
                }
            })
        }
    }, [props.auth])

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <DiscoverCreatorsPlasmic

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

                    previouspagebutton={{
                        children: "Go To Leaderboard",
                        onClick: () => { navigate('/') }
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

                    slot={[...discoverCards]}

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
                                    props.catFilter('', '', 10)
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
                                    props.catFilter('category', 'Art', 10)
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
                                    props.catFilter('category', 'Music', 10)
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
                                    props.catFilter('category', 'Dance', 10)
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
                                    props.catFilter('category', 'Sports', 10)
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
                                    props.catFilter('category', 'Gaming', 10)
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
                                    props.catFilter('category', 'skits', 10)
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
                                    props.catFilter('category', 'Cooking', 10)
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
                                    props.catFilter('', '', 10)
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
                                    props.catFilter('creatortype', 'Influencer', 10)
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
                                    props.catFilter('creatortype', 'Blogger', 10)
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
                                    props.catFilter('creatortype', 'Celebrity', 10)
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
                                    props.catFilter('creatortype', 'Young Star', 10)
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
                                    props.catFilter('creatortype', 'Comet', 10)
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

                    navbartwo={{
                        lbtoggle: true,
                        lbbutton: { onClick: () => { navigate('/') } },
                        feedbutton: {
                            onClick: () => {
                                if (props.user.get('basickyc')) {
                                    navigate('/socialfeed')
                                } else {
                                    navigate('/basickycalert')
                                }
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

                    duoslot={{
                        creatorfive: { onClick: () => { navigate('/creatorprofile') } },
                        creatorsix: { onClick: () => { navigate('/creatorprofile') } }
                    }}

                    duoslotone={{
                        creatorfive: { onClick: () => { navigate('/creatorprofile') } },
                        creatorsix: { onClick: () => { navigate('/creatorprofile') } }
                    }}

                    duoslottwo={{
                        creatorfive: { onClick: () => { navigate('/creatorprofile') } },
                        creatorsix: { onClick: () => { navigate('/creatorprofile') } }
                    }}

                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <DiscoverCreatorsPlasmic

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

                    previouspagebutton={{
                        children: "Go To Leaderboard",
                        onClick: () => { navigate('/') }
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

                    slot={[...discoverCards]}

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
                                    props.catFilter('', '', 10)
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
                                    props.catFilter('category', 'Art', 10)
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
                                    props.catFilter('category', 'Music', 10)
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
                                    props.catFilter('category', 'Dance', 10)
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
                                    props.catFilter('category', 'Sports', 10)
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
                                    props.catFilter('category', 'Gaming', 10)
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
                                    props.catFilter('category', 'skits', 10)
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
                                    props.catFilter('category', 'Cooking', 10)
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
                                    props.catFilter('', '', 10)
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
                                    props.catFilter('creatortype', 'Influencer', 10)
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
                                    props.catFilter('creatortype', 'Blogger', 10)
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
                                    props.catFilter('creatortype', 'Celebrity', 10)
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
                                    props.catFilter('creatortype', 'Young Star', 10)
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
                                    props.catFilter('creatortype', 'Comet', 10)
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

                    navbartwo={{
                        lbtoggle: true,
                        lbbutton: { onClick: () => { navigate('/') } },
                        feedbutton: {
                            onClick: () => {
                                if (props.user.get('basickyc')) {
                                    navigate('/socialfeed')
                                } else {
                                    navigate('/basickycalert')
                                }
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

                    duoslot={{
                        creatorfive: { onClick: () => { navigate('/creatorprofile') } },
                        creatorsix: { onClick: () => { navigate('/creatorprofile') } }
                    }}

                    duoslotone={{
                        creatorfive: { onClick: () => { navigate('/creatorprofile') } },
                        creatorsix: { onClick: () => { navigate('/creatorprofile') } }
                    }}

                    duoslottwo={{
                        creatorfive: { onClick: () => { navigate('/creatorprofile') } },
                        creatorsix: { onClick: () => { navigate('/creatorprofile') } }
                    }}

                />
            </div>
        </div>
    )
}

export default DiscoverCreators