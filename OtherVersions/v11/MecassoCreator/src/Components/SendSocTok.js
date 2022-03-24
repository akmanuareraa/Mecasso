import React from 'react';
import InputField from './InputField';

function SendSocTok(props) {

    console.log("Reached here");

    return (

        <div className="modal is-active">
            <div className="modal-background">
                <div className="modal-content ">
                    <br></br><br></br><br></br>
                    <div className = "box">

                        <h3 className="title is-3 ">Send {props.tokensymbol}</h3>

                        <h5 className="title is-5 ">Receiver's Address</h5>

                        <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                                    fields={props.fields} name="sendAddress" placeholder="beneficiary"/>


                        <h5 className="title is-5 ">Amount</h5>

                        <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                                    fields={props.fields} name="currentTxnAmount" placeholder="amount"/>

                        <a className="button is-success "
                           onClick={() => props.sendToken()}>
                            Send Token</a>
                            <br></br><br></br>

                        {
                            props.sendTxn == true?
                                <div>
                                    <p className="has-text-primary">** Transaction Successful **</p>
                                    <br></br>
                                    Transaction Hash:
				                    <br></br>
				                    <span class="tag is-light"  >{props.txHash}</span>
                                </div>:

                                <div></div>
                        }

                    </div>
                </div>

                <button className="modal-close is-large mr-6" aria-label="close" onClick={() => props.setNav(10)}> Close</button>

            </div>
        </div>
    )
}

export default SendSocTok;


