import React, { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Web3 from 'web3'
import { useApiContract, useWeb3ExecuteFunction } from 'react-moralis';

import daoContractAbi from '../ABI/SocTokDAOABI'

import config from '../../config'
import defaultProfilePic from '../../images/male_user.svg'

import Homepage from './HomePage'
import HomePagePlasmic from '../plasmicComponents/HomePage.jsx'
import LbIndividualCard from '../plasmicComponents/LbIndividualCard.jsx'
import Creatorslidercard from '../plasmicComponents/Creatorslidercard.jsx'
import { PlasmicSendtokencomponent__VariantProps } from '../plasmicComponents/plasmicComponents/plasmicOriginalImports/renai/PlasmicSendtokencomponent';

function HomePageBase(props) {

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
            <br></br><br></br>
            {/* <div className="column has-text-centered is-6 bg-img public is-hidden-desktop-only"> */}
            <div className="column has-text-centered is-6 bg-img public is-hidden-mobile">
                <Homepage
                    user={props.user}
                    auth={props.auth}
                    mainState={props.mainState}
                    setMainState={props.setMainState}
                    setCreatorsDatabase={props.setCreatorsDatabase}
                    creatorsData={props.creatorsData}
                    setCreatorsData={props.setCreatorsData}
                    creatorCards={props.creatorCards}
                    setCreatorsData={props.setCreatorsData}
                    creatorCards={props.creatorCards}
                    setCreatorCards={props.setCreatorCards}
                    catFilter={props.catFilter}
                    web3={props.web3}
                    enableWeb3={props.enableWeb3}
                    isWeb3Enabled={props.isWeb3Enabled}
                    web3EnableError={props.web3EnableError}
                    setCreatorProfile={props.setCreatorProfile}
                    dataFromBackend={props.dataFromBackend}
                    setDataFromBackend={props.setDataFromBackend}
                    uiState={props.uiState}
                    setUiState={props.setUiState}
                    setContractParams={props.setContractParams}
                    contractParams={props.contractParams}
                    onChangeHandlerPhoto={props.onChangeHandlerPhoto}
                    logout={props.logout}
                />

            </div>
            <div className="is-hidden-desktop">
                <Homepage
                    user={props.user}
                    auth={props.auth}
                    mainState={props.mainState}
                    setMainState={props.setMainState}
                    setCreatorsDatabase={props.setCreatorsDatabase}
                    creatorsData={props.creatorsData}
                    setCreatorsData={props.setCreatorsData}
                    creatorCards={props.creatorCards}
                    setCreatorsData={props.setCreatorsData}
                    creatorCards={props.creatorCards}
                    setCreatorCards={props.setCreatorCards}
                    catFilter={props.catFilter}
                    web3={props.web3}
                    enableWeb3={props.enableWeb3}
                    isWeb3Enabled={props.isWeb3Enabled}
                    web3EnableError={props.web3EnableError}
                    setCreatorProfile={props.setCreatorProfile}
                    dataFromBackend={props.dataFromBackend}
                    setDataFromBackend={props.setDataFromBackend}
                    uiState={props.uiState}
                    setUiState={props.setUiState}
                    setContractParams={props.setContractParams}
                    contractParams={props.contractParams}
                    onChangeHandlerPhoto={props.onChangeHandlerPhoto}
                    logout={props.logout}
                />

            </div>
        </div>
    );
}

export default HomePageBase;