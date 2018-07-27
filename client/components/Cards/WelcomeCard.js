import React, {Component} from 'react'
import {Modal} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const WelcomeCard = ({children}) => {
  return (
    <div>

      <Modal open={true} dimmer={true} >
        <Modal.Header>
          Either sign up, log in or continue as a guest!
        </Modal.Header>

        <Modal.Content className='welcome-modal-container'>
          {children}
        </Modal.Content>

      </Modal>
    </div>
  )
}

export default WelcomeCard
