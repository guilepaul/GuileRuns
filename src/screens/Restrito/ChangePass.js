import React, { Component } from 'react'
import ActionCreators from '../../redux/actionsCreators'
import { connect } from 'react-redux'
import {  Button, Segment, Form } from 'semantic-ui-react'

class ChangePass extends Component{
    state = {
        passwd: '',
        passwd2: '',
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
                passwd: this.state.passwd,
                id: this.props.auth.user.id
            })
        }
    }
    render(){        
        return(
            <div>
                <h1>Alterar Senha</h1>
                {
                    this.state.error === 'equal' && <Segment color='red'>As senhas devem ser iguais!</Segment>
                }
                {
                    this.state.error === 'length' && <Segment color='red'>As senhas devem ter ao menos seis caracteres!</Segment>
                }
                {
                    this.props.auth.saved && <Segment color='green'>Senha alterada com sucesso</Segment>
                }
                {
                    !this.props.auth.saved && 
                    <Form>
                        <Form.Field>
                            <label>Nova Senha</label>
                            <input type='password' value={this.state.passwd} onChange={this.handleChange('passwd')} />
                        </Form.Field>
                        <Form.Field>
                            <label>Confirmação de Senha</label> 
                            <input type='password' value={this.state.passwd2} onChange={this.handleChange('passwd2')} />                
                        </Form.Field>
                        <Button onClick={this.handleSave}>Alterar Senha</Button>                    
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
        save: (user) => dispatch(ActionCreators.updateProfileRequest(user)),
        reset: () => dispatch(ActionCreators.updateProfileReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass)