import React from 'react';
import '../style/style.css';
import { Product, SortByFieldType, SortType } from './types/types';
interface Props {
  products: Product[];
  addProduct: (obj: Product) => void;
  removeProduct: (obj: Product) => void;
  sortProducts: (sortType: SortType, sortByField: SortByFieldType) => void;
  isExistingInCart: (product: Product) => boolean;
}
const ProductsList = (props: Props) => {
  return (
    <div>
      <table className="list">
        <thead>
          <tr>
            <td>
              Category
              <button onClick={() => props.sortProducts('asc', 'category')}>▲</button>
              <button onClick={() => props.sortProducts('desc', 'category')}>▼</button>
            </td>
            <td>Name</td>
            <td>
              Price
              <button onClick={() => props.sortProducts('asc', 'price')}>▲</button>
              <button onClick={() => props.sortProducts('desc', 'price')}>▼</button>
            </td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {props.products.map((product) => (
            <tr key={product.category.id + product.name}>
              <td>{product.category.name}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button
                  disabled={!props.isExistingInCart(product)}
                  onClick={() => {
                    props.removeProduct(product);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    props.addProduct(product);
                  }}
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
