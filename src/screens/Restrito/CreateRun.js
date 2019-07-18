import React, { Component } from 'react'
import ActionCreators from '../../redux/actionsCreators'
import { connect } from 'react-redux'
import {  Button, Segment, Form } from 'semantic-ui-react'

import InputMoment from 'input-moment'
import 'input-moment/dist/input-moment.css'
import moment from 'moment'
import momentTz from 'moment-timezone'

class CreateRun extends Component{     
    state = {
        friendly_name: '',
        duration: 0,
        distance: 0,
        created: moment(),
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
        const d = momentTz.tz(this.state.created, this.props.auth.user.timezone)
        const d2 = d.clone().utc().format('YYYY-MM-DD H:mm:ss')
        const distance = this.state.distance
        this.props.create({
            friendly_name: this.state.friendly_name,
            duration: this.state.duration,
            distance: this.props.auth.user.unit === 'metric' ? distance : distance * 1.60934 ,
            created: d2
        })
    }
    render(){               
        return(
            <div>
                <h1>Criar corrida</h1>                
                {
                    !this.props.auth.saved && 
                    <Form>
                        <Form.Field>
                            <label>Nome:</label>
                            <input type='text' value={this.state.friendly_name} onChange={this.handleChange('friendly_name')} />
                        </Form.Field>
                        <Form.Field>
                            <label>Duração em segundos:</label>
                            <input type='number' value={this.state.duration} onChange={this.handleChange('duration')} />
                        </Form.Field>
                        <Form.Field>
                            <label>Distancia ({this.props.auth.user.unit === 'metric' ? 'Km' : 'mi'})</label> 
                            <input type='number' value={this.state.distance} onChange={this.handleChange('distance')} />                
                        </Form.Field>
                        <Form.Field>
                            <label>Criação:</label> 
                            <input type='text' value={this.state.created.format('DD/MM/YYYY H:mm:ss')} onChange={this.handleChange('created')} />                
                        </Form.Field>
                        <InputMoment 
                            moment={this.state.created}
                            onChange={(val) => this.setState({ created: val})}
                        />
                        <div>
                            <Button onClick={this.handleSave}>Criar corrida</Button>               
                        </div>
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
        create: (run) => dispatch(ActionCreators.createRunRequest(run)),
        reset: () => dispatch(ActionCreators.updateProfileReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRun)