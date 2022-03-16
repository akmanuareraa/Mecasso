import React from 'react';
import InputField from './InputField';
import LoopyFields from './LoopyFields';

function VerifyDocument(props) {
    
	
	
	
	return (
        
		<div class="panel-block">
				
				<p>Upload Document To be Verified</p>
		
				<div className="file has-name">
 				 <label className="file-label">
    				
					<input className="file-input" type="file" name="ImageUp" onInput={props.onChangeHandler}/>
    				
					<span className="file-cta">
      					<span className="file-icon">
        						<i className="fas fa-upload"></i>
      					</span>
      					
						<span className="file-label">
        						Select File
      					</span>
  				  	</span>
    				
					<span className="file-name">
      					{props.Fname}
    				</span>
  					
				 </label>				
				</div>
		
		
		<div className="column">
					   <div >	
		                Document ID 
					   </div>
						
					   <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="id" placeholder="Document ID to verify"/>
					    
				
		</div>
		
		<br></br>	    
						
						<label >	
		                Enter Metadata
					   </label>
				<br></br><br></br>
						<LoopyFields onInputChangeUpdateField={props.onInputChangeUpdateField}
                            numrows={props.numrows} fields={props.fields}/>
					<br></br>
					<p className="control">						
					 <a className={"button  is-outlined is-info"}
                           onClick={() => props.addFields()}>
                            + 
                        </a>
						<a className={"button is-outlined is-info"}
                           onClick={() => props.removeFields()}>
                           - 
                        </a>
					</p> 	
							  
		
		
		
		<br></br>
		
		<p className="control">
                        <a className={"button is-info"}
                           onClick={() => props.Verify()}>
                            Verify File
                        </a>
        </p>
		
		</div>
	
    )
}

export default VerifyDocument;