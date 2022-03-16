import React from 'react';
import background from "../img/background.png";

function copyText() {

	var copyText = document.getElementById("contractAddress");
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999); /* For mobile devices */
  
	 /* Copy the text inside the text field */
	navigator.clipboard.writeText(textArea.value);
  
	/* Alert the copied text */
	alert("Copied the address: " + textArea.value);
    textArea.remove();
	/*

	/* Get the text field */
	//var copyText = document.getElementById("contractAddress");
	//console.log("copyText",copyText);
	/* Select the text field */
	//copyText.select();
	//copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
	 /* Copy the text inside the text field */
	//navigator.clipboard.writeText(copyText.value);
  
	/* Alert the copied text */
	//alert("Copied the text: " + copyText.value);
	
  }


function LoadandEndScreen(props) {

	console.log(props.navToken,"navToken");
        window.scrollTo(0, 0);		
	return (
        
				<div className = "bg-box" style={{ }}>
				<br></br>	
				<div className ="bg-img">
				{

                props.navToken == '2a' ?
				
                <div className = "column is-4 is-offset-4 has-text-centered">
			    <h4 className="title is-4 is-renai-invert">Issuing Community Token</h4>				
                <h3 className="title is-3 is-renai-invert">Creating Social Card </h3>
				<figure className="image is-inline-block" >
  		        <img src={'images/Mecasso.gif'} width="10px" length="10px"/> 
		        </figure>
		        </div>
				:

				props.navToken == '2b' ?
				<div className = "column is-4 is-offset-4 has-text-centered">		
				<h4 className="title is-4 is-renai-invert">Issuing Community Token</h4>		
				<h3 className="title is-3 is-renai-invert">Generating Community Smart Contract </h3>
				<figure className="image is-inline-block" >
  		        <img src={'images/Mecasso.gif'} width="10px" length="10px"/> 
		        </figure>
				</div>:	

				props.navToken == '2c' ?
				<div className = "column is-4 is-offset-4 has-text-centered">	
				<h4 className="title is-4 is-renai-invert">Issuing Community Token</h4>			
				<h3 className="title is-3 is-renai-invert">Issuing Inital Tokens </h3>
				<figure className="image is-inline-block" >
  		        <img src={'images/Mecasso.gif'} width="10px" length="10px"/> 
		        </figure>
				</div>:	

				props.navToken == '2d' ?
				<div className = "column is-4 is-offset-4 has-text-centered">
			    <h4 className="title is-4 is-renai-invert">Issuing Community Token</h4>
				<h3 className="title is-3 is-renai-invert">Community Created</h3>
                <figure className="image is-inline-block" >
  		        <img src={'images/Mecasso-success.gif'} width="8px" length="8px"/> 
		        </figure>
				
				DAO Contract Address:
				
						
				<span class="tag is-light" id="contractAddress" >{props.DAOcontract}</span>
				<button onClick={()=>copyText()}>Copy</button>
			    </div>: 		

				props.navToken == '19a' ?
				<div className = "column is-4 is-offset-4 has-text-centered">
			    <h4 className="title is-4 is-renai-invert">Post Community Updates</h4>
				<h3 className="title is-3 is-renai-invert">Successfully Posted!</h3>
                <figure className="image is-inline-block" >
  		        <img src={'images/Mecasso-success.gif'} width="8px" length="8px"/> 
		        </figure>
				</div>:

				props.navToken == '10a' ?
				<div className = "column is-4 is-offset-4 has-text-centered">
				<h4 className="title is-4 is-renai-invert">Proposal Submitted</h4>
				
				<figure className="image is-inline-block" >
  				<img src={'images/Mecasso-success.gif'} width="8px" length="8px"/> 
				</figure>

				Proposal ID:
				<br></br>	
				<span class="tag is-light"  >{props.ProposalID}</span>
				<br></br><br></br>
				Transaction Hash:
				<br></br>
				<span class="tag is-light"  >{props.txHash}</span>
				</div>:
				
				props.position ?
				<div className = "column is-4 is-offset-4 has-text-centered">
				<h4 className="title is-4 is-renai-invert">Proposal Vote Submitted!</h4>
				<br></br>
				<h4 className="title is-3 is-renai-invert">Voted 'Yes'!</h4>
				
				<figure className="image is-inline-block" >
  				<img src={'images/Yes.gif'} width="8px" length="8px"/> 
				</figure>
				
				Voter:
				<br></br>	
				<span class="tag is-light"  >{props.voter}</span>
				<br></br><br></br>
				Transaction Hash:
				<br></br>
				<span class="tag is-light"  >{props.txHash}</span>
				</div>:
				
				<div className = "column is-4 is-offset-4 has-text-centered">
				<h4 className="title is-4 is-renai-invert">Proposal Vote Submitted!</h4>
				<br></br>
				<h4 className="title is-3 is-renai-invert">Voted 'No'</h4>
				
				<figure className="image is-inline-block" >
  				<img src={'images/No.gif'} width="8px" length="8px"/> 
				</figure>
				
				Voter:
				<br></br>	
				<span class="tag is-light"  >{props.voter}</span>
				<br></br><br></br>
				Transaction Hash:
				<br></br>
				<span class="tag is-light"  >{props.txHash}</span>
				</div> 
                                    
                }
				</div>		         	
		        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>	
		        </div>
		
		
    )
}

export default LoadandEndScreen;
