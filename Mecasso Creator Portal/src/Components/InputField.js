import React from 'react';

function InputField(props) {
    let field = props.name;
	
    let value = props.fields[field] ? props.fields[field] : '';
    
    let placeholder = props.placeholder;
    let addon = props.addon;
	
    let handleChange = e => {
        props.onInputChangeUpdateField(field,e.target.value);
    };

    return (
        
                <input defaultValue={props.default || value}
                       onInput={handleChange}
                       placeholder={placeholder} className="input is-rounded is-renai" type="text"></input>
            
    )
}

export default InputField;