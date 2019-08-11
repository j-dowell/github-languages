import React, { Component } from 'react';
import theme from './theme';
import ThemeContext from './context';

const getTheme = themeName => theme[themeName]

class ThemedDiv extends Component {
    render = () => 
    <ThemeContext.Consumer>
        {
            context =>
            <div
                style={getTheme(context)}
                className={this.props.className}
                {...this.props}
            >
                {this.props.children}
            </div>
        
        }
    </ThemeContext.Consumer>
}

export default ThemedDiv;