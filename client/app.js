import React from 'react'
import Navbar from './components/navbar'
import Routes from './routes'
import ProductList from './components/Cards/ProductList'

const App = () => {
  return (
    <div className='app-container'>
      <Navbar />
      {/* <ProductList /> */}
      <Routes />
    </div>
  )
}

export default App
