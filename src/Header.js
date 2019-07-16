import React from 'react'

import { connect } from 'react-redux'
import ActionCreators from './redux/actionsCreators'

import { Link } from 'react-router-dom'

import { Menu } from 'semantic-ui-react'

const Header = props => {
    return(
        <Menu>  
            <Menu.Item>Corridas OnLine</Menu.Item>          
            <Menu.Item as={Link} to='/' >Home</Menu.Item>
            <Menu.Item as={Link} to='/admin' >Admin</Menu.Item>
            <Menu.Item as={Link} to='/restrito' >Restrito</Menu.Item>
            <Menu.Item as={Link} to='/login' >Login</Menu.Item>
          </Menu>
    )
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = state => {
    return {
        signin: (email, passwd) => ActionCreators.signinRequest(email, passwd)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)