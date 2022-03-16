import React from 'react';
import background from "../img/background.png";

function TransferLoadScreen(props) {
    
    console.log(props.navToken)
	return (
        
				<div className = "box" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
				<br></br><br></br>
				{

                props.navToken == '5a' ?
                <div className = "column is-4 is-offset-4 has-text-centered">
				<h4 className="title is-3 has-text-light">Myne Wallet Transfer !!</h4>
                <figure className="image is-inline-block" >
  		        <img src={'icons/transfer.gif'} width="10px" length="10px"/> 
		        </figure>
		        </div>:

				<div className = "column is-4 is-offset-4 has-text-centered">
				<h4 className="title is-3 has-text-light">Successfully Transferred </h4>
                <figure className="image is-inline-block" >
  		        <img src={'icons/transfersuccess.gif'} width="20px" length="20px"/> 
		        </figure>
		        </div>                    
                                    
                }
		         	
		        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>	
		        </div>
		
		
    )
}

export default TransferLoadScreen;
