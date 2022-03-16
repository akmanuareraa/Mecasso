import React from 'react';
import background from "../img/background.png";
import InputField from './InputField';


function Wallet(props) {


console.log("wallet Reached here",props.walletOne);

var rawWalletData = JSON.stringify(props.walletOne)

const showRawData = () =>
{	
	props.setNav('3a');
}	
	 
        return (
            <div className = "box" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
		<br></br>
		<br></br><br></br><br></br><br></br>
		 
		
		<div className="panel" >
		<div className="panel-block" >		
                
				<div className="column">
                
                <h5 className="title is-5 has-text-light"><a>ID:</a> {props.walletOne.id}</h5>            				
				<h5 className="title is-5 has-text-light"><a>Version:</a> {props.walletOne.version}</h5>	
				<h5 className="title is-5 has-text-light"><a>Wallet Owner:</a> {props.walletOne.owner}</h5>
				<h5 className="title is-5 has-text-light"><a>Timestamp:</a> {props.walletOne.timestamp}</h5>
				<h5 className="title is-5 has-text-light"><a>Mapped Social IDs:</a></h5>
				
				{
                        props.walletOne.SocialIDs.map((ID,index) => {
                            return (
								
				<h5 className="title is-5 has-text-light"> {ID.social} ID:  {ID.email}</h5>
							)
							})       
				
				}
				{
				props.navToken == '3a'?
		        <div> 
				<h5 className="title is-5 has-text-light" ><a>Raw Wallet Data:</a> {rawWalletData}</h5>	
				</div>:
				<div> 
				<h5 className="title is-5 has-text-light" ><a onClick={() => showRawData()}>Click to see Raw Wallet Data</a></h5>
				</div>
				}
		<br></br>
		
		{
		props.walletOne.decryptedText?
		<div>
		<h5 className="title is-5 has-text-light"> <a>Decrypted Data:</a><br></br> {props.walletOne.decryptedText}</h5>
		</div>:
		
		<div className="column is-5">
		<span class="tag is-large is-white">Enter password to decrypt</span><br></br><br></br>
		
		<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="password" placeholder=" Enter Password to Decrypt"/>
	         	         <a className="button is-warning is-large " 
                            onClick={() => props.decrypt()}>
                           Decrypt</a><br></br><br></br>
                           
                           
                           </div>
                           
                 }
                 
                    <a className="button is-danger is-large " 
                            onClick={() => props.TransferWallet()}>
                           Transfer Wallet</a>          
		 </div>
	         </div>
	         </div>
	         <br></br>
		<br></br><br></br><br></br><br></br>
	  </div>
	)
	
	}
	
        

export default Wallet;


		



