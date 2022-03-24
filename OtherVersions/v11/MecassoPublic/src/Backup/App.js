import React, { useState, useEffect } from "react";
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useMoralis, useApiContract } from 'react-moralis'
import Web3 from 'web3'
import axios from 'axios'

import config from './config'

import daoContractAbi from './components/ABI/SocTokDAOABI'

// importing React Components
import SignUp from './components/reactComponents/SignUp'
import HomePage from './components/reactComponents/HomePage'
import EmailSignUp from "./components/reactComponents/EmailSignUp";
import WebThreeAuth from './components/reactComponents/WebThreeAuth'
import Login from './components/reactComponents/Login'
import EmailLogin from './components/reactComponents/EmailLogin'
import Test from "./components/reactComponents/Test";
import FanInvestorPreference from "./components/reactComponents/FanInvestorPreference"
import UserProfilePreferences from "./components/reactComponents/UserProfilePreferences";
import EmailVerification from './components/reactComponents/EmailVerification'
import BasicKYC from './components/reactComponents/BasicKYC'
import EmailVerifyProcess from './components/reactComponents/EmailVerifyProcess'
import AdvancedKYC from './components/reactComponents/AdvancedKYC'
import EmailTokenVerification from "./components/reactComponents/EmailTokenVerification";
import ConnectWallet from './components/reactComponents/ConnectWallet'
import SocialFeed from './components/reactComponents/SocialFeed'
import MyPortfolio from './components/reactComponents/MyPortfolio'
import MyTransactions from "./components/reactComponents/MyTransactions";
import MyProposals from './components/reactComponents/MyProposals'
import ProposalsList from "./components/reactComponents/ProposalsList";
import ViewProposal from './components/reactComponents/ViewProposal'
import DiscoverCreators from './components/reactComponents/DiscoverCreators'
import CreatorProfile from "./components/reactComponents/CreatorProfile";
import BuyToken from './components/reactComponents/BuyToken'
import SendToken from './components/reactComponents/SendToken'
import AdvancedKYCAlert from "./components/reactComponents/AdvancedKYCAlert";
import BasicKYCAlert from "./components/reactComponents/BasicKYCAlert";

