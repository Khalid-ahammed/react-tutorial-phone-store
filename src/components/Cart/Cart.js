import React from 'react'
import Title from '../Title'
import CartColumns from './CartColumns'
import Emptycart from './EmptyCart'
import { ProductConsumer } from '../../context'
import Cartlist from './CartList'
import CartTotals from './CartTotals'
import { useHistory } from 'react-router-dom'

const Cart = () => {
  const history = useHistory()
  return (
    <section>
      <ProductConsumer>
        {(value) => {
          const { cart } = value
          if (cart.length > 0) {
            return (
              <>
                <Title name='your' title='cart'></Title>
                <CartColumns />
                <Cartlist value={value} />
                <CartTotals value={value} history={history} />
              </>
            )
          } else {
            return <Emptycart />
          }
        }}
      </ProductConsumer>
    </section>
  )
}

export default Cart
