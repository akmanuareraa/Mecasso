import React from 'react';
import InputField from './InputField';

function SellPage(props) {
	

					   
	return (
		<div className="column">
		<div className="box">
		
		<h1 className="title is-4  has-text-bold is-centre ">List for Sale</h1>
		
			
<div>		
<div class="dropdown is-hoverable">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
      <span>{props.basecurr}</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div> 
  
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">

      <a class="dropdown-item" onClick={() => props.setBaseCurr('ETH')}>
        ETH
      </a>
      
      <a class="dropdown-item" onClick={() => props.setBaseCurr('WETH')}>
        WETH
      </a>

    </div>
  </div>
  </div><br></br><br></br>
  </div>
  
  			<div className="field">
  			
  			<label className="label">Set Price</label>
  			<div className="control">
    			<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="Price"/>
  			</div>
			</div>
			
			<div className="field">
  			<label className="label">Royalty from Secondary Sales (in %)</label>
  			<div className="control">
    			<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="Royalty(in %)"/>
  			</div>
			</div><br></br>	
			
			<div className="field">		
			<a className="button is-info" 
                            onClick={() => props.sellToken(props.TokenID)}>
			Post Listing </a>
			</div>
			</div>
			</div>			

				
		)
		
}

        

export default SellPage;
