import React, {Component} from 'react';

import Nav from 'components/Nav/Nav';
import getRouter from 'router/router';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Nav/>
                {getRouter()}
            </div>
        )
    }
}