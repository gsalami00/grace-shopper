import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import ProductList from './components/Cards/ProductList'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <ProductList /> */}
      <Routes />
    </div>
  )
}

export default App
