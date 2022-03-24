import React, { useEffect } from 'react';
import InputField from './InputField';




function CreateNewProposal(props) {

	
	
	return (
        
        <div className="column is-8 is-offset-2">
		<br></br><br></br>    
		<div className = "bg-box renaiform">
		<br></br><br></br>
				
				<div className = "column is-10 is-offset-1">
				     
                <h1 class="title is-3 is-renai-invert">Create New Proposal</h1>
				
				<br></br>
                   
				<h5 class="title is-6 is-renai-invert">
                <b>
		                Token Name : &nbsp;
				</b>	  
                {props.tokenname}
                </h5>

                
                <h5 class="title is-6 is-renai-invert">
                <b>
		                Token Symbol : &nbsp;
                </b>	  
                {props.tokensymbol}
                </h5>

                
                
                
                <h5 class="title is-6 is-renai-invert">
		                Enter Proposal Heading
				</h5>


                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="heading" placeholder="Text heading for proposal "/>

                <br></br><br></br> 

                <h5 class="title is-6 is-renai-invert">
		                Enter Proposal Description
				</h5>

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="description" placeholder="Text description for proposal"/>
                
                <br></br><br></br>
                
                <h5 class="title is-6 is-renai-invert">
		                Enter Proposal Debate Period ( Max 7 days)
				</h5>

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="debateperiod" placeholder="Debate Period "/>
                
                <br></br><br></br>

                <h5 class="title is-6 is-renai-invert">
		                Enter Proposal Deposit Amount
				</h5>

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="deposit" placeholder="Proposal Deposit"/>
                
                <br></br><br></br>

                <h5 class="title is-6 is-renai-invert">
		                Enter Proposal Beneficiary (Recipient) Address
				</h5>

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="recipient" placeholder="0x0000000000000000000000000000000000000"/>
                
                <br></br><br></br>

                <h5 class="title is-6 is-renai-invert">
		                Enter Proposed Beneficiary Amount
				</h5>

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="amount" placeholder="Beneficiary amount"/>
                
                <br></br>
                </div>

                <div className = "column is-4 is-offset-4">
                    
                    <div className = "columns">
                        <div className = "column">
						<a className="button is-renai " 
                            onClick={() => props.newProposal()}>
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

			





export default CreateNewProposal;
