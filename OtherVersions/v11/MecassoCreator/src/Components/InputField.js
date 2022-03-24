import React from 'react';

function InputField(props) {
    let field = props.name;
	
    let value = props.fields[field] ? props.fields[field] : '';
        //value = props.addon ? value + props.addon : value ;

    let placeholder = props.placeholder;
   
    let handleChange = e => {
         props.onInputChangeUpdateField(field,e.target.value);
    };

    return (
                

                      <input defaultValue={props.default || value }
                       onInput={handleChange}
                       placeholder={placeholder} className="input is-rounded is-renai" type="text"/>
                    
                                       
    )
}

export default InputField;