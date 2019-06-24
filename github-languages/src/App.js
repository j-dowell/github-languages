import React from 'react';
import * as R from 'ramda';
import { getAllLanguages, aggregateRepoLanguages } from './api/script2';
import Repo from './Repo';

import './App.css'
import { isNotEmpty } from './utils';
import Total from './Total';
import AllRepos from './AllRepos';
import Button from './Button';
import LoadingButton from './LoadingButton';

class App extends React.Component {
    state = {
        repos: [],
        error: null,
        loaded: true,
        width: window.innerWidth,
        height: window.innerHeight,
        totals: [],
        viewingTotal: true,
        username: '',
    }

    componentDidMount = () => window.addEventListener('resize', this.onResize)

    componentWillUnmount = () => window.removeEventListener('resize', this.onResize)

    onResize = () => this.setState(() => ({ width: window.innerWidth, height: window.innerHeight }))

    toggleView = () => this.setState(prevState => ({ viewingTotal: !prevState.viewingTotal}))

    handleChange = ({ target: { value }}) => this.setState(() => ({ username: value }))

    submit = () => {
        this.setState(() => ({ loaded: false }), () =>
        getAllLanguages(this.state.username)
            .then(repos => this.setState(() => ({
                repos,
                loaded: true,
                totals: aggregateRepoLanguages(repos)
            })))
            .catch(error => this.setState(() => ({ error })))
        )
    }

    render = () => (
            <div className="App">
                <h1>GitHub Languages</h1>
                <div>Please enter a GitHub username to see what languages they use</div>
                <input className="name-input" value={this.state.username} onChange={this.handleChange} label="enter username"/>
                <Button style={{transform: `translateY(${this.state.username ? '0' : '-57'}px)`}} label="Submit" disabled={this.state.username === ''} onClick={this.submit} classNames="submit"/>
                {
                    this.state.repos.length > 0 &&
                    <>
                        <div className="toggle" onClick={this.toggleView}>
                            {this.state.viewingTotal ? 'View breakdown by repo' : 'View total'}
                        </div>
                        {
                            this.state.viewingTotal
                            ? <div className="total-container"><Total
                                languages={this.state.totals}
                                width={500}    
                                height={300}    
                            />
                            </div>
                            : 
                            <div className="repo-list-container">
                                <AllRepos
                                    repos={this.state.repos}
                                    width={this.state.width}
                                    height={this.state.height}
                                />
                            </div>
                        
                        }
                    </>
                }
                {!this.state.loaded && <div>Loading</div>}
                
            </div>
    );
}

export default App;
