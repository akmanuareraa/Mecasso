import React, { useEffect } from 'react';
import InputField from './InputField';
import InstallMetamask from './InstallMetamask';



function RewardsMgmt(props) {

	
	
	return (
        
				
				<div className = "box">
				<br></br><br></br>
				
				<div className = "column is-6 is-offset-2">
				
                <h1 class="title is-1">Community Rewards Management</h1>
				
				<br></br>

                <h5 class="title is-6 ">
		                Allow Liquidity Mining of Community Pool?
				</h5>	  

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="liquiditymining" placeholder="Use radio button here"/>
				
                <h5 class="title is-6 ">
		                Reward sharing percentage
				</h5>	  

                 <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="liquiditymining" placeholder="%age rewards shared"/>
			
            							
				<div className = "column is-4 is-offset-4">
						<div className = "columns">        
						
                        <div className = "column">
						<a className="button is-success " 
                            onClick={() => props.NewProposal()}>
                           Submit News</a>
                        </div>   
                        
						<div className = "column">
							<a className="button is-danger  " 
                            onClick={() => props.resetForm()}>
                           Reset</a>
						</div>      
						 
                         </div>
				</div>
				</div>			
				</div>
		
    )
			}

			





export default RewardsMgmt;
