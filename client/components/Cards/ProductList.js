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
        key={animal.id}
        species={animal.species}
        description={animal.description}
        price={animal.price}
        imageUrl={animal.imageUrl}
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
