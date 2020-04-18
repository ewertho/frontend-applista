import React, {Component} from 'react'
import axios from 'axios'

import TodoForm from './todoForm'
import TodoList from './todoList'
import PageHeader from '../template/pageHeader'

const URL = "http://localhost:3000/api/todos"

export default class Todo extends Component{
    //construtor padrão
    constructor(props){
        super(props)
        //inicializando o estado
        this.state = {description:'', list: []}
        //procedimentos para o this
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)

        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.refresh()
    }
    handleAdd(){
        //variavel para pegar o estado mais novo
        const description = this.state.description
        //fazendo post no backend, utilizando a variavel mais nova
        //sempre que adicionar da refresh com as infornalções mais novas
        axios.post(URL, {description}).then(resp=>this.refresh())
    }
    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }
    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`).then(resp=>this.refresh(this.state.description))
    }
    handleMarkAsDone(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done:true})
        .then(resp=>this.refresh(this.state.description))
    }
    handleMarkAsPending(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done:false})
        .then(resp=>this.refresh(this.state.description)) 
    }

    handleSearch(){
        this.refresh(this.state.description)
    }
    handleClear(){
        this.refresh()
    }
    //atualiza sepre a lista e zera a descrição
    refresh(description=''){
        const search = description ? `&description__regex=/${description}/` : ''
        //sort=-createdAt atualiza do mais recente pro menos recente
        //pega o stado atual, zera a tela e pega lista vindo do backende atualiza a lista
        axios.get(`${URL}?sort=-createdAt${search}`)
        .then(resp=>this.setState({...this.state, description, list:resp.data}))
    }
    render(){
        return(
            <div>
                <PageHeader name="Lista" small="de dados"></PageHeader>
                <TodoForm 
                    description={this.state.description} 
                    handleChange={this.handleChange} 
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear = {this.handleClear}/>
                <TodoList  
                    list ={this.state.list} 
                    handleRemove= {this.handleRemove}
                    handleMarkAsDone = {this.handleMarkAsDone}
                    handleMarkAsPending = {this.handleMarkAsPending}/>
            </div>
        )
    }
}