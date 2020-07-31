import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div>
        <span className='header-username'>
          <i class="fas fa-user-circle"></i>{this.context.user.name}
        </span>
        <nav>
          <NavLink
            onClick={this.handleLogoutClick}
            className="nav-link"
            to='/login'>
            Logout <i class="fas fa-door-open"></i>
          </NavLink>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    if (window.location.pathname === '/login') {
      return;
    } else {
      return (
        <nav>
          <NavLink className="nav-link" to='/login'>Login</NavLink>
          {' '}
          <NavLink className="nav-link" to='/register'>Sign up</NavLink>
        </nav>
      )
    }

  }

  render() {

    return (
      <header>
        <h1>
          <Link to='/'>
          <i id='title-icon' class="fab fa-think-peaks"></i>
            Speak-Easy
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
