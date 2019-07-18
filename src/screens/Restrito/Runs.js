import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ActionCreators from '../../redux/actionsCreators'
import { connect } from 'react-redux'
import { Table, Button } from 'semantic-ui-react'

import Distance from '../elements/Distance'
import Duration from '../elements/Duration'
import DateStr from '../elements/DateStr'

class Runs extends Component{
    componentDidMount(){
        this.props.load()
        console.log(this.props.auth)
    }
    renderRun = (run) => {
        return(
            <Table.Row>
                <Table.Cell>
                  {run.friendly_name}          
                </Table.Cell>
                <Table.Cell>
                  <Duration duration={run.duration} />          
                </Table.Cell>
                <Table.Cell>
                  <Distance distance={run.distance} metric={this.props.auth.user.unit} />          
                </Table.Cell>
                <Table.Cell>
                  <DateStr date={run.created} timezone={this.props.auth.user.timezone} />          
                </Table.Cell>
            </Table.Row>
        )
    }
    render(){
        const run = {
            friendly_name: 'run de teste',
            duration: 100,
            distance: 100,
            created: '2019-01-01 00:00:00'
        }
        return(
            <div>
                <h1>Corridas</h1>
                <Button as={Link} to='/restrito/create-run'>Nova corrida</Button>
                <Table celled>
                    <Table.Header>
                        <Table.HeaderCell>Nome</Table.HeaderCell>
                        <Table.HeaderCell>Duração</Table.HeaderCell>
                        <Table.HeaderCell>Distância</Table.HeaderCell>
                        <Table.HeaderCell>Data</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.props.runs.data.map(this.renderRun)
                        }
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        runs: state.runs,
        auth: state.auth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        load: () => dispatch(ActionCreators.getRunsRequest()),
        create: (run) => dispatch(ActionCreators.createRunRequest(run))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Runs)