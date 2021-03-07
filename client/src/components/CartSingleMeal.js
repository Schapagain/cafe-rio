import React from "react";

const CartSingleMeal = ({ meal, quantity, handleRemove }) => {
  return (
    <div className="flex h-16 w-full p-4 justify-between">
      <div className="w-3/4 my-auto flex">
        <p className="mr-2 my-auto">{meal.name}</p>
        <p className="mx-1 my-auto rounded-full w-4 flex items-center justify-center h-4 bg-theme-color">-</p>
        <p className="my-auto">{quantity}</p>
        <p className="mx-1 my-auto rounded-full w-4 flex items-center justify-center h-4 bg-theme-color">+</p>
      </div>
      <div className="my-auto">
        <p>${(meal.price || 99999) * quantity}</p>
      </div>
    </div>
  );
};

export default CartSingleMeal;