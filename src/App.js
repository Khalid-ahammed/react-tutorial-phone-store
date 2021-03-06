import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Details from './components/Details'
import Cart from './components/Cart/Cart'
import Default from './components/Default'
import Modal from './components/Modal'

function App() {
  return (
    <>
      <Navbar />

      <Switch>
        <Route exact path='/'>
          <ProductList />
        </Route>
        <Route path='/details'>
          <Details />
        </Route>
        <Route path='/cart'>
          <Cart />
        </Route>
        <Route path='*'>
          <Default />
        </Route>
      </Switch>
      <Modal />
    </>
  )
}

export default App
