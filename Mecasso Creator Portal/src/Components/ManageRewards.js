import React, { useEffect } from 'react';
import InputField from './InputField';
import InstallMetamask from './InstallMetamask';



function PostNews(props) {

	
	
	return (
        
				
				<div className = "box">
				<br></br><br></br>
				
				<div className = "column is-6 is-offset-2">
				
                <h1 class="title is-1">Post Community Updates</h1>
				
				<br></br>

                <h5 class="title is-6 ">
		                Heading
				</h5>	  

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="newsheading" placeholder="News Heading"/>
				
                <h5 class="title is-6 ">
		                Description
				</h5>	  

                <textarea className="textarea" placeholder="Enter description"></textarea>

                <h5 class="title is-6 ">
		                Upload Media
				</h5>	  
                
                <h5 class="title is-6 ">
		                Image 
				</h5>	  

                <h5 class="title is-6 ">
		                Video
				</h5>	  


                <h5 class="title is-6 ">
		                Add File Upload Button here
				</h5>	 
                
										
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
		
		
    )
			}

			
}




export default PostNews;
