import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import BoardTable from './components/BoardTable';
import ReadBoard from './components/ReadBoard';
import WriteBoard from './components/WriteBoard';
import UpdateBoard from './components/UpdateBoard';
import SearchBoard from './components/SearchBoard';
import Upload from './components/Upload'

function App() {

    return (
        <Router>
            <div className="App">
                <div className="header">
                    <Link to={`/`}>홈으로</Link>
                </div>
                <Switch>
                        <Route exact path='/' component={BoardTable} />
                        <Route exact path='/read/:boardNo' component={ReadBoard} />
                        <Route exact path='/board/write' component={WriteBoard} />
                        <Route exact path='/update/:boardNo' component={UpdateBoard} />
                        <Route exact path='/search/:keyword/:keywordValue' component={SearchBoard} />
                        {/* <Route exact path='/upload' component={Upload} /> */}
                </Switch>
            </div>
        </Router>
    );
}

export default App;
