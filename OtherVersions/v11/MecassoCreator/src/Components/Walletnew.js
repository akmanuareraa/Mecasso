import React from 'react';
import InputField from './InputField';
import TextField from './TextField';

function Wallet(props) {


//console.log(props.tokens[0]);
	
	const urlIPFS = 'https://ipfs.io/';
	 
        return (
            <div className = "box" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
				
                <div className="column has-text-centered">
                    				
		<h5 className="title is-5 has-text-light">{props.walletOne}</h5>	
		         		
	         </div>
	  </div>
	)
	
	}
	
        

export default Wallet;


		



