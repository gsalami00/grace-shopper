import React, {Component} from 'react'
import {Card, Icon, Image, Button, Header, Modal} from 'semantic-ui-react'

class SingleProductCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }
  closeModal() {
    this.setState({
      showModal: false
    })
  }
  openModal() {
    this.setState({
      showModal: true
    })
  }
  render() {
    return (
      <Card>
        <Image src={this.props.imageUrl} />
        <Card.Content>
          <Card.Header>{this.props.species}</Card.Header>
          {/* <Card.Description>{props.description}</Card.Description> */}
        </Card.Content>
        <Card.Content extra>
          <span>${(this.props.price / 100).toFixed(2)}</span>
          <div className="right-aligned-button">
            <Button animated="vertical">
              <Button.Content hidden>Add</Button.Content>
              <Button.Content visible>
                <Icon name="shop" />
              </Button.Content>
            </Button>
            <Modal
              // closeIcon
              // onClose={this.closeModal}
              open={this.state.showModal}
              trigger={
                <Button onClick={() => this.setState({showModal: true})}>
                  Details
                </Button>
              }
            >
              <Modal.Header>
                {this.props.species}
                {/* <Button onClick={() => this.setState({showModal: false})}> */}
                <i size="60px" id="exit-modal" className="window close icon" onClick={() => this.setState({showModal: false})}/>
              </Modal.Header>
              <Modal.Content image>
                <div className="image content" id="modal-image">
                  <Image src={this.props.imageUrl} />
                </div>
                <div className="modal-description">
                  <Modal.Description>
                    <h2>{this.props.description}</h2>
                  </Modal.Description>
                </div>
              </Modal.Content>
            </Modal>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

export default SingleProductCard
