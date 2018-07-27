import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Card, Icon, Image, Button, Header, Modal} from 'semantic-ui-react'
import { postCartItem } from '../../store/'

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
  addToCart() {
    this.props.postCartItem()
  }
  render() {
    const price = (this.props.price / 100).toFixed(2);
    return (
      <Card className="single-card-tile">
        <Image src={this.props.imageUrl} />
        <Card.Content>
          <Card.Header>{this.props.species}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <span>${price}</span>
          <div className="right-aligned-button">
            <Button animated="vertical" onClick={this.addToCart}>
              <Button.Content hidden>Add</Button.Content>
              <Button.Content visible>
                <Icon name="shop" />
              </Button.Content>
            </Button>
            <Modal
              open={this.state.showModal}
              trigger={
                <Button onClick={() => this.setState({showModal: true})}>
                  Details
                </Button>
              }
            >
              <Modal.Header>
                <div className="species-name">{this.props.species + " - $" + price}</div>
                <i
                  id="exit-modal"
                  className="modal-close window close icon"
                  onClick={() => this.setState({showModal: false})}
                />
                <div className="clear" />
              </Modal.Header>
              <Modal.Content image>
                <div className="image content" id="modal-image">
                  <Image src={this.props.imageUrl} />
                </div>
                <div className="modal-description">
                  <Modal.Description>
                    <p>{this.props.description}</p>
                  </Modal.Description>
                </div>
                <div className="modal-cart">
                  <Button animated="vertical">
                    <Button.Content hidden>Add</Button.Content>
                    <Button.Content visible>
                      <Icon name="shop" />
                    </Button.Content>
                  </Button>
                </div>
              </Modal.Content>
            </Modal>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

const mapDispatch = (dispatch) => ({
  postCartItem: (cartObj) => dispatch(postCartItem(cartObj))
});


export default connect(null, mapDispatch)(SingleProductCard)
