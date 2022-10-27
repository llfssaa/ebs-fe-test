import React from 'react';
import '../style/style.css';
import { Product } from './types/types';
interface Props {
  products: Product[];
  addProduct: (obj: Product) => void;
  removeProduct: (obj: Product) => void;
}
const ProductsList = (props: Props) => {
  return (
    <div>
      <table className="list">
        <thead>
          <tr>
            <td>Category</td>
            <td>Name</td>
            <td>Price</td>
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
