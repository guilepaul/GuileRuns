import React, { Component } from 'react'
import ActionCreators from '../../redux/actionsCreators'
import { connect } from 'react-redux'
import {  Button, Segment, Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

class EditUser extends Component{     
    state = {
        name: '',
        email: '',
        role: '',
        isSet: false,
        error: ''
    }
    componentDidMount(){
        this.setState({ isSet: false })
        this.props.reset()
        this.props.load(this.props.match.params.id)
    }
    
    static getDerivedStateFromProps(newProps, prevState){
        if(newProps.users && !newProps.users.isLoading && !prevState.isSet){
            let u = newProps.users.user
            return {
                name: u.name,
                email: u.email,
                role: u.role,
                isSet: true
            }
        }
        return null
    }    
    handleChange = fieldname => event  => {
        this.setState({
            [fieldname]: event.target.value
        })
        console.log('estado handlechange',this.state)
    }
    handleSave = () => {
        this.props.save({
            id: this.props.match.params.id,
            name: this.state.name,
            email: this.state.email,
            role: this.state.role
        })
        console.log('estado handlesave',this.state)
    }
    componentDidUpdate(prevProps, prevState, newProps){
        if(prevState.name !== this.state.name){
            const name = this.state.name
            this.setState({
                name: name
            })
            console.log('state.name', this.state.name, 'prevstate', prevState )
        }
    }
    render(){
        if(this.props.users.saved){
            return <Redirect to='/admin/users' />
        }               
        return(
            <div>
                <h1>Editar usuário</h1>
                {
                    this.props.users.saved && <Segment color='green'>Corrida criada com sucesso!</Segment>
                }                
                {
                    !this.props.users.saved && 
                    <Form>
                        <Form.Field>
                            <label>Name:</label>
                            <input type='text' defaultValue={this.state.name} key={'name'} onChange={this.handleChange('name')} />
                        </Form.Field>
                        <Form.Field>
                            <label>E-mail:</label>
                            <input type='email' defaultValue={this.state.email} key={'email'} onChange={this.handleChange('email')} />
                        </Form.Field>
                        <Form.Field>
                            <select value={this.state.role} onChange={this.handleChange('role')} >
                                <option value='admin' >Administrador</option>
                                <option value='user' >Usuário</option>
                            </select>
                        </Form.Field>
                        <div>
                            <Button onClick={this.handleSave}>Salvar usuário</Button>               
                        </div>
                    </Form>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}
const mapDispatchToProps = dispatch => {
    return {
        save: user => dispatch(ActionCreators.updateUserRequest(user)),
        reset: () => dispatch(ActionCreators.updateUserReset()),
        load: id => dispatch(ActionCreators.getUserRequest(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)