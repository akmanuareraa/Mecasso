import React from 'react';
import InputField from './InputField.js';

function Navigation(props) {
	return (
		<div className="column  is-2">
		<div className="box ">
		
		SEARCH<br></br><br></br>
		
		
		<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="Search" addon="Yes"/>
		                
		<b>Filter</b><br></br>
		
		Chain<br></br>
		
		Price Range<br></br>
		
		Type of Media<br></br><br></br>
		
		<b>Sort</b><br></br>
		
		Cost<br></br>
		
		
		
		</div>
		</div>
		)
		
}

        

export default Navigation;
