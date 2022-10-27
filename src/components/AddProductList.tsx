import React from 'react';
import { CartProduct } from './types/types'

interface Props {
  cartProducts: CartProduct[];
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
          {
          props.cartProducts.map((el, i)=>(
            <tr key={el.category.id+el.name}>
              <td>{el.category.name}</td>
              <td>{el.name}</td>
              <td>{el.quantity}</td>
              <td>${(el.price * el.quantity).toFixed(2)}</td>
              <td>
                <button
                  onClick={()=> {

                  }}
                > (-) </button>
                Select
                <button onClick={()=> {

                }}> (+) </button>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
};

export default AddProductList;
