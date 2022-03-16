import React, { Component } from 'react';
import Nav from './Nav';
import SocialCard from './SocialCard';
import ViewWallet from './ViewWallet';
import Wallet from './Wallet';
import CreateWallet from './CreateWallet';
import TransferWallet from './TransferWallet';
//import TransferNominee from './TransferNominee';
//import changeNominee from './changeNominee';
import HomePage from './HomePage';
import LoadandEndScreen from './LoadandEndScreen';
import TransferLoadScreen from './TransferLoadScreen';
import ChangeNominee from './changeNominee';
import ChangePolygon from './changePolygon';
import CreateDAO from './CreateDAO';
import ManageDAO from './ManageDAO';
import IncreaseCap from './IncreaseCap';
import PostNews from './PostNews';
import MintNFT from './MintNFT';
import CreateNewProposal from './createNewProposal';
import ViewProposal from './ViewProposal';
import ViewAllProposals from './ViewAllProposals';
import SendSocTok from './SendSocTok';
//import BuySocTok from "./BuySocTok";

//import RewardsMgmt from './RewardsMgmt';

class Container extends Component {

	
    render(){
		
		console.log("navToken",this.props.navToken);
		console.log("DAOlist",this.props.DAOlist)
        return (
			
            <section className="container renai">
				
                <nav className="panel">

                            <Nav setNav = {this.props.setNav}
							     navToken = {this.props.navToken}
									connectWallet={this.props.connectWallet}
									isWeb3 = {this.props.isWeb3}
									account = {this.props.account}/>
          
                            {
								this.props.navToken == 19? 
								<div>
								<PostNews
								onInputChangeUpdateField={this.props.onInputChangeUpdateField}
								FileonChangeHandler = {this.props.FileonChangeHandler}
								fields={this.props.fields}
								ipfsNews={this.props.ipfsNews}
								resetForm = {this.props.resetForm}
								Fname={this.props.Fname}
							     />	
								</div>:
								this.props.navToken == 18? 
								<div>
								<ViewAllProposals
								activeProposals={this.props.activeProposals}
								closedProposals={this.props.closedProposals}
								viewactiveProposal={this.props.viewactiveProposal}
								viewclosedProposal={this.props.viewclosedProposal}
								navProposal={this.props.navProposal}
								setProposalNav={this.props.setProposalNav}
							     />	
								</div>:
								this.props.navToken == 17? 
								<div>
								<SendSocTok 	
								tokensymbol={this.props.tokensymbol}	
								onInputChangeUpdateField={this.props.onInputChangeUpdateField}
								fields={this.props.fields}	
								sendToken = {this.props.sendToken}
								sendTxn = {this.props.sendTxn}
								txHash = {this.props.txHash}
								setNav = {this.props.setNav}
							     />	

								</div>:
								
								this.props.navToken == 15? 
								<div>
								<ViewProposal 	
								Proposal = {this.props.Proposal}	
								voteProposal={this.props.voteProposal}
							     />	
								</div>:
								this.props.navToken == 13 || this.props.navToken == 14?
								<div>
								<CreateNewProposal 	
								isWeb3 = {this.props.isWeb3}	
								onInputChangeUpdateField={this.props.onInputChangeUpdateField}
								fields={this.props.fields}
								newProposal={this.props.newProposal}
								tokenname={this.props.tokenname}
								tokensymbol={this.props.tokensymbol}
							     />	
								</div> :this.props.navToken == 12?
								<div>
								<MintNFT 	
								onInputChangeUpdateField={this.props.onInputChangeUpdateField}
								FileonChangeHandler = {this.props.FileonChangeHandler}
								fields={this.props.fields}
								Fname={this.props.Fname}
								cap={this.props.cap}
								totalSupply={this.props.totalSupply}
								tokenname={this.props.tokenname}
								tokensymbol={this.props.tokensymbol}
								ipfsNFT={this.props.ipfsNFT}
							     />	
								</div> :this.props.navToken == 11?
								<div>
								<IncreaseCap 	
								onInputChangeUpdateField={this.props.onInputChangeUpdateField}
								fields={this.props.fields}
								cap={this.props.cap}
								totalSupply={this.props.totalSupply}
								tokenname={this.props.tokenname}
								tokensymbol={this.props.tokensymbol}
								increaseTokenCap={this.props.increaseTokenCap}
							     />	
								</div> :this.props.navToken == 10?
								<div>
								<ManageDAO
								setNav = {this.props.setNav}
								DAOcontract = {this.props.DAOcontract}
								DAOlist = {this.props.DAOlist}
								balance={this.props.balance}
								setDAO = {this.props.setDAO} 	
								isWeb3 = {this.props.isWeb3}
								tokensymbol={this.props.tokensymbol}	
								onInputChangeUpdateField={this.props.onInputChangeUpdateField}
								fields={this.props.fields}
								briefProposals={this.props.briefProposals}
								viewactiveProposal={this.props.viewactiveProposal}
								setDAOlist={this.props.setDAOlist}
								profilePhoto={this.props.profilePhoto}
								charmBalance={this.props.charmBalance}
								cap={this.props.cap}
								totalSupply={this.props.totalSupply}
				                                connectWC = {this.props.connectWC}
							     />	
								</div>:this.props.navToken == '1b'?
								<div>
								<CreateDAO 	
								isWeb3 = {this.props.isWeb3}	
								onInputChangeUpdateField={this.props.onInputChangeUpdateField}
								fields={this.props.fields}
								socialIDs={this.props.socialIDs}
								ipfsUpload={this.props.ipfsUpload}
								createtokenandDAO={this.props.createtokenandDAO}
							     />	
								</div> :this.props.navToken == 8?
								<div>
								<ChangePolygon 		
							     />	
								</div> :this.props.navToken == '7a'?
								<div>
								<ChangeNominee 		
								walletOne={this.props.walletOne}  
								nominee={this.props.nominee}
								changeNominee={this.props.changeNominee}
								fields={this.props.fields}
								resetForm = {this.props.resetForm}	
							    onInputChangeUpdateField={this.props.onInputChangeUpdateField}
							     />	
								</div> :
								this.props.navToken == '5a' || this.props.navToken == '5b' ?							
								<div>
								<TransferLoadScreen
							    navToken={this.props.navToken}
								/>
								</div> :
								
								this.props.navToken == 5 ?							
								<div>
								<TransferWallet
							   setNav = {this.props.setNav}
							   fields={this.props.fields}
							   resetForm = {this.props.resetForm}	
							   onInputChangeUpdateField={this.props.onInputChangeUpdateField}	
							   transferWallet={this.props.transferWallet}
							   						   
								/>
								</div> :
		
								this.props.navToken == 3 || this.props.navToken == '3a'?
                                    <div>
									<Wallet 		
									walletOne={this.props.walletOne}  
									fields={this.props.fields}
									transferNominee={this.props.transferNominee}
									setNav = {this.props.setNav}
									navToken={this.props.navToken}/>	
									</div> :
		
									this.props.navToken == '2a' || this.props.navToken == '2b' || this.props.navToken == '2c'|| this.props.navToken == '2d' || this.props.navToken == '10a' || this.props.navToken == '15a' || this.props.navToken == '19a'?							
									<div>
									<LoadandEndScreen
	   								navToken={this.props.navToken}
									setNav = {this.props.setNav}
									DAOcontract = {this.props.DAOcontract}  
									ProposalID = {this.props.ProposalID}
								    txHash={this.props.txHash}
									position={this.props.position}
							   	    voter={this.props.voter}
	   								/>
									</div> :

									this.props.navToken == 2 || this.props.navToken == 4 || this.props.navToken == 7?							
                                    <div>
									<ViewWallet
									navToken={this.props.navToken}
								   wallets={this.props.wallets}
								   setWallet={this.props.setWallet}
								   />
									</div> :
								this.props.navToken == '1a' ?
								<div>	
								<SocialCard 	
								socialIDs={this.props.socialIDs}
								setNav = {this.props.setNav}
								setSocial={this.props.setSocial}
								socialNav={this.props.socialNav}
							     />
								 </div>:
								this.props.navToken == 1 ?							
                                    <div>
									<CreateWallet
								   setNav = {this.props.setNav}
								   setField = {this.props.setField}
								   setSocialCard = {this.props.setSocialCard}
								   setDAuth = {this.props.setDAuth}
								   resetForm = {this.props.resetForm}	
								   FieldList={this.props.FieldList}
								   createWallet={this.props.createWallet} 				
								   onInputChangeUpdateField={this.props.onInputChangeUpdateField}
								   onPasswordChangeUpdateField={this.props.onPasswordChangeUpdateField}							   
								   fields={this.props.fields}
								   passwords={this.props.passwords}								   
								   setDAuth={this.props.setDAuth}
								   isWeb3 = {this.props.isWeb3}
								   disabled = {this.props.disabled}
				                                   connectWC = {this.props.connectWC}
									/>
									</div> :
																
                                    <div>
									<HomePage  
									 isWeb3 = {this.props.isWeb3}
									 setNav = {this.props.setNav}
				                                        
									 leaderboardData={this.props.leaderboardData}
									 />
									</div>
                                
                            }	
                         
				</nav>				
				
            </section>
        )
    }
}

export default Container;
