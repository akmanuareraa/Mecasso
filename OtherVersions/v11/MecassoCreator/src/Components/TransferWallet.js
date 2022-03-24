import React, { useEffect } from 'react';
import InputField from './InputField';
import background from "../img/background.png";


function TransferWallet(props) {

    
	
	return (
        
				
				<div className = "box" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
				<br></br><br></br>
								
				
				<div className = "column is-4 is-offset-4 has-text-centered">
				<br></br><br></br>
	

				<h4 className="title is-3 has-text-light">Enter Transfer Details  </h4>:
                           
                        <h5 class="title is-6 has-text-light">
		                Enter Receiver's Ethereum Address
					   </h5>
					       
                        <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="receiver" placeholder="Receiver Address"/>
                        <br></br><br></br>

						<h5 class="title is-6 has-text-light">
		                Receiver's Nominee Ethereum Address (Optional)
					   </h5>
					       
                        <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="receivernominee" placeholder="Receiver's Nominee Address"/>
                        <br></br><br></br>
					
					

						<div className = "columns">        
                        
						<div className = "column">
						<a className="button is-warning is-large " 
                            onClick={() => props.transferWallet()}>
                           Submit</a>
                        </div>   
                        
						<div className = "column">
							<a className="button is-danger is-large " 
                            onClick={() => props.resetForm()}>
                           Reset</a>
						</div>      
						
						</div>

						</div>
                        	    
							
				<br></br><br></br><br></br><br></br>
		
		

		<br></br>
		
		

		
		
		<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
		</div>
		
    )
}




export default TransferWallet;
