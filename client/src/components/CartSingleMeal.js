import React from "react";

const CartSingleMeal = ({
  meal,
  quantity,
  handleAddOne,
  handleSubtractOne,
}) => {
  return (
    <div className="flex h-16 w-full justify-between">
      <div className="w-3/4 my-auto flex">
        <p className="mr-2 my-auto">{meal.name}</p>
        <p
          onClick={() => handleSubtractOne(meal.id)}
          className="p-2 mx-1 bg-gray-600 bg-opacity-50 my-auto rounded-full w-6 h-6 flex items-center justify-center  bg-theme-color"
        >
          -
        </p>
        <p className="my-auto p-2 ">{quantity}</p>
        <p
          onClick={() => handleAddOne(meal)}
          className="mx-1 p-2 bg-gray-600 bg-opacity-50 my-auto rounded-full w-6 h-6 flex items-center justify-center  bg-theme-color"
        >
          +
        </p>
      </div>
      <div className="my-auto mr-1">
        <p>${(meal.price || 99999) * quantity}</p>
      </div>
    </div>
  );
};

export default CartSingleMeal;
