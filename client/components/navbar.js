import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Button, Icon} from 'semantic-ui-react'
import NavCart from './NavCart'
import GuestNavCart from './GuestNavCart'

const Navbar = ({handleClick, isLoggedIn, currentUserId}) => (
  <div>
    <nav className="nav-container">
      <Link to="/home">
        <h2 className="logo-text">livestockr</h2>
      </Link>
      <div className="right-aligned-navbar">
        {isLoggedIn ? (
          <React.Fragment>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to={`/users/${currentUserId}`}>View Profile</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <NavCart />
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <GuestNavCart />
          </React.Fragment>
        )}
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.currentUser.id,
    currentUserId: state.user.currentUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
