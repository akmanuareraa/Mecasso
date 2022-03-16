import React from 'react';
import InputField from './InputField';
import LoopyFields from './LoopyFields';

function VerDocument(props) {
    
	
	
	
	return (
        
				
				<div className = "box">
				<br></br><br></br>
				<div className = "column is-4 is-offset-4">
				
				<p>Select File to Verified</p>	
				
		
		
				<div className="file has-name">
 				 <label className="file-label">
    				
					<input className="file-input" type="file" name="ImageUp" onInput={props.onChangeHandler}/>
    				
					<span className="file-cta">
      					<span className="file-icon">
        						<i className="fas fa-upload"></i>
      					</span>
      					
						<span className="file-label">
        						Browse
      					</span>
  				  	</span>
    				
					<span className="file-name">
      					{props.Fname}
    				</span>
  					
				 </label>				
				</div>
		
				<br></br>	
				
					   <label >	
		                Document ID
					   </label>
				
					   <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="id" placeholder="Enter Document ID"/>
					
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
		
		<br></br>
		{
					(props.verStatus)?
		<div>			
						
		<span className =  {props.verStatus == 'Tampered' ? "tag is-danger" : "tag is-success"} >	
					
					Status:- 
					{props.verStatus} 
					
					 	
      	</span>
		<br></br> <br></br>
		<span className="tag is-light ">	
					
					Succesfully verified with Blockhain!
					 	
      	</span>
			</div>:	
		<span className="tag is-light">	
		
						Status:-	<br></br><br></br>
      	</span>				
		}

		</div>
		<div className = "column ">
		<figure className="image is-inline-block" >
  		<img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/White_box_35x100.png"/> 
		</figure>
		</div>
		</div>
		
    )
}

export default VerDocument;