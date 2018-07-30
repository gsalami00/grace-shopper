import React, {Component} from 'react'
import {connect} from 'react-redux'
import SingleProductCard from './SingleProductCard'
import {fetchAnimals, postCartItem} from '../../store/'

class ProductList extends Component {
  async componentDidMount() {
    await this.props.fetchAnimals()
    const localCart = JSON.parse(localStorage.getItem("cart"));
    if (this.props.user.id){
      if(localCart) {
        console.log("where the sausage is made")
        await Promise.all(localCart.map((cartItem) => {
          return this.props.postCartItem(this.props.user.id, cartItem);
        }))
        localStorage.removeItem("cart");
      }
    }
  }
  render() {
    const animals = this.props.animals
    return animals.map(animal => (
      <SingleProductCard
        key={animal.id}
        animal={animal}
      />
    ))
  }
}

const mapState = state => ({
  animals: state.animals,
  user: state.user.currentUser
})
const mapDispatch = dispatch => ({
  fetchAnimals: () => dispatch(fetchAnimals),
  postCartItem: (userId, cartItem) => dispatch(postCartItem(userId, cartItem))
})
export default connect(mapState, mapDispatch)(ProductList)