function App() {

  const navigate = useNavigate()

  let cOptions = {}

  const [dataFromBackend, setDataFromBackend] = useState({
    status: {
      leaderboarddata: false,
      socialfeeddata: false,
    },
    leaderboarddata: [],
    sliderdata: [],
    podiumdata: ['#','#','#'],
    socialfeeddata: []
  })
  const [userDAOs, setUserDAOs] = useState([])
  const [creatorsData, setCreatorsData] = useState([])
  const [creatorsDatabase, setCreatorsDatabase] = useState([])
  const [proposalData, setProposalData] = useState([])
  const [creatorCards, setCreatorCards] = useState([])
  const { auth, user, signup, login, hasAuthError, setUserData, logout, refetchUserData, userError, authenticate } = useMoralis()
  const { web3, enableWeb3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError } = useMoralis()
  const [contractOptions, setContractOptions] = useState({
    noProposals: null,
    proposalid: null
  })
  const [creatorProfile, setCreatorProfile] = useState({
    creatorbal: 0,
    supply: 0
  })

  const proposalFetcher = useApiContract({
    chain: "mumbai",
    address: "0xE5D31997Cc545a33847Dac2C32CB70B9e51cc6CC",
    functionName: "proposals",
    abi: JSON.parse(daoContractAbi),
    // params: {"": proposalid.proposalid}
    params: { "": cOptions }
  })

  const [mainState, setMainState] = useState(() => {
    return {
      userLoggedIn: false,
      emailverified: false,
      balanceRetrieved: false,
      tokenBalance: [],
      userobject: {
        firstname: '',
        lastname: '',
        contenttype: '',
        creatortype: '',
      },
      detailedProposal: null,
      proposalsRetrieved: false,
      proposalsListed: false,
      dataForCreatorProfile: [],
      sendtoken: {
        tokensymbol: 'NULL',
        tokenAddress: '0x000'
      }
    }
  })

  useEffect(() => {
    console.log('APP JS User Error', userError)
  }, [userError])

  useEffect(() => {
    console.log('creators Data updated', creatorsData)
    setMainState(prevState => {
      return {
        ...prevState,
        dataForCreatorProfile: [...creatorsData]
      }
    })
  }, [creatorsData])

  useEffect(() => {
    if (contractOptions.noProposals !== null) {
      console.log('called no proposals', contractOptions.noProposals)
      for (let i = 1; i <= contractOptions.noProposals; i++) {
        console.log('proposalid', i)
        cOptions = i
        console.log('coptions', cOptions, typeof (cOptions))
        proposalFetcher.runContractFunction({
          params: {
            chain: "mumbai",
            address: "0xE5D31997Cc545a33847Dac2C32CB70B9e51cc6CC",
            functionName: "proposals",
            abi: JSON.parse(daoContractAbi),
            // params: {"": proposalid.proposalid}
            params: { "": i }
          },
          onSuccess: (results) => {
            console.log('results', results)
            let tempObj = Object.assign({ selected: false }, results);
            tempObj["proposalid"] = i
            console.log('tempObj', tempObj)
            setProposalData(prevState => [...prevState, tempObj])
          },
          onError: (error) => {
            console.log('error', error)
          }
        })
      }
    }
  }, [contractOptions])

  // useEffect(() => {
  //   if (proposalid.proposalid !== null) {
  //     console.log('called p id', proposalid.proposalid)
  //     proposalFetcher.runContractFunction({
  //       onSuccess: (results) => {
  //         console.log('results', results)
  //         results["proposalid"] = proposalid.proposalid
  //         setProposalData(prevState => [...prevState, results])
  //       },
  //       onError: (error) => {
  //         console.log('error', error)
  //       }
  //     })
  //   }
  // }, [proposalid])

  const getProposalsData = (contractAddress, numberOfProposals) => {
    console.log('Func called with', contractAddress, numberOfProposals)
    setProposalData([])
    setContractOptions(prevState => {
      return {
        ...prevState,
        noProposals: numberOfProposals
      }
    })
    // let contractAbi = JSON.parse(daoContractAbi)
    // console.log(contractAddress)
    // let web3JS = new Web3(web3.provider)
    // let daocontract = new web3JS.eth.Contract(contractAbi, contractAddress)
    // console.log('CA', user.get('accounts')[0])
  }

  useEffect(() => {
    if (auth.state === 'authenticated') {
      setMainState(prevState => {
        return {
          ...prevState,
          userLoggedIn: true
        }
      })
      // if (user.get("emailverified") === 'yes') {
      //   setMainState(prevState => {
      //     return {
      //       ...prevState,
      //       emailverified: true
      //     }
      //   })
      // }
    } else {
      setMainState(prevState => {
        return {
          ...prevState,
          userLoggedIn: false
        }
      })
    }
  }, [auth])

  return (
    <>
      {/* include your navbar here */}
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<HomePage
          user={user}
          auth={auth}
          mainState={mainState}
          setMainState={setMainState}
          setCreatorsDatabase={setCreatorsDatabase}
          creatorsData={creatorsData}
          setCreatorsData={setCreatorsData}
          creatorCards={creatorCards}
          setCreatorsData={setCreatorsData}
          creatorCards={creatorCards}
          setCreatorCards={setCreatorCards}
          // getCreatorProfile={getCreatorProfile}
          // retrieveProfile={retrieveProfile}
          web3={web3}
          enableWeb3={enableWeb3}
          isWeb3Enabled={isWeb3Enabled}
          web3EnableError={web3EnableError}
          setCreatorProfile={setCreatorProfile}
          dataFromBackend={dataFromBackend}
          setDataFromBackend={setDataFromBackend}
        />} />
        <Route path="/signup" element={<SignUp
          auth={auth}
          signup={signup}
          setUserData={setUserData}
          refetchUserData={refetchUserData}
          user={user}
          hasAuthError={hasAuthError}
          mainState={mainState}
          setMainState={setMainState}
        />} />
        <Route path="/emailsignup" element={<EmailSignUp
          signup={signup}
          auth={auth}
          user={user}
          hasAuthError={hasAuthError}
          setUserData={setUserData}
          authenticate={authenticate}
          refetchUserData={refetchUserData}
          userError={userError}
          mainState={mainState}
          setMainState={setMainState}
        />} />
        <Route path="/web3auth" element={<WebThreeAuth
          user={user}
          auth={auth}
          setUserData={setUserData}
          mainState={mainState}
          setMainState={setMainState}
        />} />
        <Route path="/login" element={<Login
          auth={auth}
          user={user}
          logout={logout}
          login={login}
          mainState={mainState}
          setMainState={setMainState}
        />} />
        <Route path="/verifyemail/:token" element={<EmailTokenVerification
          auth={auth}
          user={user}
          logout={logout}
          refetchUserData={refetchUserData}
          setUserData={setUserData}
          mainState={mainState}
          setMainState={setMainState}
        />} />
        <Route path="/emaillogin" element={<EmailLogin
          auth={auth}
          user={user}
          logout={logout}
          login={login}
          refetchUserData={refetchUserData}
          mainState={mainState}
          setMainState={setMainState}
        />} />
        <Route path="/fipref" element={<FanInvestorPreference
          user={user}
          auth={auth}
          setUserData={setUserData}
          mainState={mainState}
          setMainState={setMainState}
        />} />
        <Route path="/userpref" element={<UserProfilePreferences
          auth={auth}
          user={user}
          logout={logout}
          setUserData={setUserData}
          mainState={mainState}
          setMainState={setMainState}
        />} />
        <Route path="/emailverification" element={<EmailVerification
          logout={logout}
          user={user}
          auth={auth}
          mainState={mainState}
        />} />
        <Route path="/basickyc" element={<BasicKYC
          auth={auth}
          user={user}
          logout={logout}
          hasAuthError={hasAuthError}
          setUserData={setUserData}
          mainState={mainState}
          setMainState={setMainState}
        />} />
        <Route path="/verifyemailtoken/:token" element={<EmailVerifyProcess
          user={user}
          auth={auth}
          mainState={mainState}
        />} />
        <Route path="/advancedkyc" element={<AdvancedKYC
          user={user}
          auth={auth}
          setUserData={setUserData}
          mainState={mainState}
        />} />
        <Route path="/connectwallet" element={<ConnectWallet
          authenticate={authenticate}
          hasAuthError={hasAuthError}
          auth={auth}
          user={user}
          web3={web3}
          enableWeb3={enableWeb3}
          setUserData={setUserData}
          web3EnableError={web3EnableError}
          isWeb3Enabled={isWeb3Enabled}
          mainState={mainState}
        />} />
        <Route path="/socialfeed" element={<SocialFeed
          user={user}
          auth={auth}
          creatorsDatabase={creatorsDatabase}
          mainState={mainState}
          setDataFromBackend={setDataFromBackend}
          dataFromBackend={dataFromBackend}
        />} />
        <Route path="/myportfolio" element={<MyPortfolio
          user={user}
          auth={auth}
          mainState={mainState}
          setMainState={setMainState}
          web3={web3}
          enableWeb3={enableWeb3}
          isWeb3Enabled={isWeb3Enabled}
          web3EnableError={web3EnableError}
          creatorsData={creatorsData}
          setCreatorsData={setCreatorsData}
          userDAOs={userDAOs}
          setUserDAOs={setUserDAOs}
        />} />
        <Route path="/mytransactions" element={<MyTransactions
          user={user}
          auth={auth}
          creatorsData={creatorsData}
          setCreatorsData={setCreatorsData}
          mainState={mainState}
          setMainState={setMainState}
        />} />
        <Route path="/myproposals" element={<MyProposals
          user={user}
          auth={auth}
          userDAOs={userDAOs}
          setUserDAOs={setUserDAOs}
          getProposalsData={getProposalsData}
          proposalData={proposalData}
          setProposalData={setProposalData}
          web3={web3}
          enableWeb3={enableWeb3}
          isWeb3Enabled={isWeb3Enabled}
          web3EnableError={web3EnableError}
          creatorsData={creatorsData}
          setCreatorsData={setCreatorsData}
          mainState={mainState}
          setMainState={setMainState}
        />} />
        <Route path="/proposallist" element={<ProposalsList
          user={user}
          auth={auth}
          mainState={mainState}
          setMainState={setMainState}
          proposalData={proposalData}
          setProposalData={setProposalData}
        />} />
        <Route path="/viewproposal" element={<ViewProposal
          user={user}
          auth={auth}
          mainState={mainState}
          setMainState={setMainState}
          proposalData={proposalData}
          setProposalData={setProposalData}
          web3={web3}
          enableWeb3={enableWeb3}
          isWeb3Enabled={isWeb3Enabled}
          web3EnableError={web3EnableError}
        />} />
        <Route path="/discovercreators" element={<DiscoverCreators
          user={user}
          auth={auth}
          mainState={mainState}
          creatorCards={creatorCards}
          setCreatorsData={setCreatorsData}
          creatorCards={creatorCards}
          setCreatorCards={setCreatorCards}
          // getCreatorProfile={getCreatorProfile}
          // retrieveProfile={retrieveProfile}
          creatorsData={creatorsData}
          web3={web3}
          enableWeb3={enableWeb3}
          isWeb3Enabled={isWeb3Enabled}
          web3EnableError={web3EnableError}
          setCreatorProfile={setCreatorProfile}
        />} />
        <Route path="/creatorprofile" element={<CreatorProfile
          user={user}
          auth={auth}
          creatorsData={creatorsData}
          creatorProfile={creatorProfile}
          mainState={mainState}
          setMainState={setMainState}
        />} />
        <Route path="/buytoken" element={<BuyToken
          user={user}
          auth={auth}
          mainState={mainState}
          setMainState={setMainState}
          web3={web3}
          enableWeb3={enableWeb3}
          isWeb3Enabled={isWeb3Enabled}
          web3EnableError={web3EnableError}
        />} />
        <Route path="/sendtoken" element={<SendToken
          user={user}
          auth={auth}
          mainState={mainState}
          setMainState={setMainState}
          web3={web3}
          enableWeb3={enableWeb3}
          isWeb3Enabled={isWeb3Enabled}
          web3EnableError={web3EnableError}
        />} />
        <Route path="/advancedkycalert" element={<AdvancedKYCAlert
          user={user}
          auth={auth}
          mainState={mainState}
        />} />
        <Route path="/basickycalert" element={<BasicKYCAlert
          user={user}
          auth={auth}
          mainState={mainState}
        />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
