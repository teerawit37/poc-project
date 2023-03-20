import React from 'react';

const Button = (props) => {
    let buttonClass;
    if (props.type) {
        buttonClass = `sl-button--${props.type}`;
    } else {
        buttonClass = 'sl-button--primary'
    }
    return (
        <button className={`sl-button ${buttonClass} ${props.className}`} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default Button;
