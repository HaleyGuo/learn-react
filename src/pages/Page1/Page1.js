import React, {Component} from 'react';
import './Page1.css';
import image from './images/1.png'

export default class Page1 extends React.Component {
    render() {
        return (
            <div className="page-box">
                this is Page1~
                <img src={image}/>
            </div>
        )
    }
}