import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import ProductList from './components/Cards/ProductList'
import ViewCart from './components/ViewCart'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <ViewCart /> */}
      <ProductList />
      {/* <ItemCartCard /> */}
      <Routes />
    </div>
  )
}

export default App
