import React, { useEffect, useState } from 'react';
import { Product } from './components/types/types';
import ProductsList from './components/ProductList';
import AddProductList from './components/AddProductList';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [addProducts, setAddProducts] = useState<Product[]>([]);

  const addProduct = (product: Product): void => {
    if (addProducts.includes(product)) {
      setAddProducts(
        addProducts.map((el) => {
          if (el.name === product.name) return { ...el, quantity: el.quantity ? el.quantity + 1 : 1 };
          return el;
        }),
      );
      return;
    }
    setAddProducts([...addProducts, { ...product, quantity: 1 }]);
  };
  const removeProduct = (product: Product): void => {};

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
      <ProductsList products={products} addProduct={addProduct} removeProduct={removeProduct} />
      <AddProductList cartProducts={addProducts} />
    </div>
  );
}

export default App;
