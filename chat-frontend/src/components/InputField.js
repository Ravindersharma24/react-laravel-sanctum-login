import React from 'react'

const InputField = (props) => {
  return (
    <div className="form-field d-flex align-items-center">
        <span className={props.icon}></span>
        <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        maxLength={props.maxlength}
        onChange={props.onChange}
        value={props.value}
        autoComplete="off"
        />
    </div>
  )
}

export default InputField
