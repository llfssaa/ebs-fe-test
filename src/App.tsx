import React, { useEffect, useState } from 'react';
import { CartProduct, Product } from './components/types/types'
import ProductsList from './components/ProductList';
import AddProductList from './components/AddProductList';
import './style/style.css'

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [addProducts, setAddProducts] = useState<CartProduct[]>([]);

  const totalPrice = () => {
      if (addProducts.length === 0){
        return 0
      }
      return addProducts.map(el => {
          return (el.price * el.quantity)})
          .reduce((a:number,b:number)=> a+b).toFixed(2)
  }


  const addProduct = (product: Product): void => {
    if (addProducts.some((cartProduct)=> cartProduct.name === product.name)){
      setAddProducts(
        addProducts.map((el) => {
          if (el.name === product.name) return { ...el, quantity: el.quantity + 1 };
          return el;
        }),
      );
      return;
    }
    setAddProducts([...addProducts, { ...product, quantity: 1 }]);
  };
  const removeProduct = (product: Product): void => {
    setAddProducts(addProducts.filter((cartProduct) => cartProduct.name !== product.name))

  };
  const incrementProduct = (product: CartProduct): void => {
      setAddProducts(
          addProducts.map((el) => {
              if (el.name === product.name) return { ...el, quantity: el.quantity + 1 };
              return el;
          }),
      );
  }
    const decrementProduct = (product: CartProduct): void => {
        if (product.quantity>1){
            setAddProducts(
                addProducts.map((el) => {
                    if (el.name === product.name) return { ...el, quantity: el.quantity - 1 };
                    return el;
                }),
            );
        }
    }



  /*const [categories, setCategories] = useState<Category>()*/
  useEffect(() => {
    fetch('http://localhost:3001/api/products/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      });
  }, []);
  /*  useEffect(() => {
    fetch('http://localhost:3001/api/categories/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategories(data)
        console.log(data)
      });

  }, [])*/
  return (
    <div>
        <div className="wrapper">
            <ProductsList products={products} addProduct={addProduct} removeProduct={removeProduct} />
            <AddProductList cartProducts={addProducts} removeProduct={removeProduct}
                            incrementProduct={incrementProduct} decrementProduct={decrementProduct} />
        </div>
        <div>
            <p>Total price: {totalPrice()}</p>
        </div>
    </div>
  );
}

export default App;
