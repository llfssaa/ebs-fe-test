import React from 'react';
import { CartProduct } from './types/types';

interface Props {
  cartProducts: CartProduct[];
  removeProduct: (obj: CartProduct) => void;
  incrementProduct: (obj: CartProduct) => void;
  decrementProduct: (obj: CartProduct) => void;
}

const AddProductList = (props: Props) => {
  return (
    <div>
      <table className="list">
        <thead>
          <tr>
            <td>Category</td>
            <td>Name</td>
            <td>Quantity</td>
            <td>Price</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {props.cartProducts.map((product, i) => (
            <tr key={product.category.id + product.name}>
              <td>{product.category.name}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>${(product.price * product.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => props.decrementProduct(product)}> (-) </button>
                <button onClick={() => props.removeProduct(product)}>Remove</button>
                <button onClick={() => props.incrementProduct(product)}> (+) </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddProductList;
