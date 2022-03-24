import React, { useEffect } from 'react';
import InputField from './InputField';
import InstallMetamask from './InstallMetamask';



function PostNews(props) {

	console.log("Fname",props.Fname);

	let handleChange = e => {
		props.onInputChangeUpdateField('newsbody',e.target.value);
	};
	
	return (
        
		<div className="column is-8 is-offset-2">
		<br></br><br></br>    
		<div className = "bg-box renaiform">
		<br></br><br></br>
				
				<div className = "column is-10 is-offset-1">
				
                <h1 class="title is-3 is-renai-invert">Post Community Updates</h1>
				
				<br></br>

                <h5 class="title is-6 is-renai-invert">
		                Title
				</h5>	  

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="newstitle" placeholder="News Title"/>
				
				<br></br><br></br>
                
				<h5 class="title is-6 is-renai-invert">
		                Description
				</h5>	  


                <textarea className="textarea is-renai" onInput={handleChange} placeholder="Enter description"></textarea>

				<br></br>

                <h5 class="title is-6 is-renai-invert">
		                Add Media to Post
				</h5>	  
                


			<div className="field">
            
            <div className="column is-offset-4">
            <div className="control">

                <div className="file has-name is-boxed">
 				 <label className="file-label">
    				
					<input className="file-input" type="file" name="ImageUp" 						
					onInput={props.FileonChangeHandler}/>
    				
					<span className="file-cta">
      					<span className="file-icon">
        						<i className="fas fa-image"></i>
      					</span>
      				
      				<span className="file-label">
        				Select Image
      				</span>
  				</span>
    				
    			<span className="file-name">
      			{props.Fname}
    			</span>
  				</label>
				</div>
				</div>
				</div>
                </div>

                <br></br> 

                <h6 class="title is-6 is-renai-invert">
		                Paste External Link
				</h6>	  


                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="medialink" placeholder="Media Link"/>
				

                
										
				<div className = "column is-4 is-offset-4">
						<div className = "columns">        
						
                        <div className = "column">
						<a className="button is-renai " 
                            onClick={() => props.ipfsNews()}>
                           Submit News</a>
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
				</div>
		
    )
			}

			





export default PostNews;
