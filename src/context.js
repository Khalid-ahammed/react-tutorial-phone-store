import React from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext()
//proveider
//consumer

function ProductProvider({ children }) {
  const [state, setState] = React.useState({
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  })

  const setProducts = () => {
    let tempProducts = []
    storeProducts.forEach((item) => {
      const singleItem = { ...item }
      tempProducts = [...tempProducts, singleItem]
    })
    setState((state) => {
      return { ...state, products: tempProducts }
    })
  }

  const getItem = (id) => {
    return state.products.find((item) => item.id === id)
  }

  const handleDetail = (id) => {
    const product = getItem(id)
    setState((state) => {
      return { ...state, detailProduct: product }
    })
  }
  const addToCart = (id) => {
    let tempProducts = [...state.products]
    const index = tempProducts.indexOf(getItem(id))
    const product = tempProducts[index]
    product.inCart = true
    product.count = 1
    const price = product.price
    product.total = price

    setState((state) => {
      return {
        ...state,
        products: tempProducts,
        cart: [...state.cart, product],
      }
    })
  }

  const openModal = (id) => {
    const product = getItem(id)
    setState((state) => {
      return {
        ...state,
        modalProduct: product,
        modalOpen: true,
      }
    })
  }

  const closeModal = (_) => {
    setState((state) => {
      return { ...state, modalOpen: false }
    })
  }

  const increment = (id) => {
    let tempCart = [...state.cart]
    const selectedProduct = tempCart.find((item) => item.id === id)
    const index = tempCart.indexOf(selectedProduct)
    const product = tempCart[index]
    product.count = product.count + 1
    product.total = product.count * product.price
    setState((state) => {
      return {
        ...state,
        cart: [...tempCart],
      }
    })
    addTotals()
  }

  const decrement = (id) => {
    let tempCart = [...state.cart]
    const selectedProduct = tempCart.find((item) => item.id === id)
    const index = tempCart.indexOf(selectedProduct)
    const product = tempCart[index]
    product.count = product.count - 1
    if (product.count === 0) {
      removeItem(id)
    } else {
      product.total = product.count * product.price
      setState((state) => {
        return {
          ...state,
          cart: [...tempCart],
        }
      })
      addTotals()
    }
  }

  const removeItem = (id) => {
    let tempProducts = [...state.products]
    let tempCart = [...state.cart]
    tempCart = tempCart.filter((item) => item.id !== id)
    const index = tempProducts.indexOf(getItem(id))
    let removedProduct = tempProducts[index]
    removedProduct.inCart = false
    removedProduct.count = 0
    removedProduct.total = 0

    setState((state) => {
      return {
        ...state,
        cart: [...tempCart],
        products: [...tempProducts],
      }
    })
    addTotals()
  }

  const clearCart = () => {
    setState((state) => {
      return {
        ...state,
        cart: [],
      }
    })
    setProducts()
  }

  const addTotals = () => {
    let subTotal = 0
    state.cart.map((item) => (subTotal += item.total))
    const tempTax = subTotal * 0.1
    const tax = parseFloat(tempTax.toFixed(2))
    const total = subTotal + tax
    setState((state) => {
      return {
        ...state,
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total,
      }
    })
  }

  React.useEffect(() => {
    addTotals()
  }, [state.cart])

  React.useEffect(() => {
    setProducts()
  }, [])

  return (
    <ProductContext.Provider
      value={{
        ...state,
        handleDetail: handleDetail,
        addToCart: addToCart,
        openModal: openModal,
        closeModal: closeModal,
        increment: increment,
        decrement: decrement,
        removeItem: removeItem,
        clearCart: clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const ProductConsumer = ProductContext.Consumer

export default ProductProvider
