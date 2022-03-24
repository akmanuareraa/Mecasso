import React from 'react';
import background from "../img/background.png";
import InputField from './InputField';


function ChangeNominee(props) {


var rawWalletData = JSON.stringify(props.walletOne)
console.log("Reached changeNominee");

	 
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
				<h5 className="title is-5 has-text-light"><a>Current Nominee Address:</a> {props.nominee}</h5>
				
				<h5 className="title is-5 has-text-light"><a>Enter New Nominee Address:</a> </h5>

				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="newnominee" placeholder="Nominee Address"/>
                        <br></br><br></br>
		        
				
				
				
		<br></br>
		<br></br>
		<div className="column is-6 is-offset-3">
		<div className = "columns">        
                        
						<div className = "column">
						<a className="button is-warning is-large " 
                            onClick={() => props.changeNominee()}>
                           Submit</a>
                        </div>   
                        
						<div className = "column">
							<a className="button is-danger is-large " 
                            onClick={() => props.resetForm()}>
                           Reset</a>
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
	
        

export default ChangeNominee;


		



