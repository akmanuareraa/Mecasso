import React from 'react';
import InputField from './InputField';
import TextField from './TextField';
import LoopyFields from './LoopyFields';

function CreatePage(props) {

				   
	return (
				
		<div className="column">
		<div className="box">
		<h1 className="title is-4  has-text-bold is-centre ">Create a NFT</h1>
		
			<div className="field">
  			<label className="label">Name</label>
  			<div className="control">
    			<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="Name"/>
  			</div>
			</div>
		
		
			<div className="field">
  			<label className="label">Image / Video / Audio / 3D image</label>
  			<div className="control">
			
                 		<div className="file has-name is-boxed">
 				 <label className="file-label">
    				
					<input className="file-input" type="file" name="ImageUp" 						onInput={props.FileonChangeHandler}/>
    				
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
				</div>
				</div>
	 
			 
			 
		
		<div className="field">
  		<label className="label">Description</label>
  		<div className="control">  				
    		<TextField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="Desc"/>
		</div>
		</div>

		
		<div className="field">
  		<label className="label">External Link</label>
  		<div className="control">
    		<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} placeholder="http://" name="Link" />
  		</div>
		</div>
		
		
		<div className="field">
  		<label className="label">Properties</label>
  		<input type="checkbox" name="clickme1" className="switch is-rounded is-info" id="switchExample1" onClick={() => props.changeOptionProp()}/>
    <label for="switchExample1">Yes/No</label>
		</div>
		
		{
                
                props.propOp == 'Y' ?		
		
		<p className="control">
		<label >	
		                Enter Properties
		</label>
				<br></br><br></br>

                						
						<LoopyFields onInputChangeUpdateField={props.onInputChangeUpdateField}
                            numrows={props.numrows} fields={props.fields}/>
					<br></br>
								
					 <a className={"button  is-outlined is-info"}
                           onClick={() => props.addFields()}>
                            + 
                        </a>
						<a className={"button is-outlined is-info"}
                           onClick={() => props.removeFields()}>
                           - 
                        </a>
					</p>:
					<div></div> 	
		}					
		
	
		
		
		
  		<div className="field">  	
  		<label className="label">Unlockable Content</label>	
  		<input type="checkbox" name="clickme2" className="switch is-rounded is-info" id="switchExample2" onClick={() => props.changeOptionUnlock()}/>
    <label for="switchExample2">Yes/No</label> 
    		</div>
    			
		
		{
                	props.propUlock == 'Y' ?
                	
		<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            	fields={props.fields} name="Ulink" placeholder="Content link, decryption key, etc." />
                          	
			:<div></div>
		}			
		
		
		<div className="field">
  		<label className="label">Supply</label>
  		<div className="control">
    		<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="Supply" />
  		</div>
		</div>
		
		<div className="field">		
		<a className="button is-info" 
                            onClick={() => props.Submit()}>
								Create NFT </a>
		</div>
		</div>
		</div>
		
		
		)
		
}

        

export default CreatePage;


		



