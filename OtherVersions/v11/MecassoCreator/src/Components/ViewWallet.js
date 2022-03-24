import React from 'react';
import background from "../img/background.png";

function ViewWallet(props) {
    
		
	console.log(props.wallets);	
	
	return (
        
				<div className = "box" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
				<br></br><br></br>
				<div className = "column has-text-centered">
				{
				 props.navToken == 4?	
				<h4 className="title is-3 has-text-light">Select Wallet to Transfer </h4>:
				props.navToken == 7?	
				<h4 className="title is-3 has-text-light">Select Wallet to Change Nominee </h4>:	
				<h4 className="title is-3 has-text-light">Select Wallet to Display </h4>
				}
				<br></br><br></br>
					<div className="columns is-multiline">
                    {
						
                        props.wallets.map((wallet,index) => {

							var temp = index;
                         
							return (
							<div key={index} className="column">	
							
				
							<h4 className="title is-4 has-text-light">Wallet {props.wallets.length-index}: </h4>
				
							<a className="button is-warning" onClick={() => props.setWallet(temp)} >
							<b>ID:</b> {wallet.id}</a>
								
							</div>
				               
                            )			
						})
		         	}
		        	</div>
		<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>	
		</div>
		</div>
		
    )
}

export default ViewWallet;
