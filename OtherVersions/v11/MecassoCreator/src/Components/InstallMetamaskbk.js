import React from 'react';

function InstallMetamask() {

	console.log("Reached here");	
	
    return (
    	
        <div className = "box bg-box renaipanel" >
        <div className="mmoverlay" >
         
        </div>

                     <br></br><br></br>
                     <div className = "column has-text-centered">
                	<h1 className="title is-3 ">Connect to Metamask wallet to continue</h1>
                    <h2 className="title is-4 ">Download Metamask by clicking the below image</h2>
                	
                    <a href="https://metamask.io/" rel="noopener noreferrer" target="_blank">
                        <img src="./images/mm-logo.svg" alt=""></img>
                    </a>
                    </div>
                    <br></br><br></br><br></br><br></br><br></br>

        
        </div>
    )
}

export default InstallMetamask;
