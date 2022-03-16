import React from 'react';

function InputField(props) {
    let field = props.name;
	let counter = props.counter;
    let value = props.fields[field] ? props.fields[field] : '';
    let placeholder = props.placeholder;
    let addon = props.addon;
	console.log(field,props.name,props.counter);
    let handleChange = e => {
        props.onInputChangeUpdateField(field,e.target.value);
    };

    return (
        <div className="field has-addons is-12">
            <p className="control is-expanded">
                <input defaultValue={props.default || value}
                       onInput={handleChange}
                       placeholder={placeholder} className="input" type="text"></input>
            </p>
            <p className="control">
                {addon ?
                    <a className="button is-static">
                        {addon}
                    </a> :
                    ''}
            </p>
        </div>
    )
}

export default InputField;