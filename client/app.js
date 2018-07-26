import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import ProductList from './components/Cards/ProductList'
import ViewProfile from './components/ViewProfile'

const App = () => {
  return (
    <div>
      <Navbar />
      <ViewProfile />
      {/* <ProductList /> */}
      {/* <ItemCartCard /> */}
      {/* <Routes /> */}
    </div>
  )
}

export default App
