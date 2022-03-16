import React, { useEffect } from 'react';
import InputField from './InputField';
import InstallMetamask from './InstallMetamask';



function NewProposal(props) {

	let handleChange = e => {
		props.onInputChangeUpdateField('description',e.target.value);
	};
	
	
	return (
        
				
				<div className = "box">
				<br></br><br></br>
				
				<div className = "column is-6 is-offset-2">
				
                <h1 class="title is-1">New Community Proposal</h1>
				
				<br></br>

                <h5 class="title is-6 ">
		                Proposal Short Name
				</h5>	  

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="proposalname" placeholder="Propopsal Name"/>
				
                <h5 class="title is-6 ">
		                Heading
				</h5>	  

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="proposalheading" placeholder="Propopsal Heading"/>

                <h5 class="title is-6 ">
		                Description
				</h5>	
				  
				<textarea class="textarea" onInput={handleChange} placeholder="List Proposal Description / Objectives"></textarea>

                <h5 class="title is-6 ">
		                Voting Period (in Days)
				</h5>

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="proposaldays" placeholder="Voting Period in Days"/>

                
										
				<div className = "column is-4 is-offset-4">
						<div className = "columns">        
						
                        <div className = "column">
						<a className="button is-success " 
                            onClick={() => props.NewProposal()}>
                           Submit Proposal</a>
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

			





export default NewProposal;
