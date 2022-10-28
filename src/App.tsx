import React, { useEffect, useState } from 'react';
import { CartProduct, Product, SortByFieldType, SortType } from './components/types/types';
import ProductsList from './components/ProductList';
import AddProductList from './components/AddProductList';
import './style/style.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [addProducts, setAddProducts] = useState<CartProduct[]>([]);


  const sortFunction = (
    products: Product[] | CartProduct[],
    sortByField: SortByFieldType,
    sortType: SortType,
  ): Product[] | CartProduct[] => {
    const sortedProducts = [...products];

    if (sortType === 'asc') {
      if (sortByField === 'category') {
        sortedProducts.sort((a, b) => {
          return ('' + a.category.name).localeCompare(b.category.name);
        });
      } else {
        sortedProducts.sort((a, b) => {
          return (a[sortByField] as any) - (b[sortByField] as any);
        });
      }
    } else {
      if (sortByField === 'category') {
        sortedProducts.sort((a, b) => {
          return ('' + b.category.name).localeCompare(a.category.name);
        });
      }
      sortedProducts.sort((a, b) => {
        return (b[sortByField] as any) - (a[sortByField] as any);
      });
    }

    return sortedProducts;
  };

  const sortProducts = (sortType: SortType, sortByField: SortByFieldType) => {
    setProducts(sortFunction(products, sortByField, sortType));
  };
  const sortAddProducts = (sortType: SortType, sortByField: SortByFieldType) => {
    setAddProducts(sortFunction(addProducts, sortByField, sortType) as CartProduct[]);
  };

  const totalPrice = (): string => {
    if (!addProducts.length) return '0.00';
    return addProducts
      .map((product) => product.price * product.quantity)
      .reduce((a: number, b: number) => a + b)
      .toFixed(2);
  };

  const isExistingInCart = (product: Product): boolean => {
    return addProducts.some((cartProduct) => cartProduct.name === product.name)
  }

  const addProduct = (product: Product): void => {
    if (addProducts.some((cartProduct) => cartProduct.name === product.name)) {
      incrementProduct(product as Product)
      return;
    }
    setAddProducts([...addProducts, { ...product, quantity: 1 }]);
  };
  const removeProduct = (product: Product): void => {
    setAddProducts(addProducts.filter((cartProduct) => cartProduct.name !== product.name));
  };
  const incrementProduct = (product: CartProduct | Product): void => {
    setAddProducts(
      addProducts.map((el) => {
        if (el.name === product.name) return { ...el, quantity: el.quantity + 1 };
        return el;
      }),
    );
  };
  const decrementProduct = (product: CartProduct): void => {
    if (product.quantity > 1) {
      setAddProducts(
        addProducts.map((el) => {
          if (el.name === product.name) return { ...el, quantity: el.quantity - 1 };
          return el;
        }),
      );
    }
  };

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
    <div className="wrapper">
      <ProductsList
        products={products}
        addProduct={addProduct}
        removeProduct={removeProduct}
        sortProducts={sortProducts}
        isExistingInCart={isExistingInCart}
      />
      <AddProductList
        cartProducts={addProducts}
        removeProduct={removeProduct}
        incrementProduct={incrementProduct}
        decrementProduct={decrementProduct}
        sortAddProducts={sortAddProducts}
      />
      <div>
        <p>Total price: {totalPrice()}</p>
      </div>
    </div>
  );
}

export default App;
