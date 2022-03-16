import React from 'react';
import { useMoralis } from "react-moralis";
import { ErrorMessage } from 'formik';

function InstallMetamask(props) {

		

	const EnableWeb3 = ({user, score}) => {
  	const { web3, enableWeb3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError,account } = useMoralis()

  	if(isWeb3Enabled){
	console.log(web3,account,"Here");
	props.connectWC(web3,account);	
    	return <div></div>
  	}

  
	return <div>
        {web3EnableError && <ErrorMessage error={web3EnableError} />}
        
	<a className="button is-renai "
                            onClick={() => enableWeb3({provider: 'walletconnect'})} disabled={isWeb3EnableLoading}>
                            Connect Metamask Wallet</a>		
        </div>

	}
	






    return (
    	
        <div>
	<div className = "is-hidden-mobile">    
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
	</div>
        </div>            

        <div className=" column has-text-centered is-hidden-desktop"> <EnableWeb3/> <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br></div>
        

	    <br></br><br></br><br></br><br></br><br></br>
	    </div>
    )
}

export default InstallMetamask;
