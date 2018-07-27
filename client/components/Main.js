import React, {Component} from 'react'
import WelcomeCard from './Cards/WelcomeCard'
import ProductList from './Cards/ProductList'
import {Button} from 'semantic-ui-react'
import {Login, Signup} from './auth-form'


export default class Main extends Component {

  constructor () {
    super();
    this.state = {
      showRegisterModal: true,
    };
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
  }

  toggleRegisterModal () {
    const { showRegisterModal } = this.state;
    localStorage.setItem('user', 'guest');

    this.setState({
      showRegisterModal: !showRegisterModal,
    })
  }

  render () {
    const { showRegisterModal } = (localStorage.getItem("user") ? false : this.state);

    return (
      <div className="app-container">

        <ProductList />

        {showRegisterModal &&

          <WelcomeCard>
            <div className="welcome-model-content">
              <div className="modal-sign-up">
                <h3>Sign up!</h3>
                <Signup />
              </div>

              <div className="modal-log-in">
                <h3>Log in</h3>
                <Login />
              </div>

              <div className="continue-guest">
                <Button primary onClick={this.toggleRegisterModal}>
                  Continue as a guest
                </Button>
              </div>
            </div>

          </WelcomeCard>
        }
      </div>
    )
  }
}
