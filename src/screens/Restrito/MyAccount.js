import React, { Component } from 'react'
import ActionCreators from '../../redux/actionsCreators'
import { connect } from 'react-redux'
import {  Button, Form, Segment } from 'semantic-ui-react'

import timezones from 'moment-timezone/data/meta/latest.json'

import Distance from '../elements/Distance'
import Duration from '../elements/Duration'
import DateStr from '../elements/DateStr'

class MyAccount extends Component{
    state = {
        unit: '',
        timezone: ''
    }
    componentDidMount(){
        this.setState({
            unit: this.props.auth.user.unit,
            timezone: this.props.auth.user.timezone
        })
        this.props.reset()
    }
    handleChange = fieldname => event  => {
        this.setState({
            [fieldname]: event.target.value
        })
    }
    handleSave = () => {
        this.props.save({
            unit: this.state.unit,
            timezone: this.state.timezone,
            id: this.props.auth.user.id
        })
    }
    render(){        
        return(
            <div>
                <h1>Minha conta</h1>
                {
                    this.props.auth.saved && <Segment color='green'>Configurações alteradas com sucesso</Segment>
                }
                {
                    !this.props.auth.saved &&
                    <Form>
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
                        <Button onClick={this.handleSave}>Salvar</Button>                    
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

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)