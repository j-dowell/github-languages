import React from 'react';
import * as R from 'ramda';
import './Main.css';

const Button = ({ onClick, disabled, classNames, label, style }) =>
    <div
        className={`button ${classNames} ${disabled ? 'disabled' : ''}`}
        onClick={!disabled && onClick}
        style={style}
    >
        <div>{label}</div>
    </div>

export default Button