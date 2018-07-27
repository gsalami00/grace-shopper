import React from 'react'
import {Modal} from 'semantic-ui-react'

const ModalContainer = ({ onClose, children }) => (
  <div>
    <div
      className="overlay"
      onClick={onClose}
    />

    <Modal className="modal">
      <Modal.Header>
        <h3>Hello?</h3>
      </Modal.Header>

      <Modal.Content image>
        {children}
      </Modal.Content>
    </Modal>

  </div>
);

export default ModalContainer;
