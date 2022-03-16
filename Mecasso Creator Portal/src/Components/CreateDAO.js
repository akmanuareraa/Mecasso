import React, { useEffect } from 'react';
import InputField from './InputField';
import InstallMetamask from './InstallMetamask';



function CreateDAO(props) {

		console.log(props.socialIDs);

		let handleChange = e => {
			props.onInputChangeUpdateField('description',e.target.value);
		};

		const selecthandleChange = e => {  
			
				props.onInputChangeUpdateField('category',e.target.value);

		    }

		if(props.isWeb3)
		{
    
	
	return (
				
		        <div className = "column is-8 is-offset-2">
				<br></br><br></br><br></br><br></br>	
				<div className = "box bg-box renaiform">
				
				<div className = "column has-text-centered">
				<br></br>
                <h1 class="title is-1 is-renai-invert">Create New Community Token</h1>
				</div>

				<br></br>
				<div className = "column">
                <h5 class="title is-6 is-renai-invert">
		                Enter Token Name
				</h5>	  
                
                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="tokenname" placeholder="Community Name"/>
				
				<br></br><br></br>

				<h5 class="title is-6 is-renai-invert">
		                Enter Community Token Symbol
				</h5>	  
                
                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="tokensymbol" placeholder="Token Symbol"/>
				<br></br><br></br>

				<h5 class="title is-6 is-renai-invert">
		                Fundraising Objectives
				</h5>	  
                
				<textarea class="textarea is-renai" onInput={handleChange} placeholder="List Objectives 1,2,3..etc"></textarea>


				<br></br><br></br>


                <h5 class="title is-6 is-renai-invert">
		                Enter Content Creator Name
				</h5>	  
                
                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="creatorname" placeholder="Creator's Name"/>
				
				<br></br><br></br>
                
				<h5 className="title is-6 is-renai-invert">
		                Linked Social Handles
				</h5>

				{
				
				props.socialIDs.Youtube.channelName?
				
				<div className="is-renai">
				
				<p className="is-white">
					<b>YouTube Channel Name</b> :  {props.socialIDs.Youtube.channelName}

				</p>
				</div>
					:
				<div>None</div>	
				
			    }


				<br></br>	
							
				<h5 class="title is-6 is-renai-invert">
		                Category
				</h5>               
                
				<div className="column">
				<div className="select is-dark"  
                                    onChange={selecthandleChange} default="Art">
                                        <select>
                                            <option>Music</option>
                                            <option>Dance</option>
											<option>Sports</option>
											<option>Gaming</option>
											<option>Skits</option>
											<option>Cooking</option>
                                        </select>

                                 </div>
				</div>
				<br></br><br></br>

                <h5 class="title is-6 is-renai-invert">
		                Initial Supply of Tokens
				</h5>	  

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="initialtokens" placeholder="25000"/>
				<br></br><br></br>

				<h5 class="title is-6 is-renai-invert">
		                Creator's Share
				</h5>	  

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="creatortokens" placeholder="in %age"/>
			
				<br></br><br></br>

                <h5 class="title is-6 is-renai-invert">
		                Launch Price (in MATIC)
				</h5>	  

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="launchprice" placeholder="Launch Price"/>
                </div>

				<br></br>
										
				<div className = "column is-4 is-offset-4">
						<div className = "columns">        
						
                        <div className = "column">
						
						
						<div>	
						<a className="button is-renai " 
                            onClick={() => props.ipfsUpload()}>
                           Launch Token</a>
						</div>  
                        </div>   
                        
						  
						 
                         </div>
				</div>
				</div>			
				</div>		 
	      	
    )
			}

			else
			{
			return(
				<div className ="box" style={{ }}>  

				<div className = "column is-offset-2">
					<InstallMetamask/>
				</div>
                </div>
				)
			}

}




export default CreateDAO;
