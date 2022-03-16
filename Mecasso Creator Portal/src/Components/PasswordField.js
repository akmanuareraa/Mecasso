import React from 'react';

function PasswordField(props) {
    let field = props.name;
	
    let value = props.passwords[field] ? props.passwords[field] : '';
    
    let placeholder = props.placeholder;
    let addon = props.addon;
	
    let handleChange = e => {
        props.onPasswordChangeUpdateField(field,e.target.value);
    };


    return (
        <div className="field">
            <p className="control is-expanded">
                <input class="input" 
                       onInput={handleChange}
                       placeholder={placeholder} className="input" type="password"></input>
            </p>
            
        </div>
    )
}

export default PasswordField;