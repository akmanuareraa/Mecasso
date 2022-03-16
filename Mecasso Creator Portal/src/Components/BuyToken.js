import React from 'react';
import InputField from './InputField';

function BuyToken(props) {

	console.log("Reached here");	
	
    return (
    	
        <div className="modal is-active">
            <div className="modal-background">
            <div className="modal-content ">
            <br></br><br></br><br></br>
                	<div className = "box">
                	
                	<h3 className="title is-3 ">Buy {props.tokensymbol}</h3>

                    <h5 className="title is-5 ">Price</h5>

                    Show Price

                    <h5 className="title is-5 ">Amount</h5>

                    <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="amount" placeholder="amount"/>
                	
                    <a className="button is-success " 
                            onClick={() => props.buyToken()}>
                           Buy Token</a>
            </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => props.setNav(10)}> Close</button>
            
            </div>
        </div>
    )
}

export default BuyToken;
