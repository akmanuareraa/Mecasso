import React, { useEffect } from 'react';
import InputField from './InputField';




function MintNFT(props) {

	
	
	return (
        
                <div className="column is-8 is-offset-2">
                <br></br><br></br>    
                <div className = "bg-box renaiform">
                <br></br><br></br>
				
				<div className = "column is-offset-1 is-10">
				
                <h1 class="title is-3 is-renai-invert">Mint Community NFT</h1>
				
				<br></br>



				<h5 class="title is-6 is-renai-invert">
                <b>
		                Community Token Name : &nbsp;
				</b>	  
                {props.tokenname}
                </h5>

                <br></br>
                <h5 class="title is-6 is-renai-invert">
                <b>
		                Token Symbol : &nbsp;
                </b>	  
                {props.tokensymbol}
                </h5>

                <br></br>
                
                <h5 class="title is-6 is-renai-invert">
                <b>
		                Current Max Cap : &nbsp;
				</b>	  
                {props.cap}
                </h5>

                <br></br>
                
                <h5 class="title is-6 is-renai-invert">
                <b>
		                Current circulation : &nbsp;
				</b>	  
                {props.totalSupply}
                </h5>

                <br></br>

                
            <div className="field">
            <h5 class="title is-6 is-renai-invert">Image / Video / Audio / 3D image to mint as NFT</h5>
            <div className="column is-offset-4">
            <div className="control">

                <div className="file has-name is-boxed">
 				 <label className="file-label">
    				
					<input className="file-input" type="file" name="ImageUp" 						
                    onInput={props.FileonChangeHandler}/>
    				
					<span className="file-cta">
      					<span className="file-icon">
        						<i className="fas fa-upload"></i>
      					</span>
      				
      				<span className="file-label">
        				Select Media 
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
                
                <h5 class="title is-6 is-renai-invert ">
		                Enter recipient address
				</h5>

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="nftrecipient" placeholder="0x0000000000000000000000000000000000000"/>

                <br></br><br></br> 

                
                <h5 class="title is-6 is-renai-invert ">
		                Enter Proposal Debate Period ( Max 7 days)
				</h5>

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="debateperiod" placeholder="Debate Period "/>
                
                </div>

                <div className = "column is-4 is-offset-3">
                    
                    <div className = "columns">
                        <div className = "column is-offset-2">
						<a className="button is-renai " 
                            onClick={() => props.ipfsNFT()}>
                           Mint Community NFT
                        </a>
                        </div>   
                        
						      
                    </div>
                         
				</div>
        </div>
        </div>
        		
		
    )
			
}

			





export default MintNFT;
