import React, { Component } from 'react';
import Web3 from 'web3'
import Container from './Components/Container';
//import background from "./img/background.png";
//import newabi from './myneabi.js';
import { daoabi } from './SocTokDAO.js';
import { bytecode } from './SocTokDAO.js';
import { nftabi } from './SocTokNFT.js';
import LbIndividualCard from "./Components/LbIndividualCard.jsx";
import config from './config.js';
import { useWeb3Contract } from 'react-moralis';


//import tokenbytecode from './tokenbytecode.js';

var FileSaver = require('file-saver');


class App extends Component {
	constructor() {
		super();

		this.onInputChangeUpdateField = this.onInputChangeUpdateField.bind(this);

		this.state = {
			leaderboardData: [],
			navToken: 'null',

			//server: 'localhost:5000',
			server: config.backend,
			numrows: 1,
			isWeb3: false,
			nominee: '',
			DAOlist: [],
			fields: {

			},
			//NFTcontract: "0xee3354F793D730ABd489f91ed1D7fc4471F12A30",		
			//NFTcontract: "0x681e7387c53Fa7124C80DF2dC963DDF86d10a49d",
			NFTcontract: "0x25B5fa79840d57B9D8583ab5F5713280DA455134",
			passwords: {
				gpassword: '',
				fbpassword: '',
				dbpassword: ''
			},
			//DAOcontract: "0x3D2AbD4E30b391d6b41bd9cFcF7347A1c90c7D8B",		
			//contractAddress: "0x92053b8Cff05aa0c46c8d2bBf6B4ddc8D54DFa9D",
			//contractAddress: "0xa142781B0476a7c69bdAf82d43b8EEff30157b1D", //Polygon   
			//contractAddress: "0x42AF28F6Cc70e724E730856A5FcD5063fd93C13f",
			wallets: [],
			briefProposals: [],
			walletOne: {},
			socialNav: 0,
			navProposal: 1,
			charmBalance: 0,
			socialIDs: {

			},

			FieldList: {


			}
		};
	}



	onInputChangeUpdateField = (name, value) => {
		let fields = this.state.fields;

		fields[name] = value;

		this.setState({
			fields
		});

	};

	onPasswordChangeUpdateField = (name, value) => {
		let passwords = this.state.passwords;

		passwords[name] = value;

		this.setState({
			passwords
		});

	};

	setNav = (value) => {

		//this.resetApp();

		this.setState({
			navToken: value,
		});


		//Load tokens before displaying wallet.
		console.log(value)


		if (value == 2 || value == 4 || value == 7) {
			this.getBalance()
		}

		if (value == '7a') {
			this.setNominee()
		}

	}

	setDAO = (tokenName, daocontract) => {

		this.setState({
			DAOcontract: daocontract,
		});

		this.setBalance(daocontract);
		this.setTokenData(daocontract);
		this.listProposals(daocontract);
		this.fetchCharmsBalance(tokenName, daocontract);
	}

	/*
		setDAO = (daocontract) => {

		this.setState({
			DAOcontract : this.state.fields.daocontract,
		});
		
		this.setBalance(this.state.fields.daocontract);
		this.setTokenData(this.state.fields.daocontract);
		this.listProposals(this.state.fields.daocontract);
	}
	*/

	setDAOlist = () => {

		let app = this;
		var url = this.state.server + '/viewCreatorDAOs';

		console.log("url", url);


		var params = JSON.stringify({
			userID: app.state.account
		});

		console.log(params, "params");

		fetch(url, {

			method: 'POST',
			mode: 'cors',

			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: params

		}).then(function (response, error) {


			if (response) {

				return response.json();
			}
			else {
				console.log(error);
			}
		}).then(function (data) {

			console.log("Fetched from MongoDB ", data.DAOs, data.profilePhoto);


			app.setState({
				DAOlist: data.DAOs,
				profilePhoto: data.profilePhoto
			});


		})

	}


