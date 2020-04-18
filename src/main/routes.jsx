import React from 'react'
import {Router, Route, Redirect, hashHistory} from 'react-router'
import Todo from '../todo/todo'
import About from '../about/about'

export default props=>(
    //router armazena as rotas
    //history precisa de uma estrategia, a usada aqui é hashHistory
    <Router history={hashHistory}>
        <Route path='/todos' component={Todo}/>
        <Route path='/about' component={About}/>
        <Redirect from='*' to='/todos'/>
    </Router>
)