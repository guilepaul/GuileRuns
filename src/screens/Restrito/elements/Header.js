import React from 'react'

import { connect } from 'react-redux'
import ActionCreators from '../../../redux/actionsCreators'

import { Link } from 'react-router-dom'

import { Menu, Dropdown } from 'semantic-ui-react'

const Header = props => {
    return(
        <Menu>  
            <Menu.Item>Corridas OnLine <b>Restrito</b></Menu.Item>          
            <Menu.Item as={Link} to='/restrito' >Home</Menu.Item>
            <Menu.Item as={Link} to='/restrito/runs' >Corridas</Menu.Item>
            <Menu.Menu position='right'>
                <Dropdown item text={props.auth.user.name}>
                    <Dropdown.Menu>
                        <Dropdown.Item>Minha Conta</Dropdown.Item>
                        <Dropdown.Item>Alterar Senha</Dropdown.Item>
                        <Dropdown.Item onClick={props.logout}>Sair</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
            </Menu.Menu>
          </Menu>
    )
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        signin: (email, passwd) => dispatch(ActionCreators.signinRequest(email, passwd)),
        logout: () => dispatch(ActionCreators.destroyAuthRequest())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)