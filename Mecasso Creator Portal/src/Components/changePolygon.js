import React from 'react';

function ChangePolygon() {

	//console.log("Reached here");	
	
    return (
    	
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content ">
                <p className="image ">
                	
                	<h1 class="title is-1 has-text-white">Please change network to Polygon Mumbai Testnet in Metamask.</h1> 
                    <h3 class="title is-3 has-text-grey">Click below image for reference</h3>
                	
                    <a href="https://docs.matic.network/docs/develop/network-details/network/" rel="noopener noreferrer" target="_blank">
                        <img src="https://polygon.technology/wp-content/uploads/2021/07/polygon-logo.svg" alt=""></img>
                    </a>
                </p>
            </div>
            <button className="modal-close is-large" aria-label="close"></button>
        </div>
    )
}

export default ChangePolygon;
