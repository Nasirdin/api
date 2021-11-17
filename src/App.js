import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// import Header from './components/header';
import Content from './components/content'
import Add from './components/add';
import Get from './components/get';


const App = () => {
    return (
        <div className="app">
            <BrowserRouter>
                {/* <Header/> */}
                <div className='container'>
                    <Switch>
                        <Route exact path='/' component={Content}/>
                        <Route exact path='/post' component={Get}/>
                        <Route exact path='/add/post' component={Add}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;