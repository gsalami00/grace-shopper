import React, {Component} from 'react'
import {connect} from 'react-redux'
import SingleProductCard from './SingleProductCard'
import {fetchAnimals} from '../../store/animals'

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchAnimals()
  }
  render() {
    const animals = this.props.animals
    return animals.map(animal => (
      <SingleProductCard
        species="Goat"
        description="One hell of a goat!"
        price={12325}
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hausziege_04.jpg/1024px-Hausziege_04.jpg"
      />
    ))
  }
}

const mapState = state => ({
  animals: state.animals
})
const mapDispatch = dispatch => ({
  fetchAnimals: () => dispatch(fetchAnimals)
})
export default connect(mapState, mapDispatch)(ProductList)
