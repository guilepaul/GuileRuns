import React, { Component } from 'react'
import ActionCreators from '../redux/actionsCreators'
import { connect } from 'react-redux'
import {  Button, Segment, Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import timezones from 'moment-timezone/data/meta/latest.json'

class CreateAccount extends Component{
    state = {
        passwd: '',
        passwd2: '',
        name: '',
        email: '',
        unit: 'metric',
        timezone: 'America/Sao_Paulo',
        error: ''
    }
    componentDidMount(){
        this.props.reset()
    }    
    handleChange = fieldname => event  => {
        this.setState({
            [fieldname]: event.target.value
        })
    }
    handleSave = () => {
        if(this.state.passwd !== this.state.passwd2){
            this.setState({
                error: 'equal',
                passwd: '',
                passwd2: ''
            })
        }else if(this.state.passwd.length < 6){
            this.setState({
                error: 'length',
                passwd: '',
                passwd2: ''
            })
        }else{
            this.setState({
                error: ''
            })
            this.props.save({
                name: this.state.name,
                email: this.state.email,
                passwd: this.state.passwd,
                unit: this.state.unit,
                timezone: this.state.timezone
            })
        }
    }
    render(){
        if(this.props.auth.isAuth){
            return <Redirect to='/restrito' />
        }        
        return(
            <div>
                <h1>Criar conta</h1>
                {JSON.stringify(this.props.auth)}
                {
                    this.props.auth.errorMessage !== '' && <Segment color='red'>{this.props.auth.errorMessage}!</Segment>
                }
                {
                    this.state.error === 'equal' && <Segment color='red'>As senhas devem ser iguais!</Segment>
                }
                {
                    this.state.error === 'length' && <Segment color='red'>As senhas devem ter ao menos seis caracteres!</Segment>
                }
                {
                    this.props.auth.saved && <Segment color='green'>Conta criada com sucesso!</Segment>
                }
                {
                    !this.props.auth.saved && 
                    <Form>
                        <Form.Field>
                            <label>Nome:</label>
                            <input type='text' value={this.state.name} onChange={this.handleChange('name')} />
                        </Form.Field>
                        <Form.Field>
                            <label>E-mail:</label>
                            <input type='email' value={this.state.email} onChange={this.handleChange('email')} />
                        </Form.Field>
                        <Form.Field>
                            <label>Nova Senha:</label>
                            <input type='password' value={this.state.passwd} onChange={this.handleChange('passwd')} />
                        </Form.Field>
                        <Form.Field>
                            <label>Confirmação de Senha:</label> 
                            <input type='password' value={this.state.passwd2} onChange={this.handleChange('passwd2')} />                
                        </Form.Field>
                        <select value={this.state.unit} onChange={this.handleChange('unit')}>
                            <option value='metric'>Métrico (Km)</option>
                            <option value='imperial'>Imperial (mi)</option>
                        </select>
                        <select value={this.state.timezone} onChange={this.handleChange('timezone')}>
                            {
                                Object
                                    .keys(timezones.zones)
                                    .map(tz => {
                                        return <option key={tz} value={tz}>{tz}</option>
                                    })
                            }
                        </select>
                        <Button onClick={this.handleSave}>Criar Conta</Button>                    
                    </Form>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        save: (user) => dispatch(ActionCreators.createProfileRequest(user)),
        reset: () => dispatch(ActionCreators.createProfileReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)