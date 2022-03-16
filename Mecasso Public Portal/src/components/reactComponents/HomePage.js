import React, { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Web3 from 'web3'
import { useApiContract, useWeb3ExecuteFunction } from 'react-moralis';

import daoContractAbi from '../ABI/SocTokDAOABI'

import config from '../../config'
import defaultProfilePic from '../../images/male_user.svg'

import HomePagePlasmic from '../plasmicComponents/HomePage.jsx'
import LbIndividualCard from '../plasmicComponents/LbIndividualCard.jsx'
import Creatorslidercard from '../plasmicComponents/Creatorslidercard.jsx'
import { PlasmicSendtokencomponent__VariantProps } from '../plasmicComponents/plasmicComponents/plasmicOriginalImports/renai/PlasmicSendtokencomponent';

function HomePage(props) {

    const navigate = useNavigate()
    let globalCounter = 0

    const [contractOptions, setContractOptions] = useState({})
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

    // const onChangeHandlerPhoto = (event) => {
    //     console.log(event.target.files[0])
    //     const reader = new FileReader();
    //     let base64data = null
    //     reader.onloadend = () => {
    //         // use a regex to remove data url part
    //         const base64String = reader.result
    //             .replace("data:", "")
    //             .replace(/^.+,/, "");

    //         // log to console
    //         // logs wL2dvYWwgbW9yZ...
    //         console.log('base64', base64String);
    //         // base64data = base64String
    //         axios.post(config.backendServer + '/uploadProfilePhoto', { image: base64String, userID: props.user.get('email') }).then(function (response, error) {
    //             if (response) {
    //                 console.log(response)
    //             } else {
    //                 console.log(error)
    //             }
    //         })
    //     };
    //     reader.readAsDataURL(event.target.files[0]);
    //     console.log('base64data', base64data)
    // }

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <HomePagePlasmic
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
                    

                    uploadbuttonslot={
                        <>
                            <div class="file is-medium">
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

                    creatorsportalbutton={{
                        children: "Launch Your Own Token",
                        onClick: () => {
                            window.open('https://creators.mecasso.live', '_blank')
                        }
                    }}


                    topNavBar={{

                        navbarprofilepic: <figure className="image is-48x48">
                            <img className="is-rounded" src={props.mainState.userprofilepicture} />
                        </figure>,

                        loggedin: props.mainState.userLoggedIn,

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

                        signupbutton: {
                            children: "Signup/In",
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
                            props.logout()
                            navigate('/')
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
                                    props.catFilter('contenttype', 'Art', 10)
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
                                    props.catFilter('contenttype', 'Music', 10)
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
                                    props.catFilter('contenttype', 'Dance', 10)
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
                                    props.catFilter('contenttype', 'Sports', 10)
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
                                    props.catFilter('contenttype', 'Gaming', 10)
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
                                    props.catFilter('contenttype', 'skits', 10)
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
                                    props.catFilter('contenttype', 'Cooking', 10)
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

                    // leaderboardstack={[...tempLbElements]}
                    // contentcreatorslot={[...sliderElements]}
                    leaderboardstack={[...props.dataFromBackend.leaderboarddata]}
                    contentcreatorslot={[...props.dataFromBackend.sliderdata]}
                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <HomePagePlasmic
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

                    creatorsportalbutton={{
                        children: "Launch Your Own Token",
                        onClick: () => {
                            window.open('https://creators.mecasso.live', '_blank')
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
                            props.logout()
                            navigate('/')
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
                                    props.catFilter('contenttype', 'Art', 10)
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
                                    props.catFilter('contenttype', 'Music', 10)
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
                                    props.catFilter('contenttype', 'Dance', 10)
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
                                    props.catFilter('contenttype', 'Sports', 10)
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
                                    props.catFilter('contenttype', 'Gaming', 10)
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
                                    props.catFilter('contenttype', 'skits', 10)
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
                                    props.catFilter('contenttype', 'Cooking', 10)
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

                    // leaderboardstack={[...tempLbElements]}
                    // contentcreatorslot={[...sliderElements]}
                    leaderboardstack={[...props.dataFromBackend.leaderboarddata]}
                    contentcreatorslot={[...props.dataFromBackend.sliderdata]}
                />
            </div>
        </div>
    );
}

export default HomePage;