import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const CheckoutSummaryCard = props => {
  let subtotal = 0
  let count = 0
  for (let i = 0; i < props.cart.length; i++) {
    const itemTotal = props.cart[i].animal.price / 100 * props.cart[i].quantity
    subtotal += itemTotal
    count += props.cart[i].quantity
  }
  subtotal = subtotal.toFixed(2)

  return (
    <div className="ui card">
      <div className="content">
        <div className="header">{count} items</div>
      </div>
      <div className="content">
        <table className="ui definition table">
          <tbody>
            <tr>
              <td className="two wide column">Subtotal</td>
              <td>{subtotal}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>FREE</td>
            </tr>
            <tr>
              <td>Est. Taxes (8%)</td>
              <td>{(subtotal * 0.08).toFixed(2)}</td>
            </tr>
            <tr>
              <td>TOTAL</td>
              <td>{(subtotal * 1.08).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="extra content">
        <button className="ui button">
          <Link
            to={{pathname: '/checkout', state: {prevPath: location.pathname}}}
          >
            Checkout
          </Link>
        </button>
      </div>
    </div>
  )
}

const mapState = state => ({
  currentUser: state.user.currentUser
})

const mapDispatch = dispatch => ({
  modal: bool => dispatch(modal(bool))
})

export default connect(mapState)(CheckoutSummaryCard)
