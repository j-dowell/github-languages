import React, { Component } from 'react';
import Main from './Main';
import ThemeContext from './context';

class App extends Component {
    state = {
        theme: 'light',
    }
    
    toggleTheme = () => this.setState(prevState => ({ theme: prevState.theme === 'light' ? 'dark' : 'light'}))

    render = () =>
    <ThemeContext.Provider value={this.state.theme}>
        <Main toggleTheme={this.toggleTheme}/>
    </ThemeContext.Provider>
}

export default App;