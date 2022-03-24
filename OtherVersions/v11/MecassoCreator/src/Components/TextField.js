import React from 'react';

function TextField(props) {
    let field = props.name;
    let value = props.fields[field] ? props.fields[field] : '';
    let placeholder = props.placeholder;
    let addon = props.addon;

    let handleChange = e => {
        props.onInputChangeUpdateField(field,e.target.value);
    };

    return (
        <div className="field has-addons is-4">
            <p className="control is-expanded">
            	<textarea className="textarea" defaultValue={props.default || value}
            		placeholder={placeholder} rows="10" type="text"
            		onInput={handleChange}></textarea>
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

export default TextField;
