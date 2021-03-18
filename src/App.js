import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import BoardTable from './components/BoardTable';
import ReadBoard from './components/ReadBoard';
import WriteBoard from './components/WriteBoard';
import UpdateBoard from './components/UpdateBoard'

function App() {

    return (
        <Router>
            <div className="App">
                <Switch>
                        <Route exact path='/' component={BoardTable} />
                        <Route exact path='/:boardNo' component={ReadBoard} />
                        <Route exact path='/board/write' component={WriteBoard} />
                        <Route exact path='/update/:boardNo' component={UpdateBoard} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
