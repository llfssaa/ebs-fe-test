import React from 'react';
import { Product } from './types/types';

interface Props {
  cartProducts: Product[];
}

const AddProductList = (props: Props) => {
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
          {/*{
          products.map((el, i)=>(
            <tr key={el.category.id+el.name}>
              <td>{el.category.name}</td>
              <td>{el.name}</td>
              <td>{el.price}</td>
              <td>
                <button
                  onClick={()=> {
                    setCount(count=>count-1)}}
                  disabled={count===0}
                > (-) </button>
                Select
                <button onClick={()=> {
                  setCount(count=>count+1)
                }}> (+) </button>
              </td>
            </tr>
          ))
        }*/}
        </tbody>
      </table>
    </div>
  );
};

export default AddProductList;
