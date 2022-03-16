import React, { useState, useEffect } from "react";
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useMoralis, useApiContract } from 'react-moralis'
import Web3 from 'web3'
import axios from 'axios'

import config from './config'

import daoContractAbi from './components/ABI/SocTokDAOABI'
import defaultProfilePic from '../src/images/male_user.svg'


// plasmicComponents
import Creatorslidercard from "./components/plasmicComponents/Creatorslidercard";
import LbIndividualCard from "./components/plasmicComponents/LbIndividualCard";

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
import HomePageBase from "./components/reactComponents/HomePage_Base";

function App() {

  const navigate = useNavigate()

  let cOptions = {}

  const [dataFromBackend, setDataFromBackend] = useState({
    status: {
      leaderboarddata: false,
      socialfeeddata: false,
      basedata: false
    },
    leaderboarddata: [],
    sliderdata: [],
    podiumdata: ['#', '#', '#'],
    socialfeeddata: []
  })
  const [userDAOs, setUserDAOs] = useState([])
  const [creatorsData, setCreatorsData] = useState([])
  const [creatorsDatabase, setCreatorsDatabase] = useState([])
  const [proposalData, setProposalData] = useState([])
  const [creatorCards, setCreatorCards] = useState([])
  const { auth, user, signup, login, hasAuthError, setUserData, logout, refetchUserData, userError, authenticate } = useMoralis()
  const { web3, enableWeb3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError, account } = useMoralis()
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
      //userprofilepicture: 'https://images.unsplash.com/photo-1645771729688-951e911d2625?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      userprofilepicture: defaultProfilePic,
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
      },
      charmBalance: 500
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

  // useEffect(() => {
  //   console.log('web3 from App JS', web3, account, isWeb3Enabled)
  //   if(!isWeb3Enabled){
  //     if(window.screen.width <= 780) {
  //       enableWeb3({ provider:"walletconnect", chainId: 137})
  //     } else {
  //       enableWeb3()
  //     }
  //   }
  // },[isWeb3Enabled])

  const switchNetworkMumbai = async () => {
    
    //console.log('called switchNetworkMumbai', web3, web3.currentProvider)
    try {
      console.log(1)
      if(window.screen.width <= 780){
        await enableWeb3({ provider: "walletconnect", chainId: 137, signingMessage: "Welcome to Mecasso"})
      } else {
        await enableWeb3({chainId: 137, signingMessage: "Welcome to Mecasso"})
      }  
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }]
      });
    } catch (error) {
      console.log(2)
      if (error.code === 4902) {
        try {
          await web3.currentProvider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13881",
                chainName: "Mumbai",
                rpcUrls: ["https://rpc-mumbai.matic.today"],
                nativeCurrency: {
                  name: "Matic",
                  symbol: "Matic",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com"],
              },
            ],
          });
        } catch (error) {
          alert(error.message);
        }
      }
    }
  }

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
            address: contractOptions.contractAddress,
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
        noProposals: numberOfProposals,
        contractAddress: contractAddress
      }
    })
    // let contractAbi = JSON.parse(daoContractAbi)
    // console.log(contractAddress)
    // let web3JS = new Web3(web3.provider)
    // let daocontract = new web3JS.eth.Contract(contractAbi, contractAddress)
    // console.log('CA', user.get('accounts')[0])
  }

  useEffect(() => {
    if (user !== null) {
      console.log('email', user.get('email'))
      let userfirstname = 'Hello,'
      if (user.get('firstname') === undefined) {
        userfirstname = 'Hello,'
      } else {
        userfirstname = userfirstname + ' ' + user.get('firstname')
      }
      console.log('userfname', userfirstname)
      setMainState(prevState => {
        return {
          ...prevState,
          userfirstname: [userfirstname]
        }
      })
      axios.get(config.backendServer + '/getProfilePhoto', { params: { userID: user.get('email') } }).then(function (response, error) {
        if (response) {
          //console.log('gpp',response.data)
          if (response.data !== 'No Record' && Object.keys(response.data[0]).length !== 0) {
            //console.log('gpp2',response.data[0].profilePhoto)
            let userfirstname = 'Hello,'
            if (user.get('firstname') === undefined) {
              userfirstname = 'Hello,'
            } else {
              userfirstname = userfirstname + ' ' + user.get('firstname')
            }
            console.log('userfname', userfirstname)
            setMainState(prevState => {
              return {
                ...prevState,
                userprofilepicture: 'data:image/jpeg;base64,' + response.data[0].profilePhoto,
                userfirstname: [userfirstname]
              }
            })
          }
        } else {
          console.log(error)
        }
      })
    }
  }, [user])

  useEffect(() => {
    console.log('auth state', auth.state)
    if (auth.state === 'authenticated') {
      setMainState(prevState => {
        return {
          ...prevState,
          userLoggedIn: true
        }
      })
    } else {
      setMainState(prevState => {
        return {
          ...prevState,
          userLoggedIn: false
        }
      })
    }
  }, [auth.state])

  const onChangeHandlerPhoto = (event) => {
    console.log(event.target.files[0])
    const reader = new FileReader();
    let base64data = null
    reader.onloadend = () => {
      // use a regex to remove data url part
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");

      // log to console
      // logs wL2dvYWwgbW9yZ...
      console.log('base64', base64String);
      // base64data = base64String
      axios.post(config.backendServer + '/uploadProfilePhoto', { image: base64String, userID: user.get('email') }).then(function (response, error) {
        if (response) {
          console.log(response)
        } else {
          console.log(error)
        }
      })
    };
    reader.readAsDataURL(event.target.files[0]);
    console.log('base64data', base64data)
  }


  // functions for homepage/leaderboardpage
  // ==================================================================================

  // usestate hooks for leaderboard page

  const [lbData, setLbData] = useState([])
  const [lbElements, setLbElements] = useState([])
  const [tempLbElements, setTempLbElements] = useState([])
  const [sliderElements, setSliderElements] = useState([])
  const [podiumImages, setPodiumImages] = useState(['#', '#', '#'])
  const [uiState, setUiState] = useState({})
  const [contractParams, setContractParams] = useState([])

  useEffect(() => {
    if (!dataFromBackend.status.leaderboarddata) {
      axios.post(config.backendServer + "/getAllDAOs").then(function (response, error) {
        if (response) {
          console.log('response from allDaos', response.data)
          let allDaoData = response.data['daos']
          axios.get(config.backendServer + "/creators").then(function (response, error) {
            if (response) {
              console.log(response.data["Creators By Alphabetical order"])
              let creatorData = response.data["Creators By Alphabetical order"]
              let counter = 0
              //setCreatorData(creatorData)
              let tempCreatorArray = []
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
                if (ele["DAOs"][0]["tokenSymbol"].length > 5) {
                  tSym = ele["DAOs"][0]["tokenSymbol"].slice(0, 3) + '..'
                } else {
                  tSym = ele["DAOs"][0]["tokenSymbol"]
                }
                let objFromDao = allDaoData.find(obj => { return obj.tokenSymbol === ele["DAOs"][0]["tokenSymbol"] })
                let tokenPrice = objFromDao.currentPrice
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
                  tokenprice: tokenPrice,
                  creatorAddress: objFromDao.creator
                }
                let card = <Creatorslidercard
                  image={
                    <figure className="image">
                      <img className="is-rounded" src={ele.profilePhoto} />
                    </figure>
                  }
                  creatorname={cName}
                  tokensymbol={tSym}
                  tokenprice={tokenPrice}
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
                tempCreatorArray.push(card)
                setSliderElements([...tempCreatorArray])
                setCreatorsData(prevState => [...prevState, rawData])
                setDataFromBackend(prevState => {
                  return {
                    ...prevState,
                    sliderdata: [...prevState.sliderdata, card]
                  }
                })
                console.log('slider elements state array update', dataFromBackend.sliderdata)
              })
              axios.post(config.backendServer + '/leaderboard').then(function (response, error) {
                if (response) {
                  console.log('leaderboard data', response.data['leaderboard'])
                  if (response.data['leaderboard'].length === 0) {
                    console.log('Leaderboard Empty')
                  } else {
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
                        currentTradeVolume = parseFloat(ele["sales"]) // 0.000534
                      } else if (ele["_id"]["baseAsset"] === "WDAI") {
                        currentTradeVolume = parseFloat(ele["sales"]) // 0.694376
                      } else if (ele["_id"]["baseAsset"] === "MATIC") {
                        currentTradeVolume = parseFloat(ele["sales"])
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
                        let slicedCurrentVolume = null
                        if (currentTradeVolume.toString().length > 6) { slicedCurrentVolume = currentTradeVolume.toString().slice(0, 8) }
                        else { slicedCurrentVolume = currentTradeVolume }
                        console.log('slicedvalue', slicedCurrentVolume.toString().slice(0, 8))
                        let card = <LbIndividualCard
                          profilepic={
                            <figure className="image">
                              <img className="is-rounded" src={cProfilePic} />
                            </figure>
                          }
                          creatorname={cName}
                          tokensymbol={ele["DAOdetails"][0]['tokenSymbol']}
                          //tradevolume={currentTradeVolume}
                          tradevolume={slicedCurrentVolume.toString().slice(0, 8)}
                          creatorbutton={{
                            onClick: async () => {
                              console.log('tsym', ele["DAOdetails"][0]["tokenSymbol"])
                              let obj = await creatorsData.find(o => o.tokensymbol === ele["DAOdetails"][0]["tokenSymbol"])
                              console.log('obj', obj)
                              //getCreatorProfile(cName, ele["DAOdetails"][0]['tokenSymbol'], ele["_id"]["tokenName"], cContentType, cObj.daoaddress, cProfilePic)
                              getCreatorProfile(obj.creatorName, obj.tokenSymbol, obj.tokenName, obj.contentType, obj.daoaddress, obj.profilePhoto)
                            }
                          }}
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
                        let slicedValue = null
                        let calAmount = currentTradeVolume + mapArray[tokName]["tradeVolume"]
                        if (calAmount.toString().length > 6) { slicedValue = calAmount.toString().slice(0, 8) }
                        else { slicedValue = calAmount }
                        console.log('second slice', slicedValue)
                        let card = <LbIndividualCard
                          profilepic={
                            <figure className="image">
                              <img className="is-rounded" src={cProfilePic} />
                            </figure>
                          }
                          creatorname={cName}
                          tokensymbol={ele["DAOdetails"][0]["tokenSymbol"]}
                          tradevolume={slicedValue}
                          creatorbutton={{
                            onClick: async () => {
                              console.log('tsym', ele["DAOdetails"][0]["tokenSymbol"])
                              let obj = await creatorsData.find(o => o.tokensymbol === ele["DAOdetails"][0]["tokenSymbol"])
                              console.log('obj', obj)
                              //getCreatorProfile(cName, ele["DAOdetails"][0]['tokenSymbol'], ele["_id"]["tokenName"], cContentType, cObj.daoaddress, cProfilePic)
                              getCreatorProfile(obj.creatorName, obj.tokenSymbol, obj.tokenName, obj.contentType, obj.daoaddress, obj.profilePhoto)
                            }
                          }}
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
                }
              })
              setDataFromBackend(prevState => {
                return {
                  ...prevState,
                  status: {
                    ...prevState.status,
                    leaderboarddata: true,
                    basedata: true
                  }
                }
              })
            }
          })
        } else {
          console.log(error)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (uiState.backendProcessCompletion) {
      console.log('backend process completed')
      console.log('slider data', dataFromBackend.sliderdata)
      catFilter('', '', 10)
      console.log('LB data', lbData)
      setCreatorsDatabase([...lbData])
      setCreatorCards([...dataFromBackend.sliderdata])
      setPodiumImages([lbData[0].profilepic])
      setPodiumImages([lbData[0].profilepic, lbData[1].profilepic, lbData[2].profilepic])
      setDataFromBackend(prevState => {
        return {
          ...prevState,
          podiumdata: [lbData[0].profilepic, lbData[1].profilepic, lbData[2].profilepic]
          //podiumdata: [lbData[0].profilepic]
        }
      })
      setMainState(prevState => {
        return {
          ...prevState,
          lbData: lbData
        }
      })
    }
  }, [uiState.backendProcessCompletion])

  const catFilter = (primaryFilter, secondaryFilter, limit) => {
    console.log('category filter called with', primaryFilter, secondaryFilter, limit)
    setTempLbElements([])
    let selectedElements = []
    let counter = 0
    console.log('lbdata cat filter', lbData)
    lbData.forEach(ele => {
      console.log('loop', counter, lbData.length, ele, ele[primaryFilter], secondaryFilter)
      if (counter === limit) {
        console.log('counter limit reached', selectedElements)
        setTempLbElements([...selectedElements])
        setDataFromBackend(prevState => {
          return {
            ...prevState,
            leaderboarddata: [...selectedElements]
          }
        })
        return
      } else {
        if (primaryFilter === '' && secondaryFilter === '') {
          console.log('preparing card - empty filters')
          let card = <LbIndividualCard
            profilepic={
              <figure className="image">
                <img className="is-rounded" src={ele.profilepic} />
              </figure>
            }
            creatorname={ele.creatorname}
            tokensymbol={ele.tokensymbol}
            tradevolume={ele.tradevolume.toString().slice(0, 6)}
            creatorbutton={{
              onClick: async () => {
                console.log('tsym', ele.tokensymbol)
                console.log('crs data', creatorsData)
                let obj = await creatorsData.find(o => o.tokenSymbol === ele.tokensymbol)
                console.log('obj', obj)
                //getCreatorProfile(cName, ele["DAOdetails"][0]['tokenSymbol'], ele["_id"]["tokenName"], cContentType, cObj.daoaddress, cProfilePic)
                getCreatorProfile(obj.creatorName, obj.tokenSymbol, obj.tokenName, obj.contentType, obj.daoaddress, obj.profilePhoto)
              }
            }}
          />
          selectedElements.push(card)
          setDataFromBackend(prevState => {
            return {
              ...prevState,
              leaderboarddata: [...selectedElements]
            }
          })
          setTempLbElements([...selectedElements])
          counter++
        } else {
          if (ele[primaryFilter].toLowerCase() === secondaryFilter.toLowerCase()) {
            console.log('preparing cards')
            let card = <LbIndividualCard
              profilepic={
                <figure className="image">
                  <img className="is-rounded" src={ele.profilepic} />
                </figure>
              }
              creatorname={ele.creatorname}
              tokensymbol={ele.tokensymbol}
              tradevolume={ele.tradevolume.toString().slice(0, 6)}
              creatorbutton={{
                onClick: async () => {
                  console.log('tsym', ele["DAOdetails"][0]["tokenSymbol"])
                  let obj = await creatorsData.find(o => o.tokensymbol === ele["DAOdetails"][0]["tokenSymbol"])
                  console.log('obj', obj)
                  //getCreatorProfile(cName, ele["DAOdetails"][0]['tokenSymbol'], ele["_id"]["tokenName"], cContentType, cObj.daoaddress, cProfilePic)
                  getCreatorProfile(obj.creatorName, obj.tokenSymbol, obj.tokenName, obj.contentType, obj.daoaddress, obj.profilePhoto)
                }
              }}
            />
            selectedElements.push(card)
            setDataFromBackend(prevState => {
              return {
                ...prevState,
                leaderboarddata: [...selectedElements]
              }
            })
            setTempLbElements([...selectedElements])
            counter++
          } else {
            setDataFromBackend(prevState => {
              return {
                ...prevState,
                leaderboarddata: [...selectedElements]
              }
            })
          }
        }
      }
    })
  }

  useEffect(() => {
    console.log('datafrombackend leaderboard data changed', dataFromBackend.leaderboarddata)
  }, [dataFromBackend.leaderboarddata])

  useEffect(() => {
    let sortedArray = lbData.sort((a, b) => b.tradevolume - a.tradevolume)
    setLbData(sortedArray)
  }, [lbData])

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
          address: addr,
          functionName: "balanceOf",
          abi: contractAbi,
          params: { _owner: dataFromBackend.creator }
        }
        let parametersTwo = {
          chain: "mumbai",
          address: addr,
          functionName: "cap",
          abi: contractAbi,
          //params: { _owner: dataFromBackend.creator }
        }
        let parametersThree = {
          chain: "mumbai",
          address: addr,
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
        setCreatorProfile({
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

  //=======================================================================

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
          catFilter={catFilter}
          web3={web3}
          enableWeb3={enableWeb3}
          isWeb3Enabled={isWeb3Enabled}
          web3EnableError={web3EnableError}
          setCreatorProfile={setCreatorProfile}
          dataFromBackend={dataFromBackend}
          setDataFromBackend={setDataFromBackend}
          uiState={uiState}
          setUiState={setUiState}
          setContractParams={setContractParams}
          contractParams={contractParams}
          onChangeHandlerPhoto={onChangeHandlerPhoto}
          logout={logout}
        />} />

        <Route path="/homepagebase" element={<HomePageBase
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
          catFilter={catFilter}
          web3={web3}
          enableWeb3={enableWeb3}
          isWeb3Enabled={isWeb3Enabled}
          web3EnableError={web3EnableError}
          setCreatorProfile={setCreatorProfile}
          dataFromBackend={dataFromBackend}
          setDataFromBackend={setDataFromBackend}
          uiState={uiState}
          setUiState={setUiState}
          setContractParams={setContractParams}
          contractParams={contractParams}
          onChangeHandlerPhoto={onChangeHandlerPhoto}
          logout={logout}
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
          switchNetworkMumbai={switchNetworkMumbai}
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
          onChangeHandlerPhoto={onChangeHandlerPhoto}
          logout={logout}
          creatorsData={creatorsData}
          getCreatorProfile={getCreatorProfile}
          contractParams={contractParams}
          uiState={uiState}
          setUiState={setUiState}
          setContractParams={setContractParams}
          setCreatorProfile={setCreatorProfile}
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
          onChangeHandlerPhoto={onChangeHandlerPhoto}
          logout={logout}
        />} />
        <Route path="/mytransactions" element={<MyTransactions
          user={user}
          auth={auth}
          creatorsData={creatorsData}
          setCreatorsData={setCreatorsData}
          mainState={mainState}
          setMainState={setMainState}
          dataFromBackend={dataFromBackend}
          onChangeHandlerPhoto={onChangeHandlerPhoto}
          logout={logout}
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
          dataFromBackend={dataFromBackend}
          onChangeHandlerPhoto={onChangeHandlerPhoto}
          logout={logout}
        />} />
        <Route path="/proposallist" element={<ProposalsList
          user={user}
          auth={auth}
          mainState={mainState}
          setMainState={setMainState}
          proposalData={proposalData}
          setProposalData={setProposalData}
          onChangeHandlerPhoto={onChangeHandlerPhoto}
          logout={logout}
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
          onChangeHandlerPhoto={onChangeHandlerPhoto}
          logout={logout}
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
          setContractParams={setContractParams}
          contractParams={contractParams}
          dataFromBackend={dataFromBackend}
          setDataFromBackend={setDataFromBackend}
          uiState={uiState}
          setUiState={setUiState}
          onChangeHandlerPhoto={onChangeHandlerPhoto}
          logout={logout}
          catFilter={catFilter}
        />} />
        <Route path="/creatorprofile" element={<CreatorProfile
          user={user}
          auth={auth}
          creatorsData={creatorsData}
          creatorProfile={creatorProfile}
          mainState={mainState}
          setMainState={setMainState}
          onChangeHandlerPhoto={onChangeHandlerPhoto}
          logout={logout}
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
          creatorsData={creatorsData}
          onChangeHandlerPhoto={onChangeHandlerPhoto}
          logout={logout}
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
          creatorsData={creatorsData}
          onChangeHandlerPhoto={onChangeHandlerPhoto}
          logout={logout}
        />} />
        <Route path="/advancedkycalert" element={<AdvancedKYCAlert
          user={user}
          auth={auth}
          mainState={mainState}
          onChangeHandlerPhoto={onChangeHandlerPhoto}
          logout={logout}
        />} />
        <Route path="/basickycalert" element={<BasicKYCAlert
          user={user}
          auth={auth}
          mainState={mainState}
          onChangeHandlerPhoto={onChangeHandlerPhoto}
          logout={logout}
        />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
