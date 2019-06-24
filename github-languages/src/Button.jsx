import React from 'react'
import * as R from 'ramda'
import './App.css'
const Button = ({ onClick, disabled, classNames, label, style }) =>
    <div
        className={`button ${classNames} ${disabled ? 'disabled' : ''}`}
        onClick={!disabled && onClick}
        style={style}
    >
        {label}
    </div>

export default Button