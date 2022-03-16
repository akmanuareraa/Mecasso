import React from 'react';
import background from "../img/background.png";
import InputField from './InputField';


function Wallet(props) {


console.log("walletOne Reached here",props.walletOne);

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
				<h5 className="title is-5 has-text-light"><a>Token ID:</a> {props.walletOne.tokenID}</h5>
				<h5 className="title is-5 has-text-light"><a>Mapped Social IDs:</a></h5>
				
				{
                        props.walletOne.SocialIDs.map((ID,index) => {
                            return (
								
				<h5 className="title is-5 has-text-light"> {ID.social} ID :  {ID.ID}</h5>

							)
							})       
				
				}
				{
				props.navToken == '3a'?
		        <div> 
				<h5 className="title is-5 has-text-light" ><a>Raw Wallet Data:</a></h5>
				<h6 className="title is-6 has-text-light" > {rawWalletData}</h6>	
				</div>:
				<div> 
				<h5 className="title is-5 has-text-light" ><a onClick={() => showRawData()}>Click to see Raw Wallet Data</a></h5>
				</div>
				}
		<br></br>
		<br></br>
		<div className="column is-6 is-offset-3">
		<div className="columns">
                 <div className="column">
                    <a className="button is-success" 
                            onClick={() => props.setNav(5)}>
                           Transfer Wallet</a> 
				</div>
				<div className="column">	
					<a className="button is-warning" 
                            onClick={() => props.transferNominee()}>
                           Transfer to Nominee</a>
					</div>
					<div className="column">
					<a className="button is-danger" 
                            onClick={() => props.setNav('7a')}>
                           Change Nominee</a>
					</div>
					</div>
					</div>			   
					
			 </div>
	         </div>
	         </div>
	         <br></br>
		<br></br><br></br>
		<br></br><br></br>
		<br></br><br></br>
		<br></br>
	  </div>
	)
	
	}
	
        

export default Wallet;


		



