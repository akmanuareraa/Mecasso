import React, { useEffect } from 'react';
import InputField from './InputField';
import Web3 from 'web3'



function IncreaseCap(props) {

    let handleChange = e => {
		props.onInputChangeUpdateField('description',e.target.value);
	};
	
	return (
                
				<div className="column is-8 is-offset-2">
                <br></br><br></br>    
				<div className = "bg-box renaiform">
				<br></br><br></br>
				
				<div className = "column is-offset-1 is-10">
				
                <h1 class="title is-3 is-renai-invert">Increase Token Supply Cap</h1>
				
				<br></br>

				<h5 class="title is-6 is-renai-invert">
                
		                Token Name : &nbsp;
			    	  
                {props.tokenname}
                </h5>

                <br></br>
                <h5 class="title is-6  is-renai-invert">
                
		                Token Symbol : &nbsp;
                	  
                {props.tokensymbol}
                </h5>

                <br></br>
                
                <h5 class="title is-6  is-renai-invert">
                
		                Current Max Cap :- &nbsp;
					  
                {props.cap}
                </h5>

                <br></br>
                
                <h5 class="title is-6  is-renai-invert">
        
		                Current circulation :- &nbsp;
					  
                {props.totalSupply}
                </h5>

                <br></br>

                <h5 class="title is-6  is-renai-invert">
		                Enter New Max Cap
				</h5>


                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="newcap" placeholder="New Max Cap "/>

                <br></br><br></br> 

                <h5 class="title is-6  is-renai-invert">
		                Enter Proposal Description
				</h5>

                <textarea class="textarea is-renai" onInput={handleChange} placeholder="List Proposal Description / Objectives"></textarea>
                
                <br></br>
                
                <h5 class="title is-6  is-renai-invert">
		                Enter Proposal Debate Period ( Max 7 days)
				</h5>

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="debateperiod" placeholder="Debate Period "/>
                
                </div>

                <div className = "column is-4 is-offset-4">
                    
                    <div className = "columns">
                        <div className = "column">
						<a className="button is-renai " 
                            onClick={() => props.increaseTokenCap()}>
                           Submit Proposal</a>
                        </div>   
                        
						<div className = "column">
							<a className="button is-renai-negative  " 
                            onClick={() => props.resetForm()}>
                           Reset</a>
						</div>      
                    </div>
                         
				</div>
        </div>
        </div>
				
		
    )
			
}

			





export default IncreaseCap;
