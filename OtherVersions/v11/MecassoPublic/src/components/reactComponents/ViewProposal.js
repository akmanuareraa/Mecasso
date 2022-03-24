import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Web3 from 'web3'

import daoContractModAbi from '../ABI/SocTokDAOMod'
import daoContractAbi from '../ABI/SocTokDAOABI'

import defaultProfilePic from '../../images/male_user.svg'

import ViewProposalPlasmic from '../plasmicComponents/ViewProposal'

function ViewProposal(props) {

    const navigate = useNavigate()
    const [uiState, setUiState] = useState({
        proposalid: '',
        status: '',
        heading: '',
        description: '',
        yes: '',
        no: '',
        creator: '',
        deposit: '',
        amount: '',
        passed: '',
        prevote: '',
        deadline: ''
    })
    const [proposalDets, setProposalDets] = useState({
        proposalid: null,
        yesorno: null
    })

    const timeConv = (timestamp) => {
        let time = new Date(timestamp * 1000);
        let formattedTime = time.toString().slice(4, 21)
        console.log(formattedTime)
        return formattedTime;
    }

    async function castVote(proposalid, yesorno) {
        setProposalDets({
            proposalid: proposalid,
            yesorno: yesorno
        })
        if (!props.isWeb3Enabled) {
            if(window.screen.width <= 780){
                await props.enableWeb3({ provider: 'walletconnect', chainId: 137, signingMessage:"Welcome to Mecasso" })
            } else {
                await props.enableWeb3({ chainId: 137, signingMessage: "Welcome to Mecasso" })
            }
        } else {
            console.log('web3obj', props.web3)
            let contractAbi = JSON.parse(daoContractModAbi)
            let contractAddress = props.mainState.selectedDao
            console.log(contractAddress)
            let web3JS = new Web3(props.web3.provider)
            let daocontract = new web3JS.eth.Contract(contractAbi, contractAddress)
            console.log('CA', props.user.get('accounts')[0])
            daocontract.methods.vote(proposalDets.proposalid, proposalDets.yesorno).send({ from: props.user.get('accounts')[0] }).then(function (response, error) {
                if (response) {
                    console.log(response)
                    console.log('VOTED YEA')
                    setUiState(prevState => {
                        return {
                            ...prevState,
                            confirmation: false
                        }
                    })
		    alert("Successfully Voted")	
                } else {
                    console.log(error)
                }
            })
        }
        console.log('voting....')
    }

    useEffect(() => {
        if (props.web3 !== null) {
            if (proposalDets.proposalid !== null) {
                console.log('web3obj', props.web3)
                let contractAbi = JSON.parse(daoContractAbi)
                let contractAddress = props.mainState.selectedDao
                console.log(contractAddress)
                let web3JS = new Web3(props.web3.provider)
                let daocontract = new web3JS.eth.Contract(contractAbi, contractAddress)
                console.log('CA', props.user.get('accounts')[0])
                daocontract.methods.vote(proposalDets.proposalid, proposalDets.yesorno).send({ from: props.user.get('accounts')[0] }).then(function (response, error) {
                    if (response) {
                        console.log(response)
                        console.log('VOTED YEA')
                        setUiState(prevState => {
                            return {
                                ...prevState,
                                confirmation: false
                            }
                        })
                        alert("Successfully Voted")
                    } else {
                        console.log(error)
                    }
                })
                    .catch(function (e) {
                        console.log('error contract', e)
                    })
            }
        }
    }, [props.web3])

    useEffect(() => {
        if (props.mainState.detailedProposal !== 0 || props.mainState.detailedProposal !== undefined) {
            let sortedArray = props.proposalData.sort((a, b) => b.proposalid - a.proposalid)
            sortedArray = sortedArray.reverse()
            console.log('sortedarrayviewproposal', sortedArray)
            let proposal = sortedArray[props.mainState.detailedProposal - 1]
            let tempStatus = null
            if (proposal.open) {
                tempStatus = "OPEN"
            } else {
                tempStatus = "CLOSED"
            }
            let ppassed = null
            if (proposal.proposalPassed) {
                ppassed = 'YES'
            } else {
                ppassed = 'NO'
            }
            let pvote = null
            if (proposal.preSupport) {
                pvote = 'YES'
            } else {
                pvote = 'NO'
            }
	    let proposalDescription
            if(proposal.proptext[1].split(" ").length === 1){
                proposalDescription = <p style={{wordBreak: 'break-all'}}>
                    {proposal.proptext[1]}
                </p>
            } else {
                proposalDescription = <p>
                    {proposal.proptext[1]}
                </p>
            }
            setUiState(prevState => {
                return {
                    ...prevState,
                    proposalid: props.mainState.detailedProposal,
                    status: tempStatus,
                    heading: proposal.proptext[0],
                    //description: proposal.proptext[1],
		    description: proposalDescription,
                    yes: proposal.yea,
                    no: proposal.nay,
                    creator: proposal.creator,
                    deposit: proposal.proposalDeposit,
                    amount: proposal.amount,
                    passed: ppassed,
                    prevote: pvote,
                    deadline: timeConv(proposal.votingDeadline)
                }
            })
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
                <ViewProposalPlasmic
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

                    confirmation={uiState.confirmation}

                    proposalid={uiState.proposalid}
                    status={uiState.status}
                    heading={uiState.heading}
                    //description={uiState.description.slice(0,30)}
	            description={uiState.description}
                    yes={Web3.utils.fromWei(uiState.yes)}
                    no={Web3.utils.fromWei(uiState.no)}
                    creator={uiState.creator}
                    deposit={uiState.deposit}
                    amount={uiState.amount}
                    passed={uiState.passed}
                    prevote={uiState.prevote}
                    deadline={uiState.deadline}
                    votebutton={{
                        onClick: () => {
                            //castVote(uiState.proposalid)
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    confirmation: true
                                }
                            })
                        }
                    }}

                    yesvotebutton={{
                        onClick: () => {
                            castVote(uiState.proposalid, true)
                        }
                    }}

                    novotebutton={{
                        onClick: () => {
                            castVote(uiState.proposalid, false)
                        }
                    }}

                    cancelvotebutton={{
                        children: "Close",
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    confirmation: false
                                }
                            })
                        }
                    }}

                    previouspagebutton={{
                        onClick: () => { navigate('/proposallist') }
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
                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <ViewProposalPlasmic
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

                    confirmation={uiState.confirmation}

                    proposalid={uiState.proposalid}
                    status={uiState.status}
                    heading={uiState.heading}
                    //description={uiState.description.slice(0,30)}
	            description={uiState.description}
                    yes={Web3.utils.fromWei(uiState.yes)}
                    no={Web3.utils.fromWei(uiState.no)}
                    creator={uiState.creator}
                    deposit={uiState.deposit}
                    amount={uiState.amount}
                    passed={uiState.passed}
                    prevote={uiState.prevote}
                    deadline={uiState.deadline}
                    votebutton={{
                        onClick: () => {
                            //castVote(uiState.proposalid)
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    confirmation: true
                                }
                            })
                        }
                    }}

                    yesvotebutton={{
                        onClick: () => {
                            castVote(uiState.proposalid, true)
                        }
                    }}

                    novotebutton={{
                        onClick: () => {
                            castVote(uiState.proposalid, false)
                        }
                    }}

                    cancelvotebutton={{
                        children: "Close",
                        onClick: () => {
                            setUiState(prevState => {
                                return {
                                    ...prevState,
                                    confirmation: false
                                }
                            })
                        }
                    }}

                    previouspagebutton={{
                        onClick: () => { navigate('/proposallist') }
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
                />
            </div>
        </div>
    );
}

export default ViewProposal;
