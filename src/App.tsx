import React, { useEffect, useState } from 'react';

interface Product {
  name: string;
  category: Category;
  price: number;
}

interface Category {
  id: string;
  name: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  /*const [categories, setCategories] = useState<Category>()*/
  const [count, setCount] = useState(0);

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

    </div>
  );
}

export default App;
