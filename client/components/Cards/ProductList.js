import React, {Component} from 'react'
import {connect} from 'react-redux'
import SingleProductCard from './SingleProductCard'

class ProductList extends Component {
  render() {
    return (
      <SingleProductCard
        species="Goat"
        description="One hell of a goat!"
        price={12300}
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hausziege_04.jpg/1024px-Hausziege_04.jpg"
      />
    )
  }
}

const mapState = state => {}
const mapDispatch = dispatch => {}
export default connect(mapState, mapDispatch)(ProductList)
