import React, {Component} from 'react'
import {fetchAnimals} from '../../store/animals'
import {connect} from 'react-redux'

class OrderHistoryItemCard extends Component {
  componentDidMount() {
    this.props.fetchAnimals()
  }
  render() {
    let theAnimal = this.props.animals.filter(animal => {
      return animal.id === this.props.item.animalId
    })
    // const price = (this.props.animal.price / 100).toFixed(2)
    return (
      <React.Fragment>
        {this.props.animals.length ? (
          <div className="ui items">
            <div className="item order-item-container">
              <div className="ui small image">
                <img src={theAnimal[0].imageUrl} />
              </div>
              <div className="content">
                <table className="ui striped table order-item">
                  <tbody>
                    <tr className="top aligned">
                      <td className="species-name-order">
                        <h4>Item</h4>
                        {theAnimal[0].species}
                      </td>
                      <td>
                        <h4>Quantity</h4>
                        {this.props.item.quantity}
                      </td>
                      <td className="top aligned">
                        <h4>Price per item</h4>
                        ${(theAnimal[0].price / 100).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  animals: state.animals
})
const mapDispatch = dispatch => ({
  fetchAnimals: () => dispatch(fetchAnimals)
})
export default connect(mapState, mapDispatch)(OrderHistoryItemCard)
