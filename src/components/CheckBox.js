import React, { Component } from 'react';

export const CheckBox = props => {
    return (
      <li>
       <inputc key={props.id} onClick={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
      </li>
    )
}
export default CheckBox
