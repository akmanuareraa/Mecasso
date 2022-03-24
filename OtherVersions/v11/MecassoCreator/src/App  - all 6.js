import React, { Component } from 'react';
import Web3 from 'web3'
import Container from './Components/Container';
import background from "./img/background.png";
import newabi from './myneabi.js';




class App extends Component {
    constructor(){
        super();

                 this.onInputChangeUpdateField = this.onInputChangeUpdateField.bind(this);

        this.state = {
            		navToken: null,
			server: 'localhost:5000',
			numrows: 1,
			isWeb3: false,
            fields: {
                            		
                    },
            contractAddress: "0xb6188750E94dD0905A3dC0834e4C90A45C81637D",   
            wallets: [],  
            FieldList: {
                            
			
                    }        
                     
		              };
		}
  
    		
	
    onInputChangeUpdateField = (name,value) => {
        let fields = this.state.fields;

        fields[name] = value;

        this.setState({
            fields
        });
		
    };

	setNav = (value) => {
	
		this.resetApp();
		
		this.setState({
            navToken:value,
        });
        
        
        //Load tokens before displaying wallet.
        
        
        if(value == 2)
        {
        
       this.getBalance()
	}
			
	}
	

	
	
	createWallet = () => {
	
	let app = this;	
  
  
  
      var url = 'http://'+this.state.server+'/createWallet';
  
      console.log("Fields",app.state.fields);
      fetch(url, {
  
    	method: 'POST',
    
   	 headers: {
			'Accept': 'application/json',
			'Content-Type':'application/json',
		      },	
    	body: JSON.stringify({
			     wallet : app.state.fields	    		    	
    			     })	
	}).then(function(response,error) {
		
		if(response)
		{
			console.log(response);
			return response.json();
		}
		else 
		{
			console.log(error);
		}
		}).then(function(data) {
		console.log("Reached Amadeus");
		console.log(data)
		
		app.setState({
            wallet: data,
                 });
                 
                 app.ipfsUpload()
		});
  }
  