	fetchSales = () => {

		let app = this;
		var url = this.state.server + '/returnSalesAgg';

		console.log("url", url);


		fetch(url, {

			method: 'POST',
			mode: 'cors',

			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},


		}).then(function (response, error) {


			if (response) {

				return response.json();
			}
			else {
				console.log(error);
			}
		}).then(function (data) {

			console.log("Fetched from MongoDB ", data);

		})

	}

	setBalance = (DAOaddress) => {

		let app = this;

		var ABI = JSON.parse(daoabi);


		var contract = new app.web3.eth.Contract(ABI, DAOaddress);

		console.log(contract, "contract");
		contract.methods
			.balanceOf(
				app.state.account
			)
			.call({ from: app.state.account }).then(function (response, err) {


				if (response) {

					console.log(response, "balance");
					app.setState({
						balance: response,
					});

				}
				else {
					console.log(err);
				}

			})

	}

	FileonChangeHandler = event => {

		console.log(event.target.files[0]);

		this.setState({
			File: event.target.files[0],
			Fname: event.target.files[0].name
		})

	}

	createtokenandDAO = (ipfsID) => {


		let app = this;

		app.setNav('2b');

		var ABI = JSON.parse(daoabi);

		console.log(app, "app.web3");
		var contract = new app.web3.eth.Contract(ABI, '0x0000000000000000000000000000000000000000');
		console.log("Initial and Creator tokens", app.state.fields.initialtokens, app.state.fields.creatortokens)

		var creatorTokens = Math.ceil(app.state.fields.initialtokens * app.state.fields.creatortokens / 100);

		console.log("Parameters for creation", app.state.ipfsID, ipfsID);
		//console.log("ipfs URL", ipfsURL, app.state.ipfsID);
		//console.log("creator tokens",creatorTokens);
		let ipfsURL;
		if (app.state.ipfsID) {
			ipfsURL = 'https://ipfs.indiart.io/ipfs/' + encodeURIComponent(ipfsID);
		}
		else {
			ipfsURL = 'No Social Links'
		}

		console.log("IPFS URL", ipfsURL);

		contract.deploy({
			data: bytecode,
			arguments: [app.state.account, 0, app.state.fields.tokenname, app.state.fields.tokensymbol,
				ipfsURL, Web3.utils.toWei(creatorTokens.toString()), Web3.utils.toWei(app.state.fields.initialtokens.toString()), 0]
		})
		.send({
			from: app.state.account
		}, function(error, transactionHash){ console.log("transaction hash",transactionHash); })
		//.on('error', function(error){ console.log("error",error); })
		//.on('transactionHash', function(transactionHash){ console.log("error",transactionHash) })
		.on('receipt', function(receipt){

		   console.log(receipt.contractAddress, "contractAddress"); // contains the new contract address
		   app.addDAOtoDB(receipt.contractAddress);
		})

	}


	addDAOtoDB = (contractAddress) => {

		let app = this;

		app.setNav('2c');


		var ipfsURL = 'https://ipfs.indiart.io/ipfs/' + encodeURIComponent(app.state.ipfsID);

		var url = this.state.server + '/addnewDAO';

		console.log('creator email', app.state.socialIDs)
		console.log("url", url);




		var params = JSON.stringify({
			//userID : app.state.account,
			userID: app.state.socialIDs.Youtube.email,
			//creator : app.state.fields.creatorname,
			creatorname: app.state.fields.creatorname,
			creator: app.state.account,
			tokenName: app.state.fields.tokenname,
			tokenSymbol: app.state.fields.tokensymbol,
			contractAddress: contractAddress,
			launchPrice: app.state.fields.launchprice,
			currentPrice: app.state.fields.launchprice,
			description: app.state.fields.description,
			category: app.state.fields.category,
			initalCreatorShare: app.state.fields.creatortokens,
			socialURI: ipfsURL,
			socialMedia: { Youtube: app.state.socialIDs.Youtube }

		});

		console.log(params, "params");

		fetch(url, {

			method: 'POST',
			mode: 'cors',

			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: params

		}).then(function (response, error) {

			if (response) {
				console.log("Added to MongoDB ", response);

				app.setState({
					DAOcontract: contractAddress
				});

				app.setDAOlist();
				app.setNav('2d');

			}
			else {
				console.log(error);
			}
		})
	}


	NewPost = () => {

		let app = this;

		var ipfsURL = 'https://ipfs.indiart.io/ipfs/' + encodeURIComponent(app.state.ipfsID);

		var url = this.state.server + '/addnewPost';

		console.log("url", url);



		var today = new Date();

		var params = JSON.stringify({
			DAOcontract: app.state.DAOcontract,
			tokenName: app.state.tokenname,
			tokenSymbol: app.state.tokensymbol,
			profilePhoto: app.state.profilePhoto,
			userID: app.state.account,
			heading: app.state.fields.newstitle,
			description: app.state.fields.newsbody,
			image: ipfsURL,
			medialink: app.state.fields.medialink,
			publisheddatetime: today

		});

		console.log(params, "params");

		fetch(url, {

			method: 'POST',
			mode: 'cors',

			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: params

		}).then(function (response, error) {

			if (response) {
				console.log("Added to MongoDB ", response);

				app.resetApp();

				app.setNav('19a');



			}
			else {
				console.log(error);
			}
		})
	}



	fetchCharmsBalance = (tokenName, contract) => {


		let app = this;
		var url = this.state.server + '/viewCharmOnChainBalance';

		console.log("url", url);


		var params = JSON.stringify({
			tokenName: tokenName,
			contract: contract
		});

		console.log(params, "params");

		fetch(url, {

			method: 'POST',
			mode: 'cors',

			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: params

		}).then(function (response, error) {


			if (response) {

				return response.json();
			}
			else {
				console.log(error);
			}
		}).then(function (data) {

			console.log("Fetched from MongoDB ", data.charmBalance);


			app.setState({
				charmBalance: data.charmBalance
			});


		})

	}

	setSocialCard = (social, channelData) => {

		//var socialID =  {social,ID,token};
		//console.log("socialID",socialID)
		var socialIDs = this.state.socialIDs;
		console.log("channelData", channelData)
		//socialIDs.push(socialID);



		//console.log('socialIDs',this.state.socialIDs)	

		var FieldList = this.state.FieldList;

		if (social == 'Youtube') {

			socialIDs.Youtube = channelData;

			FieldList.Youtube = 'YesAuth';

			console.log("socialIDs", socialIDs);
		}
		if(social == 'Facebook')
		{
			FieldList.FB = 'YesAuth';
		}
		/*
		if(social == 'Google')
		{
			FieldList.Google = 'YesAuth';
		}
		if(social == 'Dropbox')
		{
			FieldList.DropBox = 'YesAuth';
		}
		*/
		this.setState({
			socialIDs,
			FieldList,
			disabled: true,
			socialNav: 1
		});

	}

	setID = (social, ID, token) => {

		var socialID = { social, ID, token };
		console.log("socialID", socialID)
		var socialIDs = this.state.socialIDs;

		socialIDs.push(socialID);



		console.log('socialIDs', this.state.socialIDs)

		var FieldList = this.state.FieldList;

		if (social == 'Facebook') {
			FieldList.FB = 'YesAuth';
		}
		if (social == 'Google') {
			FieldList.Google = 'YesAuth';
		}
		if (social == 'Dropbox') {
			FieldList.DropBox = 'YesAuth';
		}

		this.setState({
			socialIDs,
			FieldList
		});
	}

	setDAuth = () => {

		var FieldList = this.state.FieldList;

		FieldList.DropBox = 'YesDAuth';

		this.setState({
			FieldList
		});

	}


	createWallet = () => {

		let app = this;

		app.setNav('2a');

		var url = this.state.server + '/createWallet';

		console.log("Fields", app.state.fields);
		console.log("passwords", app.state.passwords);
		console.log("socialIDs", app.state.socialIDs);
		fetch(url, {

			method: 'POST',

			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				nominee: app.state.fields.nominee,
				socialIDs: app.state.socialIDs,
				passwords: app.state.passwords,
				owner: app.state.account
			})
		}).then(function (response, error) {

			if (response) {
				console.log(response);
				return response.json();
			}
			else {
				console.log(error);
			}
		}).then(function (data) {

			console.log(data)

			app.setState({
				wallet: data.MyneWallet,
				walletReceipt: data.MyneWalletReceipt,
			});

			//app.ipfsUpload()
		});
	}


	/*
		transferWallet = (receiver) => {    
		    
					   //this.setNav('5a');	
	
						let app = this;	
					var ABI = JSON.parse(newabi);
					
					
					 var contract = new app.web3.eth.Contract(ABI, app.state.contractAddress);
	
			var tmparray = [];
				    
					tmparray[0] = [app.state.account,10000];
			
						
						console.log("Reached here");
						
						contract.methods
						.transferFromOrMint(
							[
								app.state.tokenID,
								app.state.ipfsID,				
								tmparray,
								[],
								["0x0000000000000000000000000000000000000000000000000000000000000000"]
							],
							app.state.account,
							receiver)
						.send({from: app.state.account}).then(function(response,err){
									
							
							if(response) {
											 console.log("response",response);		
											 //app.setNav('5b');	
									  }
									else	{
											console.log("error",err);
										}
				
				
								})
						
					}			
	
					transferNominee = () => {    
		    
						this.setNav('5a');	
	 
						 let app = this;	
					 var ABI = JSON.parse(newabi);
					 
					 
					  var contract = new app.web3.eth.Contract(ABI, app.state.contractAddress);
	 
			 var tmparray = [];
					 
					 tmparray[0] = [app.state.account,10000];
				  	
					 contract.methods
					 .transferToNominee(
						 
							 app.state.walletOne.tokenID
					 )	 
					 .send({from: app.state.account}).then(function(response,err){
								 
						 
						 if(response) {
										  console.log(response);	
										  app.setNav('5b');		
								   }
								 else	{
										 console.log(err);
									 }
									 
							})
					 }		
	
					 setNominee = () => {    
		    
						
						 let app = this;	
					 var ABI = JSON.parse(newabi);
					 
					 
					  var contract = new app.web3.eth.Contract(ABI, app.state.contractAddress);
	 
			 var tmparray = [];
					 
					 tmparray[0] = [app.state.account,10000];
				  	
					 contract.methods
					 .nomineeMap(
						 
							 app.state.walletOne.tokenID
					 )	 
					 .call({from: app.state.account}).then(function(response,err){
								 
						 
						 if(response) {
										  
	
										  app.setState({    
											nominee : response.nominee
										});
													
								   }
								 else	{
										 console.log(err);
									 }
									 
							})
					 }		
	
			
					 changeNominee = () => {    
		    
						
						let app = this;	
					var ABI = JSON.parse(newabi);
					
					
					 var contract = new app.web3.eth.Contract(ABI, app.state.contractAddress);
	
			var tmparray = [];
					
					tmparray[0] = [app.state.account,10000];
					
					contract.methods
					.changeNominee(
						
							app.state.walletOne.tokenID,
							app.state.fields.newnominee
					)	 
					.send({from: app.state.account}).then(function(response,err){
						
						if(response) {
										 
									console.log(response);											
									app.setNav('7a'); 
								  }
	
								else	{
										console.log(err);
									}
									
						 })
					}		
	
	  
			getBalance = () => {    
		    
		    
			let app = this;
		    
			var balance;
			var ABI = JSON.parse(newabi);
				
				 var contract = new app.web3.eth.Contract(ABI, app.state.contractAddress);
				 
				 
	    
				contract.methods
			.balanceOf(app.state.account)
			.call({from: app.state.account}).then(function(response,err){
						
						if(response) {
										 console.log(response);
										 balance = response;			
									 }
								   else	{
										console.log(err);
										 }
							}).then(function(response,err) {
							
													 app.setTokenID(balance,contract)
									})
									}
									
	*/


	setTokenID = (balance, contract) => {

		let app = this;
		var index = balance - 1;
		var tokenID;
		var tokenURI;
		var wallets = [];

		while (index >= 0)  // Newer wallets appear on top - Rendered in descending order
		{
			var tmp = index;
			contract.methods
				.tokenOfOwnerByIndex(app.web3.eth.defaultAccount, index)
				.call({ from: app.web3.eth.defaultAccount }).then(function (response, err) {

					if (response) {


						tokenID = response;

						contract.methods
							.tokenURI(tokenID)
							.call({ from: app.web3.eth.defaultAccount }).then(function (response, err) {

								if (response) {

									var tmp2 = response.split(":"); //Check base uri extensions while deploying. Minor fix here. shoud be ipfs/ . Not ipfs:
									tokenURI = tmp2[1];

									//Check uri extensions. Minor fix here.

									var url = 'https://ipfs.indiart.io/ipfs' + tokenURI;

									//console.log("url",url);

									//Fetching IPFS file and reading data
									fetch(url, { mode: 'cors' }).
										then(function (response, error) {
											console.log("file", response);
											return response.json();
										}).
										then(function (data) {

											console.log("ipfs data", data);
											var temp3 = tokenURI.split("/")
											data.tokenID = tokenID;
											data.tokenURI = temp3[1];


											wallets.push(data);

											app.setState({
												wallets,
												tokenID:
													tokenID,
												tokenURI:
													tokenURI
											});

										});

								}
								else {
									console.log(err);
								}

							})
					}
					else {
						console.log(err);
					}

				})

			index--;
		}


	}










	decrypt = () => {



		var url = this.state.server + '/decryptWallet';

		let app = this;

		fetch(url, {

			method: 'POST',

			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},

			body: JSON.stringify({
				wallet: this.state.walletOne,
				password: this.state.fields.password
			})

		}).then(function (response, error) {

			if (response) {
				return response.json();
			}
			else {
				console.log(error);
			}
		}).then(function (data) {

			console.log(data);

			var wallet = app.state.walletOne;
			console.log("decryptedOrg", data.walletData);
			wallet.decryptedText = data.walletData;

			console.log("decryptedText", wallet.decryptedText);

			app.setState({
				walletOne: wallet
			});
		});
	}

	setTokenData = (DAOcontract) => {

		let app = this;

		var ABI = JSON.parse(daoabi);

		var cap, totalSupply;

		var contract = new app.web3.eth.Contract(ABI, DAOcontract);

		contract.methods
			.name()
			.call({ from: app.state.account }).then(function (response, err) {

				if (response) {
					app.setState({
						tokenname: response
					});

					contract.methods
						.symbol()
						.call({ from: app.state.account }).then(function (response, err) {

							if (response) {
								app.setState({
									tokensymbol: response
								});

								contract.methods
									.cap()
									.call({ from: app.state.account }).then(function (response, err) {

										if (response) {
											app.setState({
												cap: Web3.utils.fromWei(response.toString())
											});

											contract.methods
												.totalSupply()
												.call({ from: app.state.account }).then(function (response, err) {

													if (response) {
														app.setState({
															totalSupply: Web3.utils.fromWei(response.toString())
														});

													}
												})
										}
									});
							}
						});
				}
			});
	}



	increaseTokenCap = () => {

		console.log("inc token cap")

		let app = this;
		console.log('web3 obj', app.web3)

		var ABI = JSON.parse(daoabi);
		var contract = new app.web3.eth.Contract(ABI, app.state.DAOcontract);
		console.log('contract', contract)
		contract.methods
			.increaseCapProposal(app.state.fields.description,
				Web3.utils.toWei(app.state.fields.newcap.toString()),
				app.state.fields.debateperiod)
			.send({ from: app.state.account }).then(function (response, err) {
				if (response) {
					console.log('response', response)
					app.setState({
						txHash: response.transactionHash,
						ProposalID: response.events.ProposalAdded.returnValues.proposalID
					})
					app.setNav('10a')
					app.listProposals(app.state.DAOcontract);
				} else {
					console.log('error', err)
				}
			})
		// .on('confirmation', function (confirmation, txnreceipt) {
		// 	console.log('confirmation block', confirmation, txnreceipt)
		// })
		// .on('transactionHash', function (transactionHash) {
		// 	console.log("txHash", transactionHash);
		// 	app.setState({
		// 		txHash: transactionHash
		// 	})
		// })
		// .on('receipt', function (receipt) {
		// 	let ProposalID = receipt.events.ProposalAdded.returnValues.proposalID;
		// 	console.log("ProposalID", ProposalID);
		// 	// app.setState({
		// 	// 	ProposalID: ProposalID
		// 	// })
		// 	// app.setNav('10a');
		// 	// app.listProposals(app.state.DAOcontract);
		// })
		// .on('error', function (error) { console.log("error", error); })
	}


	newProposal = () => {

		console.log("calling new proposal")

		let app = this;

		var ABI = JSON.parse(daoabi);


		var contract = new app.web3.eth.Contract(ABI, app.state.DAOcontract);

		contract.methods
			.newProposal(app.state.fields.recipient,
				app.state.fields.amount,
				app.state.fields.heading,
				app.state.fields.description,
				app.state.fields.debateperiod)

			//.send({ from: app.state.account }, function (error, transactionHash) { })
			.send({ from: app.state.account }).then(function (response, err) {
				if(response) {
					console.log(response)	
					app.setState({
						ProposalID: response.events.ProposalAdded.returnValues.ProposalID
					})
					app.setNav('10a')
					app.listProposals(app.state.DAOcontract)
				} else {
					console.log(err)
				}
			})
			// .on('transactionHash', function (transactionHash) {
			// 	console.log("txHash", transactionHash);
			// 	app.setState({

			// 		txHash: transactionHash

			// 	})
			// })
			// .on('receipt', function (receipt) {
			// 	console.log('receipt', receipt)
			// 	let ProposalID = receipt.events.ProposalAdded.returnValues.proposalID;
			// 	console.log("ProposalID", ProposalID);

			// 	app.setState({

			// 		ProposalID: ProposalID

			// 	})

			// 	app.setNav('10a');
			// 	app.listProposals(app.state.DAOcontract);
			// })
			// .on('confirmation', function (confirmationNumber, txnreceipt) {
			// 	console.log('confirmationblock', confirmationNumber, txnreceipt)
			// 	console.log('callback received')
			// })
			// .on('error', function (error) { console.log("error", error); })
	}


	voteProposal = (proposalID, support) => {

		let app = this;

		var ABI = JSON.parse(daoabi);


		var contract = new app.web3.eth.Contract(ABI, app.state.DAOcontract);
		console.log("params", proposalID, support);
		contract.methods
			.vote(proposalID, support)
			.send({ from: app.state.account }).then(function (response, err) {
				if(response) {
					console.log(response)	
					app.setState({
						txHash: response.transactionHash,
						ProposalID: response.events.Voted.returnValues.ProposalID,
						position: response.events.Voted.returnValues.position,
						voter: response.events.Voted.returnValues.voter
					})
					app.setNav('15a')
				} else {
					console.log(err)
				}
			})
				
			// 	, function (error, transactionHash) { })
			// .on('error', function (error) { console.log("error", error); })
			// .on('transactionHash', function (transactionHash) {
			// 	console.log("txHash", transactionHash);

			// 	app.setState({

			// 		txHash: transactionHash

			// 	})
			// })
			// .on('receipt', function (receipt) {

			// 	let ProposalID = receipt.events.Voted.returnValues.proposalID;
			// 	let position = receipt.events.Voted.returnValues.position;
			// 	let voter = receipt.events.Voted.returnValues.voter;



			// 	app.setState({

			// 		ProposalID: ProposalID,
			// 		position: position,
			// 		voter: voter,

			// 	})

			// 	app.setNav('15a');

			// })
	}


	sendToken = () => {

		console.log("REached here SendToken")

		let app = this;

		var ABI = JSON.parse(daoabi);


		var contract = new app.web3.eth.Contract(ABI, app.state.DAOcontract);

		contract.methods
			.transfer(app.state.fields.sendAddress, app.state.fields.currentTxnAmount)
			.send({ from: app.state.account }).then(function (response, err) {
				if(response) {
					console.log(response)	
					app.setState({
						txHash: response.transactionHash,
						sendTxn: true
					})
					app.setBalance(app.state.DAOcontract)
				} else {
					console.log(err)
				}
			})
				
			// 	, function (error, transactionHash) { })
			// .on('error', function (error) { console.log("error", error); })
			// .on('transactionHash', function (transactionHash) {
			// 	console.log("txHash", transactionHash);

			// 	app.setState({

			// 		txHash: transactionHash

			// 	})
			// })
			// .on('receipt', function (receipt) {

			// 	app.setState({

			// 		sendTxn: true

			// 	})

			// 	app.setBalance(app.state.DAOcontract);

			// })

	}




	viewactiveProposal = (index) => {

		console.log("index", index);
		//console.log("ProposalID in active proposal",ProposalID);

		//let Proposal = this.state.activeProposals[ProposalID.length-1];
		let Proposal = this.state.activeProposals[index];

		console.log(this.state.activeProposals, "active");
		console.log(Proposal, "Proposal");

		//var deadline = (new Date(Proposal.votingDeadline*1000)).toISOString();

		//Proposal.votingDeadline = deadline;

		this.setState({

			Proposal

		})

		this.setNav(15);

	}

	viewclosedProposal = (index) => {

		let Proposal = this.state.closedProposals[index];

		console.log(this.state.closedProposals, "closed");
		console.log(Proposal, "Proposal")

		this.setState({

			Proposal

		})

		this.setNav(15);

	}

	listProposals = (contractAddress) => {

		let app = this;

		var ABI = JSON.parse(daoabi);


		var contract = new app.web3.eth.Contract(ABI, contractAddress);


		contract.methods
			.numberOfProposals()
			.call({ from: app.state.account }).then(function (response, err) {

				if (response) {


					console.log("Number of proposals", response);
					let proposalNo = response;


					if (proposalNo) {

						var activeProposals = [];
						var closedProposals = [];
						var briefProposals = [];

						let i = proposalNo;

						//Fetch only last 10 proposals

						while (i >= proposalNo - 10 && i >= 1) {
							let counter = i;
							console.log(counter, "counter");


							contract.methods
								.proposals(i)
								.call({ from: app.state.account }).then(function (response, err) {



									if (response) {

										console.log(response, "proposal + counter", counter);
										if (response.open == true) {
											let temp = new Date(response.votingDeadline * 1000);
											let pdate = (temp.getDate()).toString();
											let pmonth = (temp.getMonth() + 1).toString();
											let pyear = (temp.getFullYear()).toString();

											//var tempDate = (new Date(response.votingDeadline*1000)).toISOString();
											//var deadline = tempDate.split("T",1);
											activeProposals.push({
												ProposalID: counter,
												heading: response.proptext.heading,
												description: response.proptext.description,
												recipient: response.recipient,
												amount: response.amount,
												status: response.open,
												creator: response.creator,
												yesVotes: response.yea,
												noVotes: response.nay,
												deposit: response.proposalDeposit,
												passed: response.proposalPassed,
												prevote: response.preSupport,
												deadline: pdate.concat('-', pmonth, '-', pyear)
												//votingDeadline: deadline
												//votingDeadline: response.votingDeadline
											})

											console.log("activeProposal", activeProposals)
										}
										else {
											let temp = new Date(response.votingDeadline * 1000);
											let pdate = (temp.getDate()).toString();
											let pmonth = (temp.getMonth() + 1).toString();
											let pyear = (temp.getFullYear()).toString();
											//var tempDate = (new Date(response.votingDeadline*1000)).toISOString();
											//var deadline = tempDate.split("T",1);
											closedProposals.push({
												ProposalID: counter,
												heading: response.proptext.heading,
												description: response.proptext.description,
												recipient: response.recipient,
												amount: response.amount,
												status: response.open,
												creator: response.creator,
												yesVotes: response.yea,
												noVotes: response.nay,
												deposit: response.proposalDeposit,
												passed: response.proposalPassed,
												deadline: pdate.concat('-', pmonth, '-', pyear)
												//votingDeadline: deadline
												//votingDeadline: response.votingDeadline
											})
										}

										if (counter > proposalNo - 5) {
											let temp = new Date(response.votingDeadline * 1000);
											let pdate = (temp.getDate()).toString();
											let pmonth = (temp.getMonth() + 1).toString();
											let pyear = (temp.getFullYear()).toString();
											//var tempDate = (new Date(response.votingDeadline*1000)).toISOString();
											//var deadline = tempDate.split("T",1);	   
											briefProposals.push({
												proposalID: counter,
												heading: response.proptext.heading,
												status: response.open,
												deadline: pdate.concat('-', pmonth, '-', pyear)
												//deadline: deadline		
												//deadline : response.votingDeadline
											});

											//console.log(briefProposals,"briefProposal");


										}

										console.log(counter, "counter");
										if (counter == proposalNo - 10 || counter == 1) {
											console.log("Reached here app state");

											app.setState({
												activeProposals,
												closedProposals,
												briefProposals: briefProposals
											})

											console.log(app.state.briefProposals, "briefProposal");
										}


									}
								})

							i--;
						}

					}
				}
			})
	}



	ipfsUpload = () => {


		let app = this;
		console.log("Tokens old", app.state.fields.initialtokens, app.state.fields.creatortokens)
		app.setNav('2a');

		const filedata = new FormData();
		var payload = JSON.stringify(this.state.socialIDs);
		console.log("payload", payload);
		filedata.append('socialIDs', payload);
		console.log("Reached IPFS");
		fetch('https://ipfswrite.indiart.io/api/v0/add', { method: 'POST', body: filedata, mode: 'cors' }).
			then(function (response, error) {

				if (response) {
					return response.json();
				}
				else {
					console.log(error);
				}
			}).then(function (data) {
				console.log(data);
				app.setState({
					ipfsID: data.Hash
				});

				console.log("IPFS hash", app.state.ipfsID);
				console.log("Tokens new", app.state.fields.initialtokens, app.state.fields.creatortokens);
				app.createtokenandDAO(data.Hash);

			})

	}



	ipfsNews = () => {


		let app = this;

		const filedata = new FormData();

		filedata.append('file', app.state.File);
		//filedata.append('heading',app.state.fields.newstitle);
		//filedata.append('description',app.state.fields.newsbody);
		//filedata.append('medialink',app.state.fields.medialink);


		fetch('https://ipfswrite.indiart.io/api/v0/add', { method: 'POST', body: filedata, mode: 'cors' }).
			then(function (response, error) {

				if (response) {
					return response.json();
				}
				else {
					console.log(error);
				}
			}).then(function (data) {
				console.log(data);
				app.setState({
					ipfsID: data.Hash
				});

				console.log("IPFS hash", app.state.ipfsID);
				app.NewPost();
			})

	}



	ipfsNFT = () => {


		let app = this;

		const filedata = new FormData();

		filedata.append('file', app.state.File);


		fetch('https://ipfswrite.mecasso.live/api/v0/add', { method: 'POST', body: filedata, mode: 'cors' }).
			then(function (response, error) {

				if (response) {
					return response.json();
				}
				else {
					console.log(error);
				}
			}).then(function (data) {
				console.log(data);
				app.setState({
					ipfsID: data.Hash
				});

				console.log("IPFS NFT hash", app.state.ipfsID);
				app.mintCommunityNFT();
			})
	}


	mintCommunityNFT = () => {


		let app = this;



		var ABI = JSON.parse(daoabi);

		var nftABI = JSON.parse(nftabi);

		var contract = new app.web3.eth.Contract(ABI, app.state.DAOcontract);


		var contractNFT = new app.web3.eth.Contract(nftABI, app.state.NFTcontract);

		var ipfsURL = 'https://ipfs.indiart.io/ipfs/' + encodeURIComponent(app.state.ipfsID);

		console.log("ipfs URL", ipfsURL, app.state.ipfsID);

		contract.methods
			.setSocTokNFTfactory(
				app.state.NFTcontract
			)
			.send({ from: app.state.account }).then(function (response, err) {

				if (response) {
					console.log("NFT",
						app.state.fields.nftrecipient,
						ipfsURL,
						app.state.fields.debateperiod);

					contract.methods
						.newNFTProposal(
							app.state.fields.nftrecipient,
							ipfsURL,
							app.state.fields.debateperiod
						)

						.send({ from: app.state.account }).then(function (response, err) {
							if(response) {
								console.log(response)	
								app.setState({
									txHash: response.transactionHash,
									ProposalID: response.events.ProposalAdded.returnValues.proposalID
								})
								app.setNav('10a')
								app.listProposals(app.state.DAOcontract)
							} else {
								console.log(err)
							}
						})
							
						// 	, function (error, transactionHash) { })
						// .on('error', function (error) { console.log("error", error); })
						// .on('transactionHash', function (transactionHash) {
						// 	console.log("txHash", transactionHash);

						// 	app.setState({

						// 		txHash: transactionHash

						// 	})
						// })
						// .on('receipt', function (receipt) {

						// 	let ProposalID = receipt.events.ProposalAdded.returnValues.proposalID;
						// 	console.log("ProposalID", ProposalID);

						// 	app.setState({

						// 		ProposalID: ProposalID

						// 	})


						// 	app.setNav('10a');
						// 	app.listProposals(app.state.DAOcontract);
						// })

				}
			})
	}

	/*
				
			mintMyne = () => {
			
			let app = this;
			
			console.log("Account",app.web3.eth.defaultAccount);
   var url = this.state.server+'/getnewTokenID';
    
  fetch(url, {
  
	method: 'POST',
    
	headers: {
		'Accept': 'application/json',
		'Content-Type':'application/json',
		  },	
    
	body: JSON.stringify({
				address: app.web3.eth.defaultAccount
			})

	}).
	then(function(response,error) {
		
		if(response)
		{
			console.log(response);
			return response.json();
		}
		else 
		{
			console.log(error);
		}
		}).then(function(data){
		
			console.log(data);
			
			app.setState({
							tokenID : data.tokenID
							});
			})
			.then(function(data){
			
		console.log("TokenID",app.state.tokenID);
		var ABI = JSON.parse(newabi);
			
			 var contract = new app.web3.eth.Contract(ABI, app.state.contractAddress);

		var tmparray = [];
			    
		tmparray[0] = [app.web3.eth.defaultAccount,10000];
		//console.log(app.state.tokenID,app.state.ipfsID,tmparray,app.state.account,app.state.wallet.nominee);
		//console.log(app.state.ipfsID);
			
		//var newToken = app.state.tokenID.toString();
		//console.log(newToken,'newToken');
		//gasPrice:  0.00000000001
		contract.methods.transferFromOrMintwithNominee(
			[
				app.state.tokenID,
				app.state.ipfsID,				
				tmparray,
				[],
				["0x0000000000000000000000000000000000000000000000000000000000000000"]
			],
			'0x0000000000000000000000000000000000000000',
			app.state.account,
			app.state.wallet.nominee)
		.send({from: app.state.account}).then(function(response,err){
					
					if(response) {
									 console.log(response);
									 
									var fileName = 'MyneWallet.json';
									
									// Create a blob of the data
									console.log(app.state.wallet);
									var fileToSave = new Blob([JSON.stringify(app.state.wallet)], {
										type: 'application/json',
										name: fileName
									});
									
									app.setNav('2b');

									// Save the file
									FileSaver.saveAs(fileToSave, fileName);
								 }
							   else	{
									console.log(err);
								}
		
		
						})						
   })
   }
   */




	resetForm = () => {

		var FieldList = {
		}

		this.setState({
			FieldList: FieldList
			,
			fields: {

			}
		}
		);

	}

	resetApp = () => {

		var FieldList = {
		}

		this.setState({
			FieldList: FieldList
			,
			fields: {

			}
		}
		);

	}


	setField = (value) => {

		var FieldList = this.state.FieldList;

		if (value == 2) {
			FieldList.FB = 'Yes';
			this.setState({
				FieldList: FieldList
			});
		}

		if (value == 2) {
			FieldList.Insta = 'Yes';
			this.setState({
				FieldList: FieldList
			});
		}

		if (value == 3) {
			FieldList.YouTube = 'Yes';
			this.setState({
				FieldList: FieldList
			});
		}

		if (value == 3) {
			FieldList.DropBox = 'Yes';
			this.setState({
				FieldList: FieldList
			});
		}

		if (value == 5) {
			FieldList.TikTok = 'Yes';
			this.setState({
				FieldList: FieldList
			});
		}

		if (value == 1) {
			FieldList.Youtube = 'Yes';
			this.setState({
				FieldList: FieldList
			});
		}


	}


	setNetwork = () => {
		let app = this;
		this.web3.eth.net.getId(function (err, networkId) {
			console.log("networkId", networkId);

			/*if(networkId !== 80001)
			app.setNav(8)*/

		}
		)

	}

	checkNetworkandAccount = () => {

		const ethereum = window.ethereum;
		let app = this;
		ethereum.on('accountsChanged', (accounts) => {

			// Handle the new accounts, or lack thereof.
			// "accounts" will always be an array, but it can be empty.
			console.log("Account changed", accounts[0])
			let web3 = app.state.web3;
			web3.eth.defaultAccount = accounts[0];
			app.setState({
				account: accounts[0],
				web3: web3
			});
		});

		ethereum.on('chainChanged', (chainId) => {

			// Handle the new chain.
			// Correctly handling chain changes can be complicated.
			// We recommend reloading the page unless you have good reason not to.
			if (parseInt(chainId) != 80001) {
				app.setNav(8);
			}
			if (parseInt(chainId) == 80001) {
				app.setNav('Home');
			}
		});

	}


	setSocial = (social) => {

		console.log("socialNav", social)
		this.setState({
			socialNav: social

		});

	}

	setProposalNav = (nav) => {

		console.log("proposalNav", nav)
		this.setState({
			navProposal: nav

		});

	}

	connectWallet = () => {

		let app = this;

		console.log("Reached wallet", window.ethereum)
		if (window.ethereum) {

			app.state.isWeb3 = true;
			const ethereum = window.ethereum;

			let web3 = new Web3(ethereum);
			this.web3 = web3;

			ethereum.enable().then((accounts) => {
				let account = accounts[0];
				web3.eth.defaultAccount = account;
				console.log(account);

				app.setState({
					account: account,
					web3: this.web3
				});


			})
		}
	}


	connectWC = (web3, account) => {

		let app = this;

		console.log("Reached wallet", web3, account);

		app.state.isWeb3 = true;

		let web3js = new Web3(web3.provider);

		console.log("web3JS", web3js, account);

		web3js.eth.defaultAccount = account;
		app.web3 = web3js;
		app.setState({
			account: account,
			web3: web3js
		});
	}







	componentDidMount() {
		const gapi = window.gapi;
		let app = this
		/*var creatorurl = this.state.server + '/creators';
	   let leaderboardurl = this.state.server + '/leaderboard';

	   fetch(creatorurl, {
		   method: 'GET',
		   mode: 'cors',
		   headers: {
			   'Accept': 'application/json',
			   'Content-Type': 'application/json',
		   }
	   }).then(function (response, error) {
		   if (response) {
			   return response.json();
		   }
		   else {
			   console.log(error);
		   }
	   }).then(function (data) {
		   console.log("Fetched from MongoDB ", data['Creators By Alphabetical order']);
		   let creatorData = data['Creators By Alphabetical order']
		   fetch(leaderboardurl, {
			   method: 'POST',
			   mode: 'cors',
			   headers: {
				   'Accept': 'application/json',
				   'Content-Type': 'application/json',
			   },
			   body: JSON.stringify({})
		   }).then(function (response, error) {
			   if (response) {
				   return response.json();
			   }
			   else {
				   console.log(error);
			   }
		   }).then(function (data) {
			   console.log("Fetched from MongoDB ", data.leaderboard);
			   if (data.leaderboard.length === 0) {
				   console.log('Leaderboard Empty')
			   } else {
				   let lbData = data['leaderboard']
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
					   if (mapArray[tokName] === undefined) {
						   mapArray[tokName] = {
							   "index": counter,
							   "tradeVolume": currentTradeVolume
						   }
						   counter++
						   let slicedCurrentVolume = null
						   if (currentTradeVolume.toString().length > 8) { slicedCurrentVolume = currentTradeVolume.toString().slice(0, 8) }
						   else { slicedCurrentVolume = currentTradeVolume }
						   let card = <LbIndividualCard
							   profilepic={
								   <figure className="image">
									   <img className="is-rounded" src={cProfilePic} />
								   </figure>
							   }
							   creatorname={cName}
							   tokensymbol={ele["DAOdetails"][0]['tokenSymbol']}
							   tradevolume={slicedCurrentVolume}
							   // creatorbutton={{
							   //     onClick: async () => {
							   //         console.log('tsym', ele["DAOdetails"][0]["tokenSymbol"])
							   //         let obj = await creatorData.find(o => o.tokensymbol === ele["DAOdetails"][0]["tokenSymbol"])
							   //         getCreatorProfile(obj.creatorName, obj.tokenSymbol, obj.tokenName, obj.contentType, obj.daoaddress, obj.profilePhoto)
							   //     }
							   // }}
						   />
						   tempArray.push(card)
						   app.setState({
							   leaderboardData: tempArray
						   });
					   } else {
						   let arrIndex = mapArray[tokName]["index"]
						   let card = <LbIndividualCard
							   profilepic={
								   <figure className="image">
									   <img className="is-rounded" src={cProfilePic} />
								   </figure>
							   }
							   creatorname={cName}
							   tokensymbol={ele["DAOdetails"][0]["tokenSymbol"]}
							   tradevolume={currentTradeVolume + mapArray[tokName]["tradeVolume"]}
							   // creatorbutton={{
							   //     onClick: async () => {
							   //         console.log('tsym', ele["DAOdetails"][0]["tokenSymbol"])
							   //         let obj = await creatorsData.find(o => o.tokensymbol === ele["DAOdetails"][0]["tokenSymbol"])
							   //         console.log('obj', obj)
							   //         getCreatorProfile(obj.creatorName, obj.tokenSymbol, obj.tokenName, obj.contentType, obj.daoaddress, obj.profilePhoto)
							   //     }
							   // }}
						   />
						   tempArray[arrIndex] = card
						   app.setState({
							   leaderboardData: tempArray
						   });
						   console.log('LD',app.state.leaderboardData)
					   }
				   })
			   }
		   })
	   })
   */
	}


	render() {

		return (

			<div className="bg-img">

				<Container onInputChangeUpdateField={this.onInputChangeUpdateField}
					FileonChangeHandler={this.FileonChangeHandler}
					onPasswordChangeUpdateField={this.onPasswordChangeUpdateField}
					onChangeHandler={this.onChangeHandler}
					onChangeHandlerDir={this.onChangeHandlerDir}
					navToken={this.state.navToken}
					fields={this.state.fields}
					passwords={this.state.passwords}
					disabled={this.state.disabled}
					Fname={this.state.Fname}
					Dirname={this.state.Dirname}
					setNav={this.setNav}
					setField={this.setField}
					setSocialCard={this.setSocialCard}
					setWallet={this.setWallet}
					connectWallet={this.connectWallet}
					FieldList={this.state.FieldList}
					Secure={this.Secure}
					getBalance={this.getBalance}
					txStatus={this.state.txStatus}
					verStatus={this.state.verStatus}
					numrows={this.state.numrows}
					addFields={this.addFields}
					removeFields={this.removeFields}
					resetForm={this.resetForm}
					createWallet={this.createWallet}
					decrypt={this.decrypt}
					setDAuth={this.setDAuth}
					isWeb3={this.state.isWeb3}
					account={this.state.account}
					wallets={this.state.wallets}
					walletOne={this.state.walletOne}
					transferWallet={this.transferWallet}
					transferNominee={this.transferNominee}
					changeNominee={this.changeNominee}
					nominee={this.state.nominee}
					socialIDs={this.state.socialIDs}
					setSocial={this.setSocial}
					ipfsUpload={this.ipfsUpload}
					socialNav={this.state.socialNav}
					DAOcontract={this.state.DAOcontract}
					setDAO={this.setDAO}
					balance={this.state.balance}
					cap={this.state.cap}
					totalSupply={this.state.totalSupply}
					tokenname={this.state.tokenname}
					tokensymbol={this.state.tokensymbol}
					increaseTokenCap={this.increaseTokenCap}
					ipfsNFT={this.ipfsNFT}
					newProposal={this.newProposal}
					activeProposals={this.state.activeProposals}
					closedProposals={this.state.closedProposals}
					briefProposals={this.state.briefProposals}
					Proposal={this.state.Proposal}
					viewactiveProposal={this.viewactiveProposal}
					viewclosedProposal={this.viewclosedProposal}
					voteProposal={this.voteProposal}
					navProposal={this.state.navProposal}
					setProposalNav={this.setProposalNav}
					ipfsNews={this.ipfsNews}
					DAOlist={this.state.DAOlist}
					setDAOlist={this.setDAOlist}
					ProposalID={this.state.ProposalID}
					position={this.state.position}
					voter={this.state.voter}
					txHash={this.state.txHash}
					profilePhoto={this.state.profilePhoto}
					sendToken={this.sendToken}
					sendTxn={this.state.sendTxn}
					charmBalance={this.state.charmBalance}
					createtokenandDAO={this.createtokenandDAO}
					leaderboardData={this.state.leaderboardData}
					connectWC={this.connectWC}
				/>
			</div>
		)


	}

}

export default App;
