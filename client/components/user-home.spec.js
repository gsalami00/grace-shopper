/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import {UserHome} from './user-home'
import {Provider} from 'react-redux'

import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

import ProductList from './Cards/ProductList'
import SingleProductCard from './Cards/SingleProductCard'

const adapter = new Adapter()
enzyme.configure({adapter})

// describe('UserHome', () => {
//   let userHome

//   beforeEach(() => {
//     userHome = shallow(<UserHome email="cody@email.com" />)
//   })

//   it('renders the email in an h3', () => {
//     expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
//   })
// })

describe('Front-End', () => {
  let initialState = {
    animals: []
  }
  let store = mockStore(initialState)
  let animals = [
    {
      species: 'Llama',
      imageUrl:
        'http://www.publicdomainpictures.net/pictures/220000/velka/llama-1496506182gy7.jpg',
      price: 21895.11,
      description:
        "Craft beer activated charcoal taxidermy cray. Af cronut celiac microdosing, PBR&B banh mi distillery freegan you probably haven't heard of them seitan. Ugh tilde austin, leggings whatever twee letterpress polaroid butcher marfa pop-up gochujang raclette. Locavore pickled viral unicorn neutra butcher yuccie palo santo."
    },
    {
      species: 'Mountain Goat',
      imageUrl:
        'https://www.nps.gov/common/uploads/stories/images/nri/20161004/articles/B2091E24-1DD8-B71B-0B39299C92809B35/B2091E24-1DD8-B71B-0B39299C92809B35.jpg',
      price: 16796.93,
      description:
        'Tacos stumptown bicycle rights forage iPhone, put a bird on it hella shabby chic keffiyeh celiac. Keytar flannel synth, whatever kickstarter vexillologist wolf adaptogen. Scenester kogi green juice, leggings chicharrones tousled meggings offal microdosing helvetica gastropub fanny pack cloud bread. Af shoreditch DIY, adaptogen umami snackwave distillery heirloom tote bag photo booth viral shabby chic.'
    },
    {
      species: 'Highland Cattle',
      imageUrl:
        'https://countrysidenetwork.com/wp-content/uploads/GettyImages-845355220.jpg',
      price: 18959.59,
      description:
        "Semiotics enamel pin mustache blog, migas ramps fam. Tbh green juice etsy cloud bread roof party, vinyl skateboard selvage iceland. Scenester kale chips brooklyn lyft, four loko YOLO food truck williamsburg mlkshk swag snackwave gluten-free tacos. Intelligentsia VHS hella pok pok man bun you probably haven't heard of them try-hard locavore occupy thundercats post-ironic enamel pin chia. Meh bitters selvage raclette cliche stumptown iceland echo park poutine tumeric."
    }
  ]

  describe('<ProductList /> component', () => {
    let productListWrapper
    beforeEach('Create <ProductList />', () => {
      productListWrapper = shallow(
        <Provider store={store}>
          <ProductList />
        </Provider>
      )
      // productListWrapper = mount(  )
      if (productListWrapper.instance().componentDidMount) {
        productListWrapper.instance().componentDidMount()
      }
    })
    it('should be a class component with an initial local state', () => {
      expect(productListWrapper.instance()).to.exist // eslint-disable-line no-unused-expressions
      expect(productListWrapper.instance().store.getState()).to.deep.equal({
        animals: []
      })
    })
    it('should render an <SingleProductCard /> Component', () => {
      expect(productListWrapper.find('SingleProductCard')).to.exist // eslint-disable-line no-unused-expressions
    })
  })

  // describe('<SingleProductCard /> component', () => {
  //   let singleProductListWrapper
  //   beforeEach('Create <SingleProductCard />', () => {
  //     singleProductListWrapper = shallow(
  //       <Provider store={store}>
  //         <SingleProductCard />
  //       </Provider>
  //     )
  //     // productListWrapper = mount(  )
  //     if (singleProductListWrapper.instance().componentDidMount) {
  //       singleProductListWrapper.instance().componentDidMount()
  //     }
  //   })

  //   it('should have a method called addToCart that is invoked when the Add to Cart button is clicked', () => {
  //     console.log(singleProductListWrapper.instance().store)
  //     expect(typeof singleProductListWrapper.instance().addToCart()).to.equal(
  //       'function'
  //     )
  //   })
  // })
})
