import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import Proposalheadingcard from '../plasmicComponents/Proposalheadingcard'
import ProposalsListPlasmic from '../plasmicComponents/ProposalsList'
import Votebutton from '../plasmicComponents/Votebutton';

import defaultProfilePic from '../../images/male_user.svg'

function ProposalsList(props) {

    const navigate = useNavigate()
    const [uiState, setUiState] = useState({})
    const [proposalCards, setProposalCards] = useState([])

    const timeConv = (timestamp) => {
        let time = new Date(timestamp * 1000);
        let formattedTime = time.toString().slice(4, 21)
        return formattedTime;
    }

    const getProposalfromID = (e) => {
        let id = e.currentTarget.value
        console.log('idd', id)
        props.setMainState(prevState => {
            return {
                ...prevState,
                detailedProposal: id
            }
        })
        console.log('e c target val', e.currentTarget.value)
        navigate('/viewproposal')
    }

    useEffect(() => {
        console.log('proposalData', props.proposalData)
        console.log('pro ret', props.mainState.proposalsListed)
        let sortedArray = props.proposalData.sort((a, b) => b.proposalid - a.proposalid)
        console.log('sorted arr', sortedArray)
        if (props.mainState.proposalsRetrieved) {
            if (props.proposalData.length === 0) {
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
            } else {
                setProposalCards([])
                console.log('creating cards...')
                let counter = 0
                //if (props.proposalData.length !== 0 && props.proposalData.length !== undefined) {
                if (sortedArray.length !== 0 && sortedArray.length !== undefined) {
                    setProposalCards([])
                    sortedArray.forEach(ele => {
                        console.log('creating card...')
                        counter++
                        let tempStatus = null
                        if (ele.open) {
                            tempStatus = "OPEN"
                        } else {
                            tempStatus = "CLOSED"
                        }
                        console.log('counter', counter)
                        console.log('deadline', ele.votingDeadline)
                        let votebutton = <Votebutton
                            value={ele.proposalid}
                            onClick={getProposalfromID}

                        // console.log('det proposal set to ', counter)
                        // props.setMainState(prevState => {
                        //     return {
                        //         ...prevState,
                        //         detailedProposal: counter
                        //     }
                        // })
                        // //navigate('/viewproposal')

                        />
                        let card = <Proposalheadingcard
                            proposalid={ele.proposalid}
                            header={ele.proptext[0]}
                            status={tempStatus}
                            deadline={timeConv(ele.votingDeadline)}
                            votebuttonslot={
                                // <button className="button is-small is-link is-responsive" onClick={getProposalfromID} value={counter}>
                                //     <b>VOTE</b>
                                // </button>
                                votebutton
                            }
                        />
                        setProposalCards(prevState => [...prevState, card])
                        console.log('counter and length', counter, props.proposalData.length)
                        if (counter === props.proposalData.length) {
                            props.setMainState(prevState => {
                                return {
                                    ...prevState,
                                    proposalsListed: true
                                }
                            })
                        }
                    })
                } else {
                    console.log('Cards Created Already')
                }
            }
            //}
        }
    }, [props.proposalData])

    useEffect(() => {
        console.log('proposalcards', proposalCards)
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
                <ProposalsListPlasmic
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

                    votebutton={{
                        onClick: () => { navigate('/viewproposal') }
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

                    slot={[...proposalCards]}
                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <ProposalsListPlasmic
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

                    votebutton={{
                        onClick: () => { navigate('/viewproposal') }
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

                    slot={[...proposalCards]}
                />
            </div>
        </div>
    );
}

export default ProposalsList;