	transferWallet = () => {    
        
        
        			let app = this;	
				var ABI = JSON.parse(newabi);
				
				
				 var contract = new app.web3.eth.Contract(ABI, app.state.contractAddress);

		var tmparray = [];
                
                tmparray[0] = [app.web3.eth.defaultAccount,10000];
		
		
  		contract.methods
		.transferFromOrMint(
			[
				app.state.tokenID,
				app.state.tokenURI,
				app.state.walletOne.nominee,
				app.state.walletOne.wallet.id,
				tmparray,
				[],
				['0x0000000000000000000000000000000000000000']
			],
			app.web3.eth.defaultAccount,
			app.state.fields.receiver)
		.send({from: app.state.account}).then(function(response,err){
					
					if(response) {
                        			 console.log(response);			
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
		.balanceOf(app.web3.eth.defaultAccount)
		.call({from: app.web3.eth.defaultAccount}).then(function(response,err){
					
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
								
								
				
				
				
				
				
				
				
				
				
				
				
								
								
				setTokenID = (balance,contract) => 	  	 						{  				
								
					let app = this;
					var index = balance-1;
					var tokenID;
					var tokenURI;
					var wallets = [];

					while(index >= 4)  //Added 4 for testing. Should be zero. Remove
					{ 
					var tmp = index;
					contract.methods
		.tokenOfOwnerByIndex(app.web3.eth.defaultAccount,index)
		.call({from: app.web3.eth.defaultAccount}).then(function(response,err){
					
					if(response) {
					
					
					tokenID = response;
					contract.methods
		.tokenURI(tokenID)
		.call({from: app.web3.eth.defaultAccount}).then(function(response,err){
					
                        			 if(response) {
                        			 
                        			
                        			
                        			var url = 'http://127.0.0.1:8080/ipfs/'+response;
		
						console.log("url",url);
		
		//Fetching IPFS file and reading data
		fetch(url,{mode: 'cors'}).
	then(function(response,error) {
                        			 console.log("file",response);
                        			 return response.json();                    
                        			 }).
                        			 then(function(data){
                        			 
                        			 var walletData = data.wallet;
                        			 
                        			 console.log("walletdata",data.wallet.id);
                        			 
                        			 wallets.push(data.wallet);
                        			 
                        			 app.setState({	
							wallets,
							tokenID : 
							tokenID,
							tokenURI:
							tokenURI
        						});	 
                 						
                        			 });
                        			 
                        			 }
                        		   else	{
                						console.log(err);
							}
								
					  })
					  }	     
 				           else	{
                						console.log(err);
							}
					  
					  })
				
					  index--;
					  }
					 
				   					   
  					  }
  			
  	decrypt = () => {
  	
  	
  	
  	var url = 'http://'+this.state.server+'/decryptWallet';
    	
    	let app = this;

  	fetch(url, {
  
 		   method: 'POST',
    
 		   headers: {
			'Accept': 'application/json',
			'Content-Type':'application/json',
		      },	
    
 	   body: JSON.stringify({
				wallet: this.state.walletOne,
				password: this.state.fields.password				
				})

    }).then(function(response,error) {
	
  		if(response)
		{
			return response.json();
		}
		else 
		{
			console.log(error);
		}
  	}).then(function(data) {
  	
  			console.log(data);
  			
  			var wallet = app.state.walletOne;
  			console.log("decryptedOrg",data.walletData);
  			wallet.decryptedText = data.walletData; 
  			
  			console.log("decryptedText",wallet.decryptedText);
  			
  			app.setState({	
					walletOne : wallet	
        						});
  	});
  	}
  			
  					  
  	setWallet = (index) => {
  	
  	var walletOne = this.state.wallets[index];
  	
  	                        			this.setState({	
							walletOne
        						});
        						
        						this.setNav(3);	
        						
        			}
  					  
  					
	ipfsUpload = () => {
  
  
  		let app = this;
  		
  		const filedata = new FormData();
               var payload = JSON.stringify(this.state.wallet);
 		filedata.append('wallet',payload);
  		console.log("Reached IPFS");
              fetch('http://localhost:5001/api/v0/add', {method: 'POST', body: filedata, mode: 'cors' }).
	then(function(response,error) {
	
  		if(response)
		{
			return response.json();
		}
		else 
		{
			console.log(error);
		}
		}).then(function(data){
			console.log(data);
        		app.setState({	
					ipfsID: data.Hash
        			});
  			
  			console.log("IPFS hash",app.state.ipfsID);
  			app.mintMyne();
  			})
  			
  			}
  			



  			
  		mintMyne = () => {
  		
  		let app = this;
  		
  		console.log("Account",app.web3.eth.defaultAccount);
   var url = 'http://'+this.state.server+'/getnewTokenID';
    
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
		
		
  		contract.methods
		.transferFromOrMint(
			[
				app.state.tokenID,
				app.state.ipfsID,
				app.state.fields.nominee,
				app.state.wallet.wallet.id,
				tmparray,
				[],
				['0x0000000000000000000000000000000000000000']
			],
			'0x0000000000000000000000000000000000000000',
			app.web3.eth.defaultAccount)
		.send({from: app.state.account}).then(function(response,err){
					
					if(response) {
                        			 console.log(response);			
 						     }
 				           else	{
                					console.log(err);
            					}
		
		
						})						
   })
   }
   
  		
  
  
	
	resetForm = () => {
	
	var FieldList =  {                            
                	    }
                	    
        this.setState({
           	 FieldList : FieldList
       		 });        	    
	
	}
	
	 
	
	setField = (value) => {
		
		var FieldList = this.state.FieldList;
		
		if(value == 1)
		
		{
		FieldList.FB = 'Yes';
		this.setState({
           	 FieldList : FieldList
       		 });
       	}
       	
       	if(value == 2)
		
		{
		FieldList.Insta = 'Yes';
		this.setState({
           	 FieldList : FieldList
       		 });		
       	}
       	
       	if(value == 3)
		
		{
		FieldList.YouTube = 'Yes';
		this.setState({
           	 FieldList : FieldList
       		 });	
       	}
       	
       	if(value == 4)
		{
		FieldList.DropBox = 'Yes';
		this.setState({
           	 FieldList : FieldList
       		 });	
       	}
       	
       	if(value == 5)
		{
		FieldList.TikTok = 'Yes';
		this.setState({
           	 FieldList : FieldList
       		 });	
       	}	 
		
		if(value == 6)
		{
		FieldList.Google = 'Yes';
		this.setState({
           	 FieldList : FieldList
       		 });	
       	}	 
		
			
	}



		


		
resetApp = () => {
	this.setState({
		fields: {
				
				       },
		
		File: null,
		Fname: null,
		txID: null,
		txStatus: null,
		verStatus: null,
		Dir:  null,
		Dirname: null
	});
}

	

	
	
	
    async componentDidMount(){
	
			let app = this;
			
			
			
		  

			if (window.ethereum) {
        			
        			app.state.isWeb3 = true;
        			const ethereum = window.ethereum;
       			let web3 = new Web3(ethereum);
       			this.web3 = web3;
				
				ethereum.enable().then((accounts) => {
					let account = accounts[0];
		 			web3.eth.defaultAccount = account ;
		 			console.log ( account);
		 			app.setState({
            				account : account,
            				web3 : this.web3
        				});	
        				
        				
		
			})						   
						   
			}	
	
			}
						   
						   
    render() 
        {
       
                return (
                
                    <div style={{ backgroundImage: `url(${background})`, 
                    		   backgroundSize: 'cover'}}>
                        
                        <Container onInputChangeUpdateField={this.onInputChangeUpdateField}
								   			onChangeHandler={this.onChangeHandler}								     onChangeHandlerDir={this.onChangeHandlerDir}
                                   navToken={this.state.navToken}
								   fields={this.state.fields}
								   Fname={this.state.Fname}
								   Dirname={this.state.Dirname}
								   setNav={this.setNav}
								   setField={this.setField}
								   setWallet={this.setWallet}
								   FieldList={this.state.FieldList}
								   Secure={this.Secure}
								   getBalance={this.getBalance}
								   SecureDir={this.SecureDir}
								   Verify={this.Verify}
								   VerifyDir={this.VerifyDir}
								   txID={this.state.txID}
								   txStatus={this.state.txStatus}
								   verStatus={this.state.verStatus}
								   numrows={this.state.numrows}
								   addFields={this.addFields}
								   removeFields={this.removeFields}
								   resetForm={this.resetForm}
								   createWallet={this.createWallet}
								   decrypt={this.decrypt}
								   isWeb3={this.state.isWeb3}
								   wallets={this.state.wallets}
								   walletOne={this.state.walletOne}
					   		          transferWallet={this.transferWallet}
								   
								   
                                   />
                    </div>
                )
            
       
    }
    
}

export default App;